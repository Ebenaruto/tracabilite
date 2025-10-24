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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNonConformityDto = exports.CorrectiveActionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const non_conformity_entity_1 = require("../entities/non-conformity.entity");
const corrective_action_entity_1 = require("../entities/corrective-action.entity");
class CorrectiveActionDto {
    actionType;
    description;
    responsibleUserId;
    dueDate;
}
exports.CorrectiveActionDto = CorrectiveActionDto;
__decorate([
    (0, class_validator_1.IsEnum)(corrective_action_entity_1.ActionType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CorrectiveActionDto.prototype, "actionType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CorrectiveActionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CorrectiveActionDto.prototype, "responsibleUserId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CorrectiveActionDto.prototype, "dueDate", void 0);
class CreateNonConformityDto {
    lotId;
    labTestId;
    ncType;
    severity;
    description;
    identifiedCause;
    potentialImpact;
    openedBy;
    assignedTo;
    targetResolutionDate;
    correctiveActions;
}
exports.CreateNonConformityDto = CreateNonConformityDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "lotId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "labTestId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(non_conformity_entity_1.NCType),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le type de non-conformité est requis' }),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "ncType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(non_conformity_entity_1.NCSeverity),
    (0, class_validator_1.IsNotEmpty)({ message: 'La gravité est requise' }),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "severity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La description est requise' }),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "identifiedCause", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "potentialImpact", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'auteur est requis' }),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "openedBy", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "assignedTo", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNonConformityDto.prototype, "targetResolutionDate", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CorrectiveActionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNonConformityDto.prototype, "correctiveActions", void 0);
//# sourceMappingURL=create-non-conformity.dto.js.map