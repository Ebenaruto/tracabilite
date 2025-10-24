"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonConformitiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const non_conformities_service_1 = require("./non-conformities.service");
const non_conformities_controller_1 = require("./non-conformities.controller");
const non_conformity_entity_1 = require("./entities/non-conformity.entity");
const corrective_action_entity_1 = require("./entities/corrective-action.entity");
let NonConformitiesModule = class NonConformitiesModule {
};
exports.NonConformitiesModule = NonConformitiesModule;
exports.NonConformitiesModule = NonConformitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([non_conformity_entity_1.NonConformity, corrective_action_entity_1.CorrectiveAction])],
        controllers: [non_conformities_controller_1.NonConformitiesController],
        providers: [non_conformities_service_1.NonConformitiesService],
        exports: [non_conformities_service_1.NonConformitiesService],
    })
], NonConformitiesModule);
//# sourceMappingURL=non-conformities.module.js.map