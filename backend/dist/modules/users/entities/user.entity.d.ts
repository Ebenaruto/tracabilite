import { Role } from './role.entity.js';
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    language: string;
    profilePictureUrl: string;
    status: UserStatus;
    lastLoginAt: Date;
    failedLoginAttempts: number;
    blockedUntil: Date;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
