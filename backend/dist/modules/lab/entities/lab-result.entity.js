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
exports.LabResult = void 0;
const typeorm_1 = require("typeorm");
const lab_test_entity_1 = require("./lab-test.entity");
let LabResult = class LabResult {
    id;
    testId;
    test;
    parameterName;
    measuredValue;
    unit;
    acceptableLimit;
    isCompliant;
    method;
    uncertainty;
    createdAt;
};
exports.LabResult = LabResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LabResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'test_id' }),
    __metadata("design:type", String)
], LabResult.prototype, "testId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lab_test_entity_1.LabTest, (test) => test.results, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'test_id' }),
    __metadata("design:type", lab_test_entity_1.LabTest)
], LabResult.prototype, "test", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parameter_name' }),
    __metadata("design:type", String)
], LabResult.prototype, "parameterName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'measured_value', type: 'text' }),
    __metadata("design:type", String)
], LabResult.prototype, "measuredValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LabResult.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acceptable_limit', type: 'text', nullable: true }),
    __metadata("design:type", String)
], LabResult.prototype, "acceptableLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_compliant', type: 'boolean' }),
    __metadata("design:type", Boolean)
], LabResult.prototype, "isCompliant", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LabResult.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LabResult.prototype, "uncertainty", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LabResult.prototype, "createdAt", void 0);
exports.LabResult = LabResult = __decorate([
    (0, typeorm_1.Entity)('lab_results')
], LabResult);
//# sourceMappingURL=lab-result.entity.js.map