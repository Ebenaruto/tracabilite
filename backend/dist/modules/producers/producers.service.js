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
exports.ProducersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producer_entity_1 = require("./entities/producer.entity");
let ProducersService = class ProducersService {
    producerRepository;
    constructor(producerRepository) {
        this.producerRepository = producerRepository;
    }
    async create(createProducerDto) {
        const referenceCode = await this.generateReferenceCode();
        const producer = this.producerRepository.create({
            ...createProducerDto,
            referenceCode,
        });
        return await this.producerRepository.save(producer);
    }
    async findAll() {
        return await this.producerRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const producer = await this.producerRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!producer) {
            throw new common_1.NotFoundException(`Producteur avec l'ID ${id} non trouvé`);
        }
        return producer;
    }
    async update(id, updateData) {
        const producer = await this.findOne(id);
        Object.assign(producer, updateData);
        return await this.producerRepository.save(producer);
    }
    async remove(id) {
        const producer = await this.findOne(id);
        producer.deletedAt = new Date();
        await this.producerRepository.save(producer);
    }
    async generateReferenceCode() {
        const lastProducer = await this.producerRepository
            .createQueryBuilder('producer')
            .where('producer.reference_code LIKE :prefix', { prefix: 'PROD-%' })
            .orderBy('producer.reference_code', 'DESC')
            .getOne();
        let sequence = 1;
        if (lastProducer) {
            const parts = lastProducer.referenceCode.split('-');
            const lastSequence = parseInt(parts[parts.length - 1], 10);
            sequence = lastSequence + 1;
        }
        return `PROD-${String(sequence).padStart(4, '0')}`;
    }
};
exports.ProducersService = ProducersService;
exports.ProducersService = ProducersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producer_entity_1.Producer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProducersService);
//# sourceMappingURL=producers.service.js.map