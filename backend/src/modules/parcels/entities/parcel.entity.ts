import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Producer } from '../../producers/entities/producer.entity';
  
  export enum ParcelStatus {
    ACTIVE = 'active',
    CONVERTING = 'converting',
    RESTING = 'resting',
    ABANDONED = 'abandoned',
  }
  
  export enum CultivationType {
    CONVENTIONAL = 'conventional',
    ORGANIC = 'organic',
    RATIONAL = 'rational',
  }
  
  @Entity('parcels')
  export class Parcel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'reference_code', unique: true })
    referenceCode: string;
  
    @Column()
    name: string;
  
    @Column({ name: 'producer_id' })
    producerId: string;
  
    @ManyToOne(() => Producer)
    @JoinColumn({ name: 'producer_id' })
    producer: Producer;
  
    @Column({ name: 'area_hectares', type: 'decimal', precision: 10, scale: 4 })
    areaHectares: number;
  
    @Column({ name: 'mango_variety', nullable: true })
    mangoVariety: string;
  
    @Column({ name: 'tree_count', type: 'int', nullable: true })
    treeCount: number;
  
    @Column({ name: 'planting_year', type: 'int', nullable: true })
    plantingYear: number;
  
    @Column({
      name: 'cultivation_type',
      type: 'enum',
      enum: CultivationType,
      default: CultivationType.CONVENTIONAL,
    })
    cultivationType: CultivationType;
  
    @Column({ name: 'has_irrigation', default: false })
    hasIrrigation: boolean;
  
    @Column({ type: 'jsonb', default: [] })
    certifications: Array<{
      type: string;
      number: string;
      issueDate: Date;
      expiryDate: Date;
    }>;
  
    @Column({
      type: 'enum',
      enum: ParcelStatus,
      default: ParcelStatus.ACTIVE,
    })
    status: ParcelStatus;
  
    @Column({ type: 'text', nullable: true })
    notes: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;
  }