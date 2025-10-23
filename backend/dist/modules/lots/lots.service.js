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
exports.LotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lot_entity_1 = require("./entities/lot.entity");
const batch_event_entity_1 = require("./entities/batch-event.entity");
const batch_kde_entity_1 = require("./entities/batch-kde.entity");
const user_entity_1 = require("../users/entities/user.entity");
const uuid_1 = require("uuid");
let LotsService = class LotsService {
    lotRepository;
    batchEventRepository;
    batchKDERepository;
    userRepository;
    constructor(lotRepository, batchEventRepository, batchKDERepository, userRepository) {
        this.lotRepository = lotRepository;
        this.batchEventRepository = batchEventRepository;
        this.batchKDERepository = batchKDERepository;
        this.userRepository = userRepository;
    }
    async create(createLotDto, userId) {
        let finalUserId = userId;
        if (!finalUserId) {
            const firstUser = await this.userRepository.findOne({
                where: { deletedAt: (0, typeorm_2.IsNull)() },
                order: { createdAt: 'ASC' },
            });
            if (!firstUser) {
                throw new common_1.BadRequestException('Aucun utilisateur trouvé dans le système');
            }
            finalUserId = firstUser.id;
        }
        const lotNumber = await this.generateLotNumber();
        const lot = this.lotRepository.create({
            lotNumber,
            initialQuantityKg: createLotDto.initialQuantityKg,
            mangoVariety: createLotDto.mangoVariety,
            destinationMarket: createLotDto.destinationMarket,
            notes: createLotDto.notes,
            createdBy: finalUserId,
            publicUrlToken: (0, uuid_1.v4)(),
        });
        return await this.lotRepository.save(lot);
    }
    async findAll() {
        return await this.lotRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['creator', 'events'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const lot = await this.lotRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['creator', 'events', 'events.operator', 'events.kdes'],
        });
        if (!lot) {
            throw new common_1.NotFoundException(`Lot avec l'ID ${id} non trouvé`);
        }
        return lot;
    }
    async addEvent(lotId, addEventDto) {
        const lot = await this.findOne(lotId);
        if (lot.status === lot_entity_1.LotStatus.COMPLETED || lot.status === lot_entity_1.LotStatus.SHIPPED) {
            throw new common_1.BadRequestException('Impossible d\'ajouter un événement à un lot complété ou expédié');
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
        if (addEventDto.kdes && addEventDto.kdes.length > 0) {
            const kdes = addEventDto.kdes.map((kde) => this.batchKDERepository.create({
                eventId: savedEvent.id,
                keyName: kde.keyName,
                value: kde.value,
                unit: kde.unit,
            }));
            await this.batchKDERepository.save(kdes);
        }
        return (await this.batchEventRepository.findOne({
            where: { id: savedEvent.id },
            relations: ['operator', 'kdes'],
        }));
    }
    async updateStatus(lotId, status) {
        const lot = await this.findOne(lotId);
        lot.status = status;
        if (status === lot_entity_1.LotStatus.COMPLETED) {
            lot.completedAt = new Date();
        }
        if (status === lot_entity_1.LotStatus.SHIPPED) {
            lot.shippedAt = new Date();
        }
        return await this.lotRepository.save(lot);
    }
    async generateLotNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const prefix = `LOT-${year}${month}${day}`;
        const lastLot = await this.lotRepository
            .createQueryBuilder('lot')
            .where('lot.lot_number LIKE :prefix', { prefix: `${prefix}%` })
            .orderBy('lot.lot_number', 'DESC')
            .getOne();
        let sequence = 1;
        if (lastLot) {
            const parts = lastLot.lotNumber.split('-');
            const lastSequence = parseInt(parts[parts.length - 1], 10);
            sequence = lastSequence + 1;
        }
        return `${prefix}-${String(sequence).padStart(3, '0')}`;
    }
};
exports.LotsService = LotsService;
exports.LotsService = LotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lot_entity_1.Lot)),
    __param(1, (0, typeorm_1.InjectRepository)(batch_event_entity_1.BatchEvent)),
    __param(2, (0, typeorm_1.InjectRepository)(batch_kde_entity_1.BatchKDE)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LotsService);
//# sourceMappingURL=lots.service.js.map