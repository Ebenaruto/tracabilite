import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { NonConformity } from './non-conformity.entity';
  import { User } from '../../users/entities/user.entity';
  
  export enum ActionType {
    IMMEDIATE = 'immediate',
    CORRECTIVE = 'corrective',
    PREVENTIVE = 'preventive',
  }
  
  export enum ActionStatus {
    PLANNED = 'planned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    VERIFIED = 'verified',
  }
  
  @Entity('corrective_actions')
  export class CorrectiveAction {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'non_conformity_id' })
    nonConformityId: string;
  
    @ManyToOne(() => NonConformity, (nc) => nc.correctiveActions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'non_conformity_id' })
    nonConformity: NonConformity;
  
    @Column({
      name: 'action_type',
      type: 'enum',
      enum: ActionType,
    })
    actionType: ActionType;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ name: 'responsible_user_id', nullable: true })
    responsibleUserId: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'responsible_user_id' })
    responsibleUser: User;
  
    @Column({ name: 'due_date', type: 'date', nullable: true })
    dueDate: Date;
  
    @Column({ name: 'completion_date', type: 'date', nullable: true })
    completionDate: Date;
  
    @Column({
      type: 'enum',
      enum: ActionStatus,
      default: ActionStatus.PLANNED,
    })
    status: ActionStatus;
  
    @Column({ name: 'effectiveness_verified', default: false })
    effectivenessVerified: boolean;
  
    @Column({ name: 'verification_notes', type: 'text', nullable: true })
    verificationNotes: string;
  
    @Column({ name: 'verified_by', nullable: true })
    verifiedBy: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'verified_by' })
    verifier: User;
  
    @Column({ name: 'verified_at', type: 'timestamp', nullable: true })
    verifiedAt: Date;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }