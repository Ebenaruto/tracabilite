import { NonConformitiesService } from './non-conformities.service';
import { CreateNonConformityDto } from './dto/create-non-conformity.dto';
import { NCStatus } from './entities/non-conformity.entity';
import { ActionStatus } from './entities/corrective-action.entity';
export declare class NonConformitiesController {
    private readonly nonConformitiesService;
    constructor(nonConformitiesService: NonConformitiesService);
    create(createNonConformityDto: CreateNonConformityDto): Promise<import("./entities/non-conformity.entity").NonConformity>;
    findAll(lotId?: string, status?: NCStatus): Promise<import("./entities/non-conformity.entity").NonConformity[]>;
    findOne(id: string): Promise<import("./entities/non-conformity.entity").NonConformity>;
    updateStatus(id: string, status: NCStatus, userId?: string): Promise<import("./entities/non-conformity.entity").NonConformity>;
    assignTo(id: string, userId: string): Promise<import("./entities/non-conformity.entity").NonConformity>;
    addCorrectiveAction(id: string, actionData: any): Promise<import("./entities/corrective-action.entity").CorrectiveAction>;
    updateActionStatus(actionId: string, status: ActionStatus, completionDate?: string): Promise<import("./entities/corrective-action.entity").CorrectiveAction>;
    verifyAction(actionId: string, verifierId: string, verificationNotes?: string): Promise<import("./entities/corrective-action.entity").CorrectiveAction>;
    close(id: string, userId: string, closureNotes?: string): Promise<import("./entities/non-conformity.entity").NonConformity>;
    remove(id: string): Promise<void>;
}
