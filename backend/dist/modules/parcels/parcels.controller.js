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
exports.ParcelsController = void 0;
const common_1 = require("@nestjs/common");
const parcels_service_1 = require("./parcels.service");
const create_parcel_dto_1 = require("./dto/create-parcel.dto");
const parcel_entity_1 = require("./entities/parcel.entity");
let ParcelsController = class ParcelsController {
    parcelsService;
    constructor(parcelsService) {
        this.parcelsService = parcelsService;
    }
    async create(createParcelDto) {
        return await this.parcelsService.create(createParcelDto);
    }
    async findAll(producerId) {
        if (producerId) {
            return await this.parcelsService.findByProducer(producerId);
        }
        return await this.parcelsService.findAll();
    }
    async findOne(id) {
        return await this.parcelsService.findOne(id);
    }
    async update(id, updateParcelDto) {
        return await this.parcelsService.update(id, updateParcelDto);
    }
    async updateStatus(id, status) {
        return await this.parcelsService.updateStatus(id, status);
    }
    async remove(id) {
        await this.parcelsService.remove(id);
    }
};
exports.ParcelsController = ParcelsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_parcel_dto_1.CreateParcelDto]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('producerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParcelsController.prototype, "remove", null);
exports.ParcelsController = ParcelsController = __decorate([
    (0, common_1.Controller)('parcels'),
    __metadata("design:paramtypes", [parcels_service_1.ParcelsService])
], ParcelsController);
//# sourceMappingURL=parcels.controller.js.map