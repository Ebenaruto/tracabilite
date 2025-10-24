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
  import { User } from '../../users/entities/user.entity';
  import { LabResult } from './lab-result.entity';
  
  export enum TestType {
    MICROBIOLOGICAL = 'microbiological',
    PESTICIDES = 'pesticides',
    HUMIDITY = 'humidity',
    WATER_ACTIVITY = 'water_activity',
    ORGANOLEPTIC = 'organoleptic',
    PHYSICAL_CHEMICAL = 'physical_chemical',
  }
  
  export enum TestStatus {
    PLANNED = 'planned',
    SAMPLED = 'sampled',
    IN_ANALYSIS = 'in_analysis',
    COMPLETED = 'completed',
    VALIDATED = 'validated',
  }
  
  @Entity('lab_tests')
  @Index(['lotId', 'testType'])
  export class LabTest {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'lot_id' })
    lotId: string;
  
    @ManyToOne(() => Lot)
    @JoinColumn({ name: 'lot_id' })
    lot: Lot;
  
    @Column({
      name: 'test_type',
      type: 'enum',
      enum: TestType,
    })
    testType: TestType;
  
    @Column({ name: 'sample_id', unique: true })
    sampleId: string;
  
    @Column({ name: 'sampling_datetime', type: 'timestamp' })
    samplingDatetime: Date;
  
    @Column({ name: 'analysis_datetime', type: 'timestamp', nullable: true })
    analysisDatetime: Date;
  
    @Column({ name: 'laboratory_name', nullable: true })
    laboratoryName: string;
  
    @Column({ name: 'laboratory_type', nullable: true })
    laboratoryType: string; // internal/external
  
    @Column({ name: 'operator_id', nullable: true })
    operatorId: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'operator_id' })
    operator: User;
  
    @Column({
      name: 'status',
      type: 'enum',
      enum: TestStatus,
      default: TestStatus.PLANNED,
    })
    status: TestStatus;
  
    @Column({ name: 'certificate_number', nullable: true })
    certificateNumber: string;
  
    @Column({ name: 'certificate_file_url', nullable: true })
    certificateFileUrl: string;
  
    @Column({ name: 'is_compliant', type: 'boolean', nullable: true })
    isCompliant: boolean;
  
    @Column({ type: 'text', nullable: true })
    notes: string;
  
    @Column({ name: 'validated_by', nullable: true })
    validatedBy: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'validated_by' })
    validator: User;
  
    @Column({ name: 'validated_at', type: 'timestamp', nullable: true })
    validatedAt: Date;
  
    @OneToMany(() => LabResult, (result: LabResult) => result.test, { cascade: true, eager: true })
    results: LabResult[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;
  }