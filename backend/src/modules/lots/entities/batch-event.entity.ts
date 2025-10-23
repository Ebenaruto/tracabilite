import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
  } from 'typeorm';
  import { Lot } from './lot.entity';
  import { User } from '../../users/entities/user.entity';
  import { BatchKDE } from './batch-kde.entity';
  
  export enum EventType {
    HARVEST = 'harvest',
    RECEPTION = 'reception',
    WASHING = 'washing',
    PRE_DRYING = 'pre_drying',
    CUTTING = 'cutting',
    DRYING = 'drying',
    POST_DRYING_QC = 'post_drying_qc',
    PACKAGING = 'packaging',
    LABELING = 'labeling',
    STORAGE = 'storage',
    SHIPPING = 'shipping',
  }
  
  @Entity('batch_events')
  @Index(['lotId', 'eventDatetime'])
  export class BatchEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'lot_id' })
    lotId: string;
  
    @ManyToOne(() => Lot, (lot) => lot.events, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lot_id' })
    lot: Lot;
  
    @Column({
      name: 'event_type',
      type: 'enum',
      enum: EventType,
    })
    eventType: EventType;
  
    @Column({ name: 'event_datetime', type: 'timestamp' })
    eventDatetime: Date;
  
    @Column({ name: 'operator_id', nullable: true })
    operatorId: string;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'operator_id' })
    operator: User;
  
    @Column({ name: 'duration_minutes', type: 'int', nullable: true })
    durationMinutes: number;
  
    @Column({ type: 'text', nullable: true })
    notes: string;
  
    @OneToMany(() => BatchKDE, (kde) => kde.event, { cascade: true, eager: true })
    kdes: BatchKDE[];
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  }