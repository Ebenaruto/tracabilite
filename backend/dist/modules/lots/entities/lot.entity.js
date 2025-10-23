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
exports.Lot = exports.DestinationMarket = exports.LotStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const batch_event_entity_1 = require("./batch-event.entity");
var LotStatus;
(function (LotStatus) {
    LotStatus["OPEN"] = "open";
    LotStatus["IN_PROGRESS"] = "in_progress";
    LotStatus["COMPLETED"] = "completed";
    LotStatus["SHIPPED"] = "shipped";
    LotStatus["RECALLED"] = "recalled";
})(LotStatus || (exports.LotStatus = LotStatus = {}));
var DestinationMarket;
(function (DestinationMarket) {
    DestinationMarket["LOCAL"] = "local";
    DestinationMarket["EXPORT_EU"] = "export_eu";
    DestinationMarket["EXPORT_US"] = "export_us";
    DestinationMarket["EXPORT_OTHER"] = "export_other";
})(DestinationMarket || (exports.DestinationMarket = DestinationMarket = {}));
let Lot = class Lot {
    id;
    lotNumber;
    status;
    initialQuantityKg;
    finalQuantityKg;
    destinationMarket;
    qrCodeUrl;
    publicUrlToken;
    mangoVariety;
    createdBy;
    creator;
    events;
    createdAt;
    completedAt;
    shippedAt;
    updatedAt;
    deletedAt;
    notes;
};
exports.Lot = Lot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lot_number', unique: true }),
    __metadata("design:type", String)
], Lot.prototype, "lotNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LotStatus,
        default: LotStatus.OPEN,
    }),
    __metadata("design:type", String)
], Lot.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'initial_quantity_kg', type: 'decimal', precision: 10, scale: 3 }),
    __metadata("design:type", Number)
], Lot.prototype, "initialQuantityKg", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'final_quantity_kg', type: 'decimal', precision: 10, scale: 3, nullable: true }),
    __metadata("design:type", Number)
], Lot.prototype, "finalQuantityKg", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'destination_market',
        type: 'enum',
        enum: DestinationMarket,
        nullable: true,
    }),
    __metadata("design:type", String)
], Lot.prototype, "destinationMarket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_code_url', nullable: true }),
    __metadata("design:type", String)
], Lot.prototype, "qrCodeUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'public_url_token', unique: true, nullable: true }),
    __metadata("design:type", String)
], Lot.prototype, "publicUrlToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mango_variety', nullable: true }),
    __metadata("design:type", String)
], Lot.prototype, "mangoVariety", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", String)
], Lot.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Lot.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => batch_event_entity_1.BatchEvent, (event) => event.lot, { cascade: true }),
    __metadata("design:type", Array)
], Lot.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Lot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Lot.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipped_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Lot.prototype, "shippedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Lot.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Lot.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Lot.prototype, "notes", void 0);
exports.Lot = Lot = __decorate([
    (0, typeorm_1.Entity)('lots')
], Lot);
//# sourceMappingURL=lot.entity.js.map