import { User } from './user.entity.js';
import { Permission } from './permission.entity.js';
export declare class Role {
    id: string;
    name: string;
    description: string;
    isSystem: boolean;
    users: User[];
    permissions: Permission[];
    createdAt: Date;
}
