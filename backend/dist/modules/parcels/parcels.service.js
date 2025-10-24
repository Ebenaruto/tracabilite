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
exports.ParcelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const parcel_entity_1 = require("./entities/parcel.entity");
let ParcelsService = class ParcelsService {
    parcelRepository;
    constructor(parcelRepository) {
        this.parcelRepository = parcelRepository;
    }
    async create(createParcelDto) {
        const referenceCode = await this.generateReferenceCode();
        const parcel = this.parcelRepository.create({
            ...createParcelDto,
            referenceCode,
        });
        return await this.parcelRepository.save(parcel);
    }
    async findAll() {
        return await this.parcelRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['producer'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByProducer(producerId) {
        return await this.parcelRepository.find({
            where: {
                producerId,
                deletedAt: (0, typeorm_2.IsNull)()
            },
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const parcel = await this.parcelRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['producer'],
        });
        if (!parcel) {
            throw new common_1.NotFoundException(`Parcelle avec l'ID ${id} non trouvée`);
        }
        return parcel;
    }
    async update(id, updateData) {
        const parcel = await this.findOne(id);
        Object.assign(parcel, updateData);
        return await this.parcelRepository.save(parcel);
    }
    async updateStatus(id, status) {
        const parcel = await this.findOne(id);
        parcel.status = status;
        return await this.parcelRepository.save(parcel);
    }
    async remove(id) {
        const parcel = await this.findOne(id);
        parcel.deletedAt = new Date();
        await this.parcelRepository.save(parcel);
    }
    async generateReferenceCode() {
        const lastParcel = await this.parcelRepository
            .createQueryBuilder('parcel')
            .where('parcel.reference_code LIKE :prefix', { prefix: 'PARC-%' })
            .orderBy('parcel.reference_code', 'DESC')
            .getOne();
        let sequence = 1;
        if (lastParcel) {
            const parts = lastParcel.referenceCode.split('-');
            const lastSequence = parseInt(parts[parts.length - 1], 10);
            sequence = lastSequence + 1;
        }
        return `PARC-${String(sequence).padStart(4, '0')}`;
    }
};
exports.ParcelsService = ParcelsService;
exports.ParcelsService = ParcelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parcel_entity_1.Parcel)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ParcelsService);
//# sourceMappingURL=parcels.service.js.map