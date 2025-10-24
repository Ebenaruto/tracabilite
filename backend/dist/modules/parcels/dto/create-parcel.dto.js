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
exports.CreateParcelDto = void 0;
const class_validator_1 = require("class-validator");
const parcel_entity_1 = require("../entities/parcel.entity");
class CreateParcelDto {
    name;
    producerId;
    areaHectares;
    mangoVariety;
    treeCount;
    plantingYear;
    cultivationType;
    hasIrrigation;
    certifications;
    notes;
}
exports.CreateParcelDto = CreateParcelDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le nom de la parcelle est requis' }),
    __metadata("design:type", String)
], CreateParcelDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'ID du producteur est requis' }),
    __metadata("design:type", String)
], CreateParcelDto.prototype, "producerId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.0001, { message: 'La superficie doit être supérieure à 0' }),
    __metadata("design:type", Number)
], CreateParcelDto.prototype, "areaHectares", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateParcelDto.prototype, "mangoVariety", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateParcelDto.prototype, "treeCount", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateParcelDto.prototype, "plantingYear", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(parcel_entity_1.CultivationType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateParcelDto.prototype, "cultivationType", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateParcelDto.prototype, "hasIrrigation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateParcelDto.prototype, "certifications", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateParcelDto.prototype, "notes", void 0);
//# sourceMappingURL=create-parcel.dto.js.map