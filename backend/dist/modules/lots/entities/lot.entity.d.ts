import { User } from '../../users/entities/user.entity';
import { BatchEvent } from './batch-event.entity';
export declare enum LotStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    SHIPPED = "shipped",
    RECALLED = "recalled"
}
export declare enum DestinationMarket {
    LOCAL = "local",
    EXPORT_EU = "export_eu",
    EXPORT_US = "export_us",
    EXPORT_OTHER = "export_other"
}
export declare class Lot {
    id: string;
    lotNumber: string;
    status: LotStatus;
    initialQuantityKg: number;
    finalQuantityKg: number;
    destinationMarket: DestinationMarket;
    qrCodeUrl: string;
    publicUrlToken: string;
    mangoVariety: string;
    createdBy: string;
    creator: User;
    events: BatchEvent[];
    createdAt: Date;
    completedAt: Date;
    shippedAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    notes: string;
}
