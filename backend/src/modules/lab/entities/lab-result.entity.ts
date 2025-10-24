import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { LabTest } from './lab-test.entity';
  
  @Entity('lab_results')
  export class LabResult {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'test_id' })
    testId: string;
  
    @ManyToOne(() => LabTest, (test) => test.results, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'test_id' })
    test: LabTest;
  
    @Column({ name: 'parameter_name' })
    parameterName: string;
  
    @Column({ name: 'measured_value', type: 'text' })
    measuredValue: string;
  
    @Column({ nullable: true })
    unit: string;
  
    @Column({ name: 'acceptable_limit', type: 'text', nullable: true })
    acceptableLimit: string;
  
    @Column({ name: 'is_compliant', type: 'boolean' })
    isCompliant: boolean;
  
    @Column({ nullable: true })
    method: string;
  
    @Column({ type: 'text', nullable: true })
    uncertainty: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  }