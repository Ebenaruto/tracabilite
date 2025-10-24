import { Repository } from 'typeorm';
import { LabTest, TestStatus } from './entities/lab-test.entity';
import { LabResult } from './entities/lab-result.entity';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
export declare class LabService {
    private readonly labTestRepository;
    private readonly labResultRepository;
    constructor(labTestRepository: Repository<LabTest>, labResultRepository: Repository<LabResult>);
    create(createLabTestDto: CreateLabTestDto): Promise<LabTest>;
    findAll(): Promise<LabTest[]>;
    findByLot(lotId: string): Promise<LabTest[]>;
    findOne(id: string): Promise<LabTest>;
    updateStatus(id: string, status: TestStatus): Promise<LabTest>;
    validate(id: string, validatorId: string): Promise<LabTest>;
    remove(id: string): Promise<void>;
    private generateSampleId;
    private calculateCompliance;
    private checkParameterCompliance;
}
