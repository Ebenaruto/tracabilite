import { Producer } from '../../producers/entities/producer.entity';
export declare enum ParcelStatus {
    ACTIVE = "active",
    CONVERTING = "converting",
    RESTING = "resting",
    ABANDONED = "abandoned"
}
export declare enum CultivationType {
    CONVENTIONAL = "conventional",
    ORGANIC = "organic",
    RATIONAL = "rational"
}
export declare class Parcel {
    id: string;
    referenceCode: string;
    name: string;
    producerId: string;
    producer: Producer;
    areaHectares: number;
    mangoVariety: string;
    treeCount: number;
    plantingYear: number;
    cultivationType: CultivationType;
    hasIrrigation: boolean;
    certifications: Array<{
        type: string;
        number: string;
        issueDate: Date;
        expiryDate: Date;
    }>;
    status: ParcelStatus;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
