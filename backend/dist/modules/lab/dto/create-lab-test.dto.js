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
exports.CreateLabTestDto = exports.LabResultDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const lab_test_entity_1 = require("../entities/lab-test.entity");
class LabResultDto {
    parameterName;
    measuredValue;
    unit;
    acceptableLimit;
    method;
    uncertainty;
}
exports.LabResultDto = LabResultDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LabResultDto.prototype, "parameterName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LabResultDto.prototype, "measuredValue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LabResultDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LabResultDto.prototype, "acceptableLimit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LabResultDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LabResultDto.prototype, "uncertainty", void 0);
class CreateLabTestDto {
    lotId;
    testType;
    samplingDatetime;
    analysisDatetime;
    laboratoryName;
    laboratoryType;
    operatorId;
    certificateNumber;
    certificateFileUrl;
    notes;
    results;
}
exports.CreateLabTestDto = CreateLabTestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'ID du lot est requis' }),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "lotId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(lab_test_entity_1.TestType),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le type de test est requis' }),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "testType", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La date de prélèvement est requise' }),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "samplingDatetime", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "analysisDatetime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "laboratoryName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "laboratoryType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "operatorId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "certificateNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "certificateFileUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLabTestDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LabResultDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateLabTestDto.prototype, "results", void 0);
//# sourceMappingURL=create-lab-test.dto.js.map