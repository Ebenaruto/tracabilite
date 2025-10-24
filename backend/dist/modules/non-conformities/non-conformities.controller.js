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
exports.NonConformitiesController = void 0;
const common_1 = require("@nestjs/common");
const non_conformities_service_1 = require("./non-conformities.service");
const create_non_conformity_dto_1 = require("./dto/create-non-conformity.dto");
const non_conformity_entity_1 = require("./entities/non-conformity.entity");
const corrective_action_entity_1 = require("./entities/corrective-action.entity");
let NonConformitiesController = class NonConformitiesController {
    nonConformitiesService;
    constructor(nonConformitiesService) {
        this.nonConformitiesService = nonConformitiesService;
    }
    async create(createNonConformityDto) {
        return await this.nonConformitiesService.create(createNonConformityDto);
    }
    async findAll(lotId, status) {
        if (lotId) {
            return await this.nonConformitiesService.findByLot(lotId);
        }
        if (status) {
            return await this.nonConformitiesService.findByStatus(status);
        }
        return await this.nonConformitiesService.findAll();
    }
    async findOne(id) {
        return await this.nonConformitiesService.findOne(id);
    }
    async updateStatus(id, status, userId) {
        return await this.nonConformitiesService.updateStatus(id, status, userId);
    }
    async assignTo(id, userId) {
        return await this.nonConformitiesService.assignTo(id, userId);
    }
    async addCorrectiveAction(id, actionData) {
        return await this.nonConformitiesService.addCorrectiveAction(id, actionData);
    }
    async updateActionStatus(actionId, status, completionDate) {
        return await this.nonConformitiesService.updateActionStatus(actionId, status, completionDate ? new Date(completionDate) : undefined);
    }
    async verifyAction(actionId, verifierId, verificationNotes) {
        return await this.nonConformitiesService.verifyAction(actionId, verifierId, verificationNotes);
    }
    async close(id, userId, closureNotes) {
        return await this.nonConformitiesService.close(id, userId, closureNotes);
    }
    async remove(id) {
        await this.nonConformitiesService.remove(id);
    }
};
exports.NonConformitiesController = NonConformitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_non_conformity_dto_1.CreateNonConformityDto]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('lotId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "assignTo", null);
__decorate([
    (0, common_1.Post)(':id/actions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "addCorrectiveAction", null);
__decorate([
    (0, common_1.Patch)('actions/:actionId/status'),
    __param(0, (0, common_1.Param)('actionId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('completionDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "updateActionStatus", null);
__decorate([
    (0, common_1.Patch)('actions/:actionId/verify'),
    __param(0, (0, common_1.Param)('actionId')),
    __param(1, (0, common_1.Body)('verifierId')),
    __param(2, (0, common_1.Body)('verificationNotes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "verifyAction", null);
__decorate([
    (0, common_1.Patch)(':id/close'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('closureNotes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "close", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NonConformitiesController.prototype, "remove", null);
exports.NonConformitiesController = NonConformitiesController = __decorate([
    (0, common_1.Controller)('non-conformities'),
    __metadata("design:paramtypes", [non_conformities_service_1.NonConformitiesService])
], NonConformitiesController);
//# sourceMappingURL=non-conformities.controller.js.map