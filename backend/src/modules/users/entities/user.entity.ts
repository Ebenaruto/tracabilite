import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  import { Role } from './role.entity.js';
  
  export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
  }
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    @Exclude()
    password: string;
  
    @Column({ name: 'full_name' })
    fullName: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ default: 'fr', length: 2 })
    language: string;
  
    @Column({ name: 'profile_picture_url', nullable: true })
    profilePictureUrl: string;
  
    @Column({
      type: 'enum',
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    })
    status: UserStatus;
  
    @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
    lastLoginAt: Date;
  
    @Column({ name: 'failed_login_attempts', default: 0 })
    @Exclude()
    failedLoginAttempts: number;
  
    @Column({ name: 'blocked_until', type: 'timestamp', nullable: true })
    @Exclude()
    blockedUntil: Date;
  
    @ManyToMany(() => Role, (role) => role.users, { eager: true })
    @JoinTable({
      name: 'user_roles',
      joinColumn: { name: 'user_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    @Exclude()
    deletedAt: Date;
  }