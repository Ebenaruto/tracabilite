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
exports.Permission = exports.PermissionResource = exports.PermissionAction = void 0;
const typeorm_1 = require("typeorm");
const role_entity_js_1 = require("./role.entity.js");
var PermissionAction;
(function (PermissionAction) {
    PermissionAction["CREATE"] = "create";
    PermissionAction["READ"] = "read";
    PermissionAction["UPDATE"] = "update";
    PermissionAction["DELETE"] = "delete";
    PermissionAction["EXPORT"] = "export";
    PermissionAction["VALIDATE"] = "validate";
    PermissionAction["APPROVE"] = "approve";
})(PermissionAction || (exports.PermissionAction = PermissionAction = {}));
var PermissionResource;
(function (PermissionResource) {
    PermissionResource["USERS"] = "users";
    PermissionResource["ROLES"] = "roles";
    PermissionResource["LOTS"] = "lots";
    PermissionResource["PRODUCERS"] = "producers";
    PermissionResource["PARCELS"] = "parcels";
    PermissionResource["LAB_TESTS"] = "lab_tests";
    PermissionResource["NON_CONFORMITIES"] = "non_conformities";
    PermissionResource["CCPS"] = "ccps";
    PermissionResource["RECALLS"] = "recalls";
    PermissionResource["REPORTS"] = "reports";
    PermissionResource["AUDIT_LOGS"] = "audit_logs";
    PermissionResource["SYSTEM_CONFIG"] = "system_config";
})(PermissionResource || (exports.PermissionResource = PermissionResource = {}));
let Permission = class Permission {
    id;
    resource;
    action;
    description;
    roles;
    get name() {
        return `${this.action}:${this.resource}`;
    }
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PermissionResource,
    }),
    __metadata("design:type", String)
], Permission.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PermissionAction,
    }),
    __metadata("design:type", String)
], Permission.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_js_1.Role, (role) => role.permissions),
    __metadata("design:type", Array)
], Permission.prototype, "roles", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)('permissions')
], Permission);
//# sourceMappingURL=permission.entity.js.map