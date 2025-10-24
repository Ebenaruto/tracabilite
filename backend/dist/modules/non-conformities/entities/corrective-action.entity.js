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
exports.CorrectiveAction = exports.ActionStatus = exports.ActionType = void 0;
const typeorm_1 = require("typeorm");
const non_conformity_entity_1 = require("./non-conformity.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var ActionType;
(function (ActionType) {
    ActionType["IMMEDIATE"] = "immediate";
    ActionType["CORRECTIVE"] = "corrective";
    ActionType["PREVENTIVE"] = "preventive";
})(ActionType || (exports.ActionType = ActionType = {}));
var ActionStatus;
(function (ActionStatus) {
    ActionStatus["PLANNED"] = "planned";
    ActionStatus["IN_PROGRESS"] = "in_progress";
    ActionStatus["COMPLETED"] = "completed";
    ActionStatus["VERIFIED"] = "verified";
})(ActionStatus || (exports.ActionStatus = ActionStatus = {}));
let CorrectiveAction = class CorrectiveAction {
    id;
    nonConformityId;
    nonConformity;
    actionType;
    description;
    responsibleUserId;
    responsibleUser;
    dueDate;
    completionDate;
    status;
    effectivenessVerified;
    verificationNotes;
    verifiedBy;
    verifier;
    verifiedAt;
    createdAt;
    updatedAt;
};
exports.CorrectiveAction = CorrectiveAction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'non_conformity_id' }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "nonConformityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => non_conformity_entity_1.NonConformity, (nc) => nc.correctiveActions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'non_conformity_id' }),
    __metadata("design:type", non_conformity_entity_1.NonConformity)
], CorrectiveAction.prototype, "nonConformity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'action_type',
        type: 'enum',
        enum: ActionType,
    }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'responsible_user_id', nullable: true }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "responsibleUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'responsible_user_id' }),
    __metadata("design:type", user_entity_1.User)
], CorrectiveAction.prototype, "responsibleUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completion_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "completionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ActionStatus,
        default: ActionStatus.PLANNED,
    }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effectiveness_verified', default: false }),
    __metadata("design:type", Boolean)
], CorrectiveAction.prototype, "effectivenessVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verification_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "verificationNotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verified_by', nullable: true }),
    __metadata("design:type", String)
], CorrectiveAction.prototype, "verifiedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'verified_by' }),
    __metadata("design:type", user_entity_1.User)
], CorrectiveAction.prototype, "verifier", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verified_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "verifiedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CorrectiveAction.prototype, "updatedAt", void 0);
exports.CorrectiveAction = CorrectiveAction = __decorate([
    (0, typeorm_1.Entity)('corrective_actions')
], CorrectiveAction);
//# sourceMappingURL=corrective-action.entity.js.map