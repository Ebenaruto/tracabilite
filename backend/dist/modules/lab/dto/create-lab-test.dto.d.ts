import { TestType } from '../entities/lab-test.entity';
export declare class LabResultDto {
    parameterName: string;
    measuredValue: string;
    unit?: string;
    acceptableLimit?: string;
    method?: string;
    uncertainty?: string;
}
export declare class CreateLabTestDto {
    lotId: string;
    testType: TestType;
    samplingDatetime: string;
    analysisDatetime?: string;
    laboratoryName?: string;
    laboratoryType?: string;
    operatorId?: string;
    certificateNumber?: string;
    certificateFileUrl?: string;
    notes?: string;
    results?: LabResultDto[];
}
