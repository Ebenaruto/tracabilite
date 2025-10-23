import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Lot, LotStatus } from './entities/lot.entity';
import { BatchEvent } from './entities/batch-event.entity';
import { BatchKDE } from './entities/batch-kde.entity';
import { User } from '../users/entities/user.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { AddEventDto } from './dto/add-event.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    @InjectRepository(BatchEvent)
    private readonly batchEventRepository: Repository<BatchEvent>,
    @InjectRepository(BatchKDE)
    private readonly batchKDERepository: Repository<BatchKDE>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createLotDto: CreateLotDto, userId: string | null): Promise<Lot> {
    // Si pas d'userId fourni, prendre le premier utilisateur actif
    let finalUserId = userId;
    
    if (!finalUserId) {
      const firstUser = await this.userRepository.findOne({
        where: { deletedAt: IsNull() },
        order: { createdAt: 'ASC' },
      });
      
      if (!firstUser) {
        throw new BadRequestException('Aucun utilisateur trouvé dans le système');
      }
      
      finalUserId = firstUser.id;
    }
  
    // Générer le numéro de lot
    const lotNumber = await this.generateLotNumber();
  
    const lot = this.lotRepository.create({
      lotNumber,
      initialQuantityKg: createLotDto.initialQuantityKg,
      mangoVariety: createLotDto.mangoVariety,
      destinationMarket: createLotDto.destinationMarket,
      notes: createLotDto.notes,
      createdBy: finalUserId,  // <-- Utilise le vrai UUID maintenant
      publicUrlToken: uuidv4(),
    });
  
    return await this.lotRepository.save(lot);
  }

  async findAll(): Promise<Lot[]> {
    return await this.lotRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['creator', 'events'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Lot> {
    const lot = await this.lotRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['creator', 'events', 'events.operator', 'events.kdes'],
    });

    if (!lot) {
      throw new NotFoundException(`Lot avec l'ID ${id} non trouvé`);
    }

    return lot;
  }

  async addEvent(lotId: string, addEventDto: AddEventDto): Promise<BatchEvent> {
    const lot = await this.findOne(lotId);

    if (lot.status === LotStatus.COMPLETED || lot.status === LotStatus.SHIPPED) {
      throw new BadRequestException('Impossible d\'ajouter un événement à un lot complété ou expédié');
    }

    const event = this.batchEventRepository.create({
      lotId,
      eventType: addEventDto.eventType,
      eventDatetime: new Date(addEventDto.eventDatetime),
      operatorId: addEventDto.operatorId,
      durationMinutes: addEventDto.durationMinutes,
      notes: addEventDto.notes,
    });

    const savedEvent = await this.batchEventRepository.save(event);

    // Ajouter les KDEs si fournis
    if (addEventDto.kdes && addEventDto.kdes.length > 0) {
      const kdes = addEventDto.kdes.map((kde) =>
        this.batchKDERepository.create({
          eventId: savedEvent.id,
          keyName: kde.keyName,
          value: kde.value,
          unit: kde.unit,
        }),
      );
      await this.batchKDERepository.save(kdes);
    }

    return (await this.batchEventRepository.findOne({
      where: { id: savedEvent.id },
      relations: ['operator', 'kdes'],
    }))!;
  }

  async updateStatus(lotId: string, status: LotStatus): Promise<Lot> {
    const lot = await this.findOne(lotId);

    lot.status = status;

    if (status === LotStatus.COMPLETED) {
      lot.completedAt = new Date();
    }

    if (status === LotStatus.SHIPPED) {
      lot.shippedAt = new Date();
    }

    return await this.lotRepository.save(lot);
  }

  private async generateLotNumber(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
  
    // Compter les lots du jour en cherchant par préfixe de lot_number
    const prefix = `LOT-${year}${month}${day}`;
    
    const lastLot = await this.lotRepository
      .createQueryBuilder('lot')
      .where('lot.lot_number LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('lot.lot_number', 'DESC')
      .getOne();
  
    let sequence = 1;
    if (lastLot) {
      // Extraire le numéro de séquence du dernier lot
      const parts = lastLot.lotNumber.split('-');
      const lastSequence = parseInt(parts[parts.length - 1], 10);
      sequence = lastSequence + 1;
    }
  
    return `${prefix}-${String(sequence).padStart(3, '0')}`;
  }
}