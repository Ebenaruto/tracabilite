import { LabTest } from './lab-test.entity';
export declare class LabResult {
    id: string;
    testId: string;
    test: LabTest;
    parameterName: string;
    measuredValue: string;
    unit: string;
    acceptableLimit: string;
    isCompliant: boolean;
    method: string;
    uncertainty: string;
    createdAt: Date;
}
