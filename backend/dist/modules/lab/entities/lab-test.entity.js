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
exports.LabTest = exports.TestStatus = exports.TestType = void 0;
const typeorm_1 = require("typeorm");
const lot_entity_1 = require("../../lots/entities/lot.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const lab_result_entity_1 = require("./lab-result.entity");
var TestType;
(function (TestType) {
    TestType["MICROBIOLOGICAL"] = "microbiological";
    TestType["PESTICIDES"] = "pesticides";
    TestType["HUMIDITY"] = "humidity";
    TestType["WATER_ACTIVITY"] = "water_activity";
    TestType["ORGANOLEPTIC"] = "organoleptic";
    TestType["PHYSICAL_CHEMICAL"] = "physical_chemical";
})(TestType || (exports.TestType = TestType = {}));
var TestStatus;
(function (TestStatus) {
    TestStatus["PLANNED"] = "planned";
    TestStatus["SAMPLED"] = "sampled";
    TestStatus["IN_ANALYSIS"] = "in_analysis";
    TestStatus["COMPLETED"] = "completed";
    TestStatus["VALIDATED"] = "validated";
})(TestStatus || (exports.TestStatus = TestStatus = {}));
let LabTest = class LabTest {
    id;
    lotId;
    lot;
    testType;
    sampleId;
    samplingDatetime;
    analysisDatetime;
    laboratoryName;
    laboratoryType;
    operatorId;
    operator;
    status;
    certificateNumber;
    certificateFileUrl;
    isCompliant;
    notes;
    validatedBy;
    validator;
    validatedAt;
    results;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.LabTest = LabTest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LabTest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lot_id' }),
    __metadata("design:type", String)
], LabTest.prototype, "lotId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lot_entity_1.Lot),
    (0, typeorm_1.JoinColumn)({ name: 'lot_id' }),
    __metadata("design:type", lot_entity_1.Lot)
], LabTest.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'test_type',
        type: 'enum',
        enum: TestType,
    }),
    __metadata("design:type", String)
], LabTest.prototype, "testType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sample_id', unique: true }),
    __metadata("design:type", String)
], LabTest.prototype, "sampleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sampling_datetime', type: 'timestamp' }),
    __metadata("design:type", Date)
], LabTest.prototype, "samplingDatetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'analysis_datetime', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LabTest.prototype, "analysisDatetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'laboratory_name', nullable: true }),
    __metadata("design:type", String)
], LabTest.prototype, "laboratoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'laboratory_type', nullable: true }),
    __metadata("design:type", String)
], LabTest.prototype, "laboratoryType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', nullable: true }),
    __metadata("design:type", String)
], LabTest.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", user_entity_1.User)
], LabTest.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: TestStatus,
        default: TestStatus.PLANNED,
    }),
    __metadata("design:type", String)
], LabTest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certificate_number', nullable: true }),
    __metadata("design:type", String)
], LabTest.prototype, "certificateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'certificate_file_url', nullable: true }),
    __metadata("design:type", String)
], LabTest.prototype, "certificateFileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_compliant', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], LabTest.prototype, "isCompliant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LabTest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_by', nullable: true }),
    __metadata("design:type", String)
], LabTest.prototype, "validatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'validated_by' }),
    __metadata("design:type", user_entity_1.User)
], LabTest.prototype, "validator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LabTest.prototype, "validatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lab_result_entity_1.LabResult, (result) => result.test, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], LabTest.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LabTest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], LabTest.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LabTest.prototype, "deletedAt", void 0);
exports.LabTest = LabTest = __decorate([
    (0, typeorm_1.Entity)('lab_tests'),
    (0, typeorm_1.Index)(['lotId', 'testType'])
], LabTest);
//# sourceMappingURL=lab-test.entity.js.map