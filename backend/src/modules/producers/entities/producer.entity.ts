import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProducerType {
  INDIVIDUAL = 'individual',
  COOPERATIVE = 'cooperative',
  GROUP = 'group',
}

export enum ProducerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'reference_code', unique: true })
  referenceCode: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({
    type: 'enum',
    enum: ProducerType,
    default: ProducerType.INDIVIDUAL,
  })
  type: ProducerType;

  @Column({ name: 'registry_number', nullable: true })
  registryNumber: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  address: {
    street?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  };

  @Column({ type: 'jsonb', default: [] })
  certifications: Array<{
    type: string;
    number: string;
    issuer: string;
    issueDate: Date;
    expiryDate: Date;
    documentUrl?: string;
  }>;

  @Column({
    type: 'enum',
    enum: ProducerStatus,
    default: ProducerStatus.ACTIVE,
  })
  status: ProducerStatus;

  @Column({ name: 'contract_start_date', type: 'date', nullable: true })
  contractStartDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}