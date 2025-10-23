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
exports.BatchEvent = exports.EventType = void 0;
const typeorm_1 = require("typeorm");
const lot_entity_1 = require("./lot.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const batch_kde_entity_1 = require("./batch-kde.entity");
var EventType;
(function (EventType) {
    EventType["HARVEST"] = "harvest";
    EventType["RECEPTION"] = "reception";
    EventType["WASHING"] = "washing";
    EventType["PRE_DRYING"] = "pre_drying";
    EventType["CUTTING"] = "cutting";
    EventType["DRYING"] = "drying";
    EventType["POST_DRYING_QC"] = "post_drying_qc";
    EventType["PACKAGING"] = "packaging";
    EventType["LABELING"] = "labeling";
    EventType["STORAGE"] = "storage";
    EventType["SHIPPING"] = "shipping";
})(EventType || (exports.EventType = EventType = {}));
let BatchEvent = class BatchEvent {
    id;
    lotId;
    lot;
    eventType;
    eventDatetime;
    operatorId;
    operator;
    durationMinutes;
    notes;
    kdes;
    createdAt;
};
exports.BatchEvent = BatchEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BatchEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lot_id' }),
    __metadata("design:type", String)
], BatchEvent.prototype, "lotId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lot_entity_1.Lot, (lot) => lot.events, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'lot_id' }),
    __metadata("design:type", lot_entity_1.Lot)
], BatchEvent.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'event_type',
        type: 'enum',
        enum: EventType,
    }),
    __metadata("design:type", String)
], BatchEvent.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_datetime', type: 'timestamp' }),
    __metadata("design:type", Date)
], BatchEvent.prototype, "eventDatetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operator_id', nullable: true }),
    __metadata("design:type", String)
], BatchEvent.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'operator_id' }),
    __metadata("design:type", user_entity_1.User)
], BatchEvent.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_minutes', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], BatchEvent.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BatchEvent.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => batch_kde_entity_1.BatchKDE, (kde) => kde.event, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], BatchEvent.prototype, "kdes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BatchEvent.prototype, "createdAt", void 0);
exports.BatchEvent = BatchEvent = __decorate([
    (0, typeorm_1.Entity)('batch_events'),
    (0, typeorm_1.Index)(['lotId', 'eventDatetime'])
], BatchEvent);
//# sourceMappingURL=batch-event.entity.js.map