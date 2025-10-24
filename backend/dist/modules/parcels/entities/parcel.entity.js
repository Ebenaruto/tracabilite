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
exports.Parcel = exports.CultivationType = exports.ParcelStatus = void 0;
const typeorm_1 = require("typeorm");
const producer_entity_1 = require("../../producers/entities/producer.entity");
var ParcelStatus;
(function (ParcelStatus) {
    ParcelStatus["ACTIVE"] = "active";
    ParcelStatus["CONVERTING"] = "converting";
    ParcelStatus["RESTING"] = "resting";
    ParcelStatus["ABANDONED"] = "abandoned";
})(ParcelStatus || (exports.ParcelStatus = ParcelStatus = {}));
var CultivationType;
(function (CultivationType) {
    CultivationType["CONVENTIONAL"] = "conventional";
    CultivationType["ORGANIC"] = "organic";
    CultivationType["RATIONAL"] = "rational";
})(CultivationType || (exports.CultivationType = CultivationType = {}));
let Parcel = class Parcel {
    id;
    referenceCode;
    name;
    producerId;
    producer;
    areaHectares;
    mangoVariety;
    treeCount;
    plantingYear;
    cultivationType;
    hasIrrigation;
    certifications;
    status;
    notes;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Parcel = Parcel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Parcel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_code', unique: true }),
    __metadata("design:type", String)
], Parcel.prototype, "referenceCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Parcel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producer_id' }),
    __metadata("design:type", String)
], Parcel.prototype, "producerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producer_entity_1.Producer),
    (0, typeorm_1.JoinColumn)({ name: 'producer_id' }),
    __metadata("design:type", producer_entity_1.Producer)
], Parcel.prototype, "producer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'area_hectares', type: 'decimal', precision: 10, scale: 4 }),
    __metadata("design:type", Number)
], Parcel.prototype, "areaHectares", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mango_variety', nullable: true }),
    __metadata("design:type", String)
], Parcel.prototype, "mangoVariety", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tree_count', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Parcel.prototype, "treeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'planting_year', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Parcel.prototype, "plantingYear", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cultivation_type',
        type: 'enum',
        enum: CultivationType,
        default: CultivationType.CONVENTIONAL,
    }),
    __metadata("design:type", String)
], Parcel.prototype, "cultivationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_irrigation', default: false }),
    __metadata("design:type", Boolean)
], Parcel.prototype, "hasIrrigation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Parcel.prototype, "certifications", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ParcelStatus,
        default: ParcelStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Parcel.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Parcel.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Parcel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Parcel.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Parcel.prototype, "deletedAt", void 0);
exports.Parcel = Parcel = __decorate([
    (0, typeorm_1.Entity)('parcels')
], Parcel);
//# sourceMappingURL=parcel.entity.js.map