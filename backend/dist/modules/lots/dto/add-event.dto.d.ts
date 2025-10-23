import { EventType } from '../entities/batch-event.entity';
export declare class KDEDto {
    keyName: string;
    value: string;
    unit?: string;
}
export declare class AddEventDto {
    eventType: EventType;
    eventDatetime: string;
    operatorId?: string;
    durationMinutes?: number;
    notes?: string;
    kdes?: KDEDto[];
}
