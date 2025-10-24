import { LabService } from './lab.service';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { TestStatus } from './entities/lab-test.entity';
export declare class LabController {
    private readonly labService;
    constructor(labService: LabService);
    create(createLabTestDto: CreateLabTestDto): Promise<import("./entities/lab-test.entity").LabTest>;
    findAll(lotId?: string): Promise<import("./entities/lab-test.entity").LabTest[]>;
    findOne(id: string): Promise<import("./entities/lab-test.entity").LabTest>;
    updateStatus(id: string, status: TestStatus): Promise<import("./entities/lab-test.entity").LabTest>;
    validate(id: string, validatorId: string): Promise<import("./entities/lab-test.entity").LabTest>;
    remove(id: string): Promise<void>;
}
