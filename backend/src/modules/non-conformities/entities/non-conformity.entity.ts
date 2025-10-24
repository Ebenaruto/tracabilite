import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
  } from 'typeorm';
  import { Lot } from '../../lots/entities/lot.entity';
  import { LabTest } from '../../lab/entities/lab-test.entity';
  import { User } from '../../users/entities/user.entity';
  import { CorrectiveAction } from './corrective-action.entity';
  
  export enum NCType {
    MICROBIOLOGICAL = 'microbiological',
    CHEMICAL = 'chemical',
    PHYSICAL = 'physical',
    ORGANOLEPTIC = 'organoleptic',
    PROCESS = 'process',
    DOCUMENTATION = 'documentation',
    OTHER = 'other',
  }
  
  export enum NCSeverity {
    MINOR = 'minor',
    MAJOR = 'major',
    CRITICAL = 'critical',
  }
  
  export enum NCStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    CLOSED = 'closed',
  }
  
  @Entity('non_conformities')
  @Index(['lotId', 'status'])
  export class NonConformity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'reference_number', unique: true })
    referenceNumber: string;
  
    @Column({ name: 'lot_id', nullable: true })
    lotId: string;
  
    @ManyToOne(() => Lot)
    @JoinColumn({ name: 'lot_id' })
    lot: Lot;
  
    @Column({ name: 'lab_test_id', nullable: true })
    labTestId: string;
  
    @ManyToOne(() => LabTest)
    @JoinColumn({ name: 'lab_test_id' })
    labTest: LabTest;
  
    @Column({
      name: 'nc_type',
      type: 'enum',
      enum: NCType,
    })
    ncType: NCType;
  
    @Column({
      name: 'severity',
      type: 'enum',
      enum: NCSeverity,
    })
    severity: NCSeverity;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ name: 'identified_cause', type: 'text', nullable: true })
    identifiedCause: string;
  
    @Column({ name: 'potential_impact', type: 'text', nullable: true })
    potentialImpact: string;
  
    @Column({
      type: 'enum',
      enum: NCStatus,
      default: NCStatus.OPEN,
    })
    status: NCStatus;
  
    @Column({ name: 'opened_by' })
    openedBy: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'opened_by' })
    opener: User;
  
    @Column({ name: 'assigned_to', nullable: true })
    assignedTo: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'assigned_to' })
    assignee: User;
  
    @Column({ name: 'opened_at', type: 'timestamp' })
    openedAt: Date;
  
    @Column({ name: 'target_resolution_date', type: 'date', nullable: true })
    targetResolutionDate: Date;
  
    @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
    closedAt: Date;
  
    @Column({ name: 'closed_by', nullable: true })
    closedBy: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'closed_by' })
    closer: User;
  
    @Column({ name: 'closure_notes', type: 'text', nullable: true })
    closureNotes: string;
  
    @OneToMany(() => CorrectiveAction, (action) => action.nonConformity, { cascade: true })
    correctiveActions: CorrectiveAction[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;
  }