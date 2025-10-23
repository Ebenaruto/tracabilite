import { BatchEvent } from './batch-event.entity';
export declare class BatchKDE {
    id: string;
    eventId: string;
    event: BatchEvent;
    keyName: string;
    value: string;
    unit: string;
    createdAt: Date;
}
