import { Role } from './role.entity.js';
export declare enum PermissionAction {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
    EXPORT = "export",
    VALIDATE = "validate",
    APPROVE = "approve"
}
export declare enum PermissionResource {
    USERS = "users",
    ROLES = "roles",
    LOTS = "lots",
    PRODUCERS = "producers",
    PARCELS = "parcels",
    LAB_TESTS = "lab_tests",
    NON_CONFORMITIES = "non_conformities",
    CCPS = "ccps",
    RECALLS = "recalls",
    REPORTS = "reports",
    AUDIT_LOGS = "audit_logs",
    SYSTEM_CONFIG = "system_config"
}
export declare class Permission {
    id: string;
    resource: PermissionResource;
    action: PermissionAction;
    description: string;
    roles: Role[];
    get name(): string;
}
