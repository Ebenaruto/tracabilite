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
exports.CreateLotDto = void 0;
const class_validator_1 = require("class-validator");
const lot_entity_1 = require("../entities/lot.entity");
class CreateLotDto {
    initialQuantityKg;
    mangoVariety;
    destinationMarket;
    notes;
}
exports.CreateLotDto = CreateLotDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.001),
    (0, class_validator_1.IsNotEmpty)({ message: 'La quantité initiale est requise' }),
    __metadata("design:type", Number)
], CreateLotDto.prototype, "initialQuantityKg", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "mangoVariety", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(lot_entity_1.DestinationMarket),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "destinationMarket", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "notes", void 0);
//# sourceMappingURL=create-lot.dto.js.map