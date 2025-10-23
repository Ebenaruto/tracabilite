import { Lot } from './lot.entity';
import { User } from '../../users/entities/user.entity';
import { BatchKDE } from './batch-kde.entity';
export declare enum EventType {
    HARVEST = "harvest",
    RECEPTION = "reception",
    WASHING = "washing",
    PRE_DRYING = "pre_drying",
    CUTTING = "cutting",
    DRYING = "drying",
    POST_DRYING_QC = "post_drying_qc",
    PACKAGING = "packaging",
    LABELING = "labeling",
    STORAGE = "storage",
    SHIPPING = "shipping"
}
export declare class BatchEvent {
    id: string;
    lotId: string;
    lot: Lot;
    eventType: EventType;
    eventDatetime: Date;
    operatorId: string;
    operator: User;
    durationMinutes: number;
    notes: string;
    kdes: BatchKDE[];
    createdAt: Date;
}
