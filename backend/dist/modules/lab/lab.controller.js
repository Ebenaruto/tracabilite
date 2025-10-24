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
exports.LabController = void 0;
const common_1 = require("@nestjs/common");
const lab_service_1 = require("./lab.service");
const create_lab_test_dto_1 = require("./dto/create-lab-test.dto");
const lab_test_entity_1 = require("./entities/lab-test.entity");
let LabController = class LabController {
    labService;
    constructor(labService) {
        this.labService = labService;
    }
    async create(createLabTestDto) {
        return await this.labService.create(createLabTestDto);
    }
    async findAll(lotId) {
        if (lotId) {
            return await this.labService.findByLot(lotId);
        }
        return await this.labService.findAll();
    }
    async findOne(id) {
        return await this.labService.findOne(id);
    }
    async updateStatus(id, status) {
        return await this.labService.updateStatus(id, status);
    }
    async validate(id, validatorId) {
        return await this.labService.validate(id, validatorId);
    }
    async remove(id) {
        await this.labService.remove(id);
    }
};
exports.LabController = LabController;
__decorate([
    (0, common_1.Post)('tests'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lab_test_dto_1.CreateLabTestDto]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('tests'),
    __param(0, (0, common_1.Query)('lotId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('tests/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)('tests/:id/validate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('validatorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "validate", null);
__decorate([
    (0, common_1.Delete)('tests/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LabController.prototype, "remove", null);
exports.LabController = LabController = __decorate([
    (0, common_1.Controller)('lab'),
    __metadata("design:paramtypes", [lab_service_1.LabService])
], LabController);
//# sourceMappingURL=lab.controller.js.map