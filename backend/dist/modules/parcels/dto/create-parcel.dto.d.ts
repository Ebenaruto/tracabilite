import { CultivationType } from '../entities/parcel.entity';
export declare class CreateParcelDto {
    name: string;
    producerId: string;
    areaHectares: number;
    mangoVariety?: string;
    treeCount?: number;
    plantingYear?: number;
    cultivationType?: CultivationType;
    hasIrrigation?: boolean;
    certifications?: Array<{
        type: string;
        number: string;
        issueDate: Date;
        expiryDate: Date;
    }>;
    notes?: string;
}
