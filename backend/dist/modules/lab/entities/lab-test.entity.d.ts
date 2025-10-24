import { Lot } from '../../lots/entities/lot.entity';
import { User } from '../../users/entities/user.entity';
import { LabResult } from './lab-result.entity';
export declare enum TestType {
    MICROBIOLOGICAL = "microbiological",
    PESTICIDES = "pesticides",
    HUMIDITY = "humidity",
    WATER_ACTIVITY = "water_activity",
    ORGANOLEPTIC = "organoleptic",
    PHYSICAL_CHEMICAL = "physical_chemical"
}
export declare enum TestStatus {
    PLANNED = "planned",
    SAMPLED = "sampled",
    IN_ANALYSIS = "in_analysis",
    COMPLETED = "completed",
    VALIDATED = "validated"
}
export declare class LabTest {
    id: string;
    lotId: string;
    lot: Lot;
    testType: TestType;
    sampleId: string;
    samplingDatetime: Date;
    analysisDatetime: Date;
    laboratoryName: string;
    laboratoryType: string;
    operatorId: string;
    operator: User;
    status: TestStatus;
    certificateNumber: string;
    certificateFileUrl: string;
    isCompliant: boolean;
    notes: string;
    validatedBy: string;
    validator: User;
    validatedAt: Date;
    results: LabResult[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
