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
exports.NonConformity = exports.NCStatus = exports.NCSeverity = exports.NCType = void 0;
const typeorm_1 = require("typeorm");
const lot_entity_1 = require("../../lots/entities/lot.entity");
const lab_test_entity_1 = require("../../lab/entities/lab-test.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const corrective_action_entity_1 = require("./corrective-action.entity");
var NCType;
(function (NCType) {
    NCType["MICROBIOLOGICAL"] = "microbiological";
    NCType["CHEMICAL"] = "chemical";
    NCType["PHYSICAL"] = "physical";
    NCType["ORGANOLEPTIC"] = "organoleptic";
    NCType["PROCESS"] = "process";
    NCType["DOCUMENTATION"] = "documentation";
    NCType["OTHER"] = "other";
})(NCType || (exports.NCType = NCType = {}));
var NCSeverity;
(function (NCSeverity) {
    NCSeverity["MINOR"] = "minor";
    NCSeverity["MAJOR"] = "major";
    NCSeverity["CRITICAL"] = "critical";
})(NCSeverity || (exports.NCSeverity = NCSeverity = {}));
var NCStatus;
(function (NCStatus) {
    NCStatus["OPEN"] = "open";
    NCStatus["IN_PROGRESS"] = "in_progress";
    NCStatus["RESOLVED"] = "resolved";
    NCStatus["CLOSED"] = "closed";
})(NCStatus || (exports.NCStatus = NCStatus = {}));
let NonConformity = class NonConformity {
    id;
    referenceNumber;
    lotId;
    lot;
    labTestId;
    labTest;
    ncType;
    severity;
    description;
    identifiedCause;
    potentialImpact;
    status;
    openedBy;
    opener;
    assignedTo;
    assignee;
    openedAt;
    targetResolutionDate;
    closedAt;
    closedBy;
    closer;
    closureNotes;
    correctiveActions;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.NonConformity = NonConformity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NonConformity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference_number', unique: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lot_id', nullable: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "lotId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lot_entity_1.Lot),
    (0, typeorm_1.JoinColumn)({ name: 'lot_id' }),
    __metadata("design:type", lot_entity_1.Lot)
], NonConformity.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lab_test_id', nullable: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "labTestId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lab_test_entity_1.LabTest),
    (0, typeorm_1.JoinColumn)({ name: 'lab_test_id' }),
    __metadata("design:type", lab_test_entity_1.LabTest)
], NonConformity.prototype, "labTest", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'nc_type',
        type: 'enum',
        enum: NCType,
    }),
    __metadata("design:type", String)
], NonConformity.prototype, "ncType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'severity',
        type: 'enum',
        enum: NCSeverity,
    }),
    __metadata("design:type", String)
], NonConformity.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], NonConformity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'identified_cause', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "identifiedCause", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'potential_impact', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "potentialImpact", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: NCStatus,
        default: NCStatus.OPEN,
    }),
    __metadata("design:type", String)
], NonConformity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'opened_by' }),
    __metadata("design:type", String)
], NonConformity.prototype, "openedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'opened_by' }),
    __metadata("design:type", user_entity_1.User)
], NonConformity.prototype, "opener", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to', nullable: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_to' }),
    __metadata("design:type", user_entity_1.User)
], NonConformity.prototype, "assignee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'opened_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], NonConformity.prototype, "openedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_resolution_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], NonConformity.prototype, "targetResolutionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NonConformity.prototype, "closedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closed_by', nullable: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "closedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'closed_by' }),
    __metadata("design:type", user_entity_1.User)
], NonConformity.prototype, "closer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'closure_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NonConformity.prototype, "closureNotes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => corrective_action_entity_1.CorrectiveAction, (action) => action.nonConformity, { cascade: true }),
    __metadata("design:type", Array)
], NonConformity.prototype, "correctiveActions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NonConformity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], NonConformity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NonConformity.prototype, "deletedAt", void 0);
exports.NonConformity = NonConformity = __decorate([
    (0, typeorm_1.Entity)('non_conformities'),
    (0, typeorm_1.Index)(['lotId', 'status'])
], NonConformity);
//# sourceMappingURL=non-conformity.entity.js.map