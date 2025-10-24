"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonConformitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const non_conformity_entity_1 = require("./entities/non-conformity.entity");
const corrective_action_entity_1 = require("./entities/corrective-action.entity");
let NonConformitiesService = class NonConformitiesService {
    ncRepository;
    actionRepository;
    constructor(ncRepository, actionRepository) {
        this.ncRepository = ncRepository;
        this.actionRepository = actionRepository;
    }
    async create(createNonConformityDto) {
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
        });
        const savedNC = await this.ncRepository.save(nc);
        if (createNonConformityDto.correctiveActions && createNonConformityDto.correctiveActions.length > 0) {
            const actions = createNonConformityDto.correctiveActions.map((action) => this.actionRepository.create({
                nonConformityId: savedNC.id,
                actionType: action.actionType,
                description: action.description,
                responsibleUserId: action.responsibleUserId,
                dueDate: action.dueDate ? new Date(action.dueDate) : undefined,
            }));
            await this.actionRepository.save(actions);
        }
        return await this.findOne(savedNC.id);
    }
    async findAll() {
        return await this.ncRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['lot', 'labTest', 'opener', 'assignee', 'closer', 'correctiveActions'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByLot(lotId) {
        return await this.ncRepository.find({
            where: {
                lotId,
                deletedAt: (0, typeorm_2.IsNull)()
            },
            relations: ['opener', 'assignee', 'correctiveActions'],
            order: { openedAt: 'DESC' },
        });
    }
    async findByStatus(status) {
        return await this.ncRepository.find({
            where: {
                status,
                deletedAt: (0, typeorm_2.IsNull)()
            },
            relations: ['lot', 'opener', 'assignee', 'correctiveActions'],
            order: { openedAt: 'DESC' },
        });
    }
    async findOne(id) {
        const nc = await this.ncRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
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
            throw new common_1.NotFoundException(`Non-conformité avec l'ID ${id} non trouvée`);
        }
        return nc;
    }
    async updateStatus(id, status, userId) {
        const nc = await this.findOne(id);
        nc.status = status;
        if (status === non_conformity_entity_1.NCStatus.IN_PROGRESS && nc.status === non_conformity_entity_1.NCStatus.OPEN) {
            if (!nc.assignedTo) {
                throw new common_1.BadRequestException('La NC doit être assignée avant de la mettre en cours');
            }
        }
        return await this.ncRepository.save(nc);
    }
    async assignTo(id, userId) {
        const nc = await this.findOne(id);
        nc.assignedTo = userId;
        if (nc.status === non_conformity_entity_1.NCStatus.OPEN) {
            nc.status = non_conformity_entity_1.NCStatus.IN_PROGRESS;
        }
        return await this.ncRepository.save(nc);
    }
    async addCorrectiveAction(ncId, actionData) {
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
    async updateActionStatus(actionId, status, completionDate) {
        const action = await this.actionRepository.findOne({
            where: { id: actionId },
        });
        if (!action) {
            throw new common_1.NotFoundException(`Action corrective avec l'ID ${actionId} non trouvée`);
        }
        action.status = status;
        if (status === corrective_action_entity_1.ActionStatus.COMPLETED && !action.completionDate) {
            action.completionDate = completionDate || new Date();
        }
        return await this.actionRepository.save(action);
    }
    async verifyAction(actionId, verifierId, verificationNotes) {
        const action = await this.actionRepository.findOne({
            where: { id: actionId },
        });
        if (!action) {
            throw new common_1.NotFoundException(`Action corrective avec l'ID ${actionId} non trouvée`);
        }
        if (action.status !== corrective_action_entity_1.ActionStatus.COMPLETED) {
            throw new common_1.BadRequestException('Seules les actions complétées peuvent être vérifiées');
        }
        action.status = corrective_action_entity_1.ActionStatus.VERIFIED;
        action.effectivenessVerified = true;
        action.verifiedBy = verifierId;
        action.verifiedAt = new Date();
        action.verificationNotes = verificationNotes || '';
        return await this.actionRepository.save(action);
    }
    async close(id, userId, closureNotes) {
        const nc = await this.findOne(id);
        const pendingActions = nc.correctiveActions?.filter(action => action.status !== corrective_action_entity_1.ActionStatus.COMPLETED && action.status !== corrective_action_entity_1.ActionStatus.VERIFIED);
        if (pendingActions && pendingActions.length > 0) {
            throw new common_1.BadRequestException('Toutes les actions correctives doivent être complétées avant de clôturer la NC');
        }
        nc.status = non_conformity_entity_1.NCStatus.CLOSED;
        nc.closedBy = userId;
        nc.closedAt = new Date();
        nc.closureNotes = closureNotes || '';
        return await this.ncRepository.save(nc);
    }
    async remove(id) {
        const nc = await this.findOne(id);
        nc.deletedAt = new Date();
        await this.ncRepository.save(nc);
    }
    async generateReferenceNumber() {
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
};
exports.NonConformitiesService = NonConformitiesService;
exports.NonConformitiesService = NonConformitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(non_conformity_entity_1.NonConformity)),
    __param(1, (0, typeorm_1.InjectRepository)(corrective_action_entity_1.CorrectiveAction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NonConformitiesService);
//# sourceMappingURL=non-conformities.service.js.map