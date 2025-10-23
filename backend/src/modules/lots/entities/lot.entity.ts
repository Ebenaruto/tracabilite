import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  import { BatchEvent } from './batch-event.entity';
  
  export enum LotStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    SHIPPED = 'shipped',
    RECALLED = 'recalled',
  }
  
  export enum DestinationMarket {
    LOCAL = 'local',
    EXPORT_EU = 'export_eu',
    EXPORT_US = 'export_us',
    EXPORT_OTHER = 'export_other',
  }
  
  @Entity('lots')
  export class Lot {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'lot_number', unique: true })
    lotNumber: string;
  
    @Column({
      type: 'enum',
      enum: LotStatus,
      default: LotStatus.OPEN,
    })
    status: LotStatus;
  
    @Column({ name: 'initial_quantity_kg', type: 'decimal', precision: 10, scale: 3 })
    initialQuantityKg: number;
  
    @Column({ name: 'final_quantity_kg', type: 'decimal', precision: 10, scale: 3, nullable: true })
    finalQuantityKg: number;
  
    @Column({
      name: 'destination_market',
      type: 'enum',
      enum: DestinationMarket,
      nullable: true,
    })
    destinationMarket: DestinationMarket;
  
    @Column({ name: 'qr_code_url', nullable: true })
    qrCodeUrl: string;
  
    @Column({ name: 'public_url_token', unique: true, nullable: true })
    publicUrlToken: string;
  
    @Column({ name: 'mango_variety', nullable: true })
    mangoVariety: string;
  
    @Column({ name: 'created_by' })
    createdBy: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    creator: User;
  
    @OneToMany(() => BatchEvent, (event) => event.lot, { cascade: true })
    events: BatchEvent[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt: Date;
  
    @Column({ name: 'shipped_at', type: 'timestamp', nullable: true })
    shippedAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;
  
    @Column({ type: 'text', nullable: true })
    notes: string;
  }