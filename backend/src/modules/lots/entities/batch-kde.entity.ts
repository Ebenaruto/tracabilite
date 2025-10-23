import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { BatchEvent } from './batch-event.entity';
  
  @Entity('batch_kdes')
  export class BatchKDE {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'event_id' })
    eventId: string;
  
    @ManyToOne(() => BatchEvent, (event) => event.kdes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    event: BatchEvent;
  
    @Column({ name: 'key_name' })
    keyName: string;
  
    @Column({ type: 'text' })
    value: string;
  
    @Column({ nullable: true })
    unit: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  }