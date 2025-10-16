import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { User } from './user.entity.js';
  import { Permission } from './permission.entity.js';
  
  @Entity('roles')
  export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ name: 'is_system', default: false })
    isSystem: boolean;
  
    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
  
    @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true })
    @JoinTable({
      name: 'role_permissions',
      joinColumn: { name: 'role_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: Permission[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  }