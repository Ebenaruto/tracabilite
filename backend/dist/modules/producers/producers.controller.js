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
exports.ProducersController = void 0;
const common_1 = require("@nestjs/common");
const producers_service_1 = require("./producers.service");
const create_producer_dto_1 = require("./dto/create-producer.dto");
let ProducersController = class ProducersController {
    producersService;
    constructor(producersService) {
        this.producersService = producersService;
    }
    async create(createProducerDto) {
        return await this.producersService.create(createProducerDto);
    }
    async findAll() {
        return await this.producersService.findAll();
    }
    async findOne(id) {
        return await this.producersService.findOne(id);
    }
    async update(id, updateProducerDto) {
        return await this.producersService.update(id, updateProducerDto);
    }
    async remove(id) {
        await this.producersService.remove(id);
    }
};
exports.ProducersController = ProducersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producer_dto_1.CreateProducerDto]),
    __metadata("design:returntype", Promise)
], ProducersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProducersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProducersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProducersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProducersController.prototype, "remove", null);
exports.ProducersController = ProducersController = __decorate([
    (0, common_1.Controller)('producers'),
    __metadata("design:paramtypes", [producers_service_1.ProducersService])
], ProducersController);
//# sourceMappingURL=producers.controller.js.map