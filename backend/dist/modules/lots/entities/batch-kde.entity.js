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
exports.BatchKDE = void 0;
const typeorm_1 = require("typeorm");
const batch_event_entity_1 = require("./batch-event.entity");
let BatchKDE = class BatchKDE {
    id;
    eventId;
    event;
    keyName;
    value;
    unit;
    createdAt;
};
exports.BatchKDE = BatchKDE;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BatchKDE.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id' }),
    __metadata("design:type", String)
], BatchKDE.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => batch_event_entity_1.BatchEvent, (event) => event.kdes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", batch_event_entity_1.BatchEvent)
], BatchKDE.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'key_name' }),
    __metadata("design:type", String)
], BatchKDE.prototype, "keyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BatchKDE.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BatchKDE.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BatchKDE.prototype, "createdAt", void 0);
exports.BatchKDE = BatchKDE = __decorate([
    (0, typeorm_1.Entity)('batch_kdes')
], BatchKDE);
//# sourceMappingURL=batch-kde.entity.js.map