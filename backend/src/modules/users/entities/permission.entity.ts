import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
  } from 'typeorm';
  import { Role } from './role.entity.js';
  
  export enum PermissionAction {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
    EXPORT = 'export',
    VALIDATE = 'validate',
    APPROVE = 'approve',
  }
  
  export enum PermissionResource {
    USERS = 'users',
    ROLES = 'roles',
    LOTS = 'lots',
    PRODUCERS = 'producers',
    PARCELS = 'parcels',
    LAB_TESTS = 'lab_tests',
    NON_CONFORMITIES = 'non_conformities',
    CCPS = 'ccps',
    RECALLS = 'recalls',
    REPORTS = 'reports',
    AUDIT_LOGS = 'audit_logs',
    SYSTEM_CONFIG = 'system_config',
  }
  
  @Entity('permissions')
  export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'enum',
      enum: PermissionResource,
    })
    resource: PermissionResource;
  
    @Column({
      type: 'enum',
      enum: PermissionAction,
    })
    action: PermissionAction;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
  
    get name(): string {
      return `${this.action}:${this.resource}`;
    }
  }