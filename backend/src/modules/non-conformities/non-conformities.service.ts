import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { NonConformity, NCStatus } from './entities/non-conformity.entity';
import { CorrectiveAction, ActionStatus } from './entities/corrective-action.entity';
import { CreateNonConformityDto } from './dto/create-non-conformity.dto';

@Injectable()
export class NonConformitiesService {
  constructor(
    @InjectRepository(NonConformity)
    private readonly ncRepository: Repository<NonConformity>,
    @InjectRepository(CorrectiveAction)
    private readonly actionRepository: Repository<CorrectiveAction>,
  ) {}

  async create(createNonConformityDto: CreateNonConformityDto): Promise<NonConformity> {
    // Générer un numéro de référence unique
    const referenceNumber = await this.generateReferenceNumber();

    const nc = this.ncRepository.create({
      referenceNumber,
      lotId: createNonConformityDto.lotId,
      labTestId: createNonConformityDto.labTestId,
      ncType: createNonConformityDto.ncType,
      severity: createNonConformityDto.severity,
      description: createNonConformityDto.description,
      identifiedCause: createNonConformityDto.identifiedCause,
      potentialImpact: createNonConformityDto.potentialImpact,
      openedBy: createNonConformityDto.openedBy,
      assignedTo: createNonConformityDto.assignedTo,
      openedAt: new Date(),
      targetResolutionDate: createNonConformityDto.targetResolutionDate 
        ? new Date(createNonConformityDto.targetResolutionDate)
        : undefined,
    } as NonConformity);

    const savedNC = await this.ncRepository.save(nc);

    // Ajouter les actions correctives si fournies
    if (createNonConformityDto.correctiveActions && createNonConformityDto.correctiveActions.length > 0) {
      const actions = createNonConformityDto.correctiveActions.map((action) =>
        this.actionRepository.create({
          nonConformityId: savedNC.id,
          actionType: action.actionType,
          description: action.description,
          responsibleUserId: action.responsibleUserId,
          dueDate: action.dueDate ? new Date(action.dueDate) : undefined,
        }),
      );
      await this.actionRepository.save(actions);
    }

    return await this.findOne(savedNC.id);
  }

  async findAll(): Promise<NonConformity[]> {
    return await this.ncRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['lot', 'labTest', 'opener', 'assignee', 'closer', 'correctiveActions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByLot(lotId: string): Promise<NonConformity[]> {
    return await this.ncRepository.find({
      where: { 
        lotId,
        deletedAt: IsNull() 
      },
      relations: ['opener', 'assignee', 'correctiveActions'],
      order: { openedAt: 'DESC' },
    });
  }

  async findByStatus(status: NCStatus): Promise<NonConformity[]> {
    return await this.ncRepository.find({
      where: { 
        status,
        deletedAt: IsNull() 
      },
      relations: ['lot', 'opener', 'assignee', 'correctiveActions'],
      order: { openedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<NonConformity> {
    const nc = await this.ncRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: [
        'lot', 
        'labTest', 
        'opener', 
        'assignee', 
        'closer', 
        'correctiveActions',
        'correctiveActions.responsibleUser',
        'correctiveActions.verifier',
      ],
    });

    if (!nc) {
      throw new NotFoundException(`Non-conformité avec l'ID ${id} non trouvée`);
    }

    return nc;
  }

  async updateStatus(id: string, status: NCStatus, userId?: string): Promise<NonConformity> {
    const nc = await this.findOne(id);
    nc.status = status;

    if (status === NCStatus.IN_PROGRESS && nc.status === NCStatus.OPEN) {
      // Démarrage du traitement
      if (!nc.assignedTo) {
        throw new BadRequestException('La NC doit être assignée avant de la mettre en cours');
      }
    }

    return await this.ncRepository.save(nc);
  }

  async assignTo(id: string, userId: string): Promise<NonConformity> {
    const nc = await this.findOne(id);
    nc.assignedTo = userId;
    
    if (nc.status === NCStatus.OPEN) {
      nc.status = NCStatus.IN_PROGRESS;
    }

    return await this.ncRepository.save(nc);
  }

  async addCorrectiveAction(
    ncId: string,
    actionData: {
      actionType: any;
      description: string;
      responsibleUserId?: string;
      dueDate?: string;
    },
  ): Promise<CorrectiveAction> {
    const nc = await this.findOne(ncId);

    const action = this.actionRepository.create({
      nonConformityId: nc.id,
      actionType: actionData.actionType,
      description: actionData.description,
      responsibleUserId: actionData.responsibleUserId,
      dueDate: actionData.dueDate ? new Date(actionData.dueDate) : undefined,
    });

    return await this.actionRepository.save(action);
  }

  async updateActionStatus(
    actionId: string,
    status: ActionStatus,
    completionDate?: Date,
  ): Promise<CorrectiveAction> {
    const action = await this.actionRepository.findOne({ 
      where: { id: actionId },
    });

    if (!action) {
      throw new NotFoundException(`Action corrective avec l'ID ${actionId} non trouvée`);
    }

    action.status = status;

    if (status === ActionStatus.COMPLETED && !action.completionDate) {
      action.completionDate = completionDate || new Date();
    }

    return await this.actionRepository.save(action);
  }

  async verifyAction(
    actionId: string,
    verifierId: string,
    verificationNotes?: string,
  ): Promise<CorrectiveAction> {
    const action = await this.actionRepository.findOne({ 
      where: { id: actionId },
    });

    if (!action) {
      throw new NotFoundException(`Action corrective avec l'ID ${actionId} non trouvée`);
    }

    if (action.status !== ActionStatus.COMPLETED) {
      throw new BadRequestException('Seules les actions complétées peuvent être vérifiées');
    }

    action.status = ActionStatus.VERIFIED;
    action.effectivenessVerified = true;
    action.verifiedBy = verifierId;
    action.verifiedAt = new Date();
    action.verificationNotes = verificationNotes || '';

    return await this.actionRepository.save(action);
  }

  async close(id: string, userId: string, closureNotes?: string): Promise<NonConformity> {
    const nc = await this.findOne(id);

    // Vérifier que toutes les actions correctives sont complétées
    const pendingActions = nc.correctiveActions?.filter(
      action => action.status !== ActionStatus.COMPLETED && action.status !== ActionStatus.VERIFIED
    );

    if (pendingActions && pendingActions.length > 0) {
      throw new BadRequestException(
        'Toutes les actions correctives doivent être complétées avant de clôturer la NC'
      );
    }

    nc.status = NCStatus.CLOSED;
    nc.closedBy = userId;
    nc.closedAt = new Date();
    nc.closureNotes = closureNotes || '';

    return await this.ncRepository.save(nc);
  }

  async remove(id: string): Promise<void> {
    const nc = await this.findOne(id);
    nc.deletedAt = new Date();
    await this.ncRepository.save(nc);
  }

  private async generateReferenceNumber(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const prefix = `NC-${year}${month}`;

    const lastNC = await this.ncRepository
      .createQueryBuilder('nc')
      .where('nc.reference_number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('nc.reference_number', 'DESC')
      .getOne();

    let sequence = 1;
    if (lastNC) {
      const parts = lastNC.referenceNumber.split('-');
      const lastSequence = parseInt(parts[parts.length - 1], 10);
      sequence = lastSequence + 1;
    }

    return `${prefix}-${String(sequence).padStart(4, '0')}`;
  }
}