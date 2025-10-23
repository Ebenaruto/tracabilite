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
exports.Producer = exports.ProducerStatus = exports.ProducerType = void 0;
const typeorm_1 = require("typeorm");
var ProducerType;
(function (ProducerType) {
    ProducerType["INDIVIDUAL"] = "individual";
    ProducerType["COOPERATIVE"] = "cooperative";
    ProducerType["GROUP"] = "group";
})(ProducerType || (exports.ProducerType = ProducerType = {}));
var ProducerStatus;
(function (ProducerStatus) {
    ProducerStatus["ACTIVE"] = "active";
    ProducerStatus["INACTIVE"] = "inactive";
    ProducerStatus["SUSPENDED"] = "suspended";
})(ProducerStatus || (exports.ProducerStatus = ProducerStatus = {}));
let Producer = class Producer {
    id;
    referenceCode;
    fullName;
    type;
    registryNumber;
    phone;
    email;
    address;
    certifications;
    status;
    contractStartDate;
    notes;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Producer = Producer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Producer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_code', unique: true }),
    __metadata("design:type", String)
], Producer.prototype, "referenceCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], Producer.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProducerType,
        default: ProducerType.INDIVIDUAL,
    }),
    __metadata("design:type", String)
], Producer.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registry_number', nullable: true }),
    __metadata("design:type", String)
], Producer.prototype, "registryNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Producer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Producer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Producer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Producer.prototype, "certifications", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProducerStatus,
        default: ProducerStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Producer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_start_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Producer.prototype, "contractStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Producer.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Producer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Producer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Producer.prototype, "deletedAt", void 0);
exports.Producer = Producer = __decorate([
    (0, typeorm_1.Entity)('producers')
], Producer);
//# sourceMappingURL=producer.entity.js.map