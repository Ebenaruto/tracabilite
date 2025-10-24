import { Repository } from 'typeorm';
import { NonConformity, NCStatus } from './entities/non-conformity.entity';
import { CorrectiveAction, ActionStatus } from './entities/corrective-action.entity';
import { CreateNonConformityDto } from './dto/create-non-conformity.dto';
export declare class NonConformitiesService {
    private readonly ncRepository;
    private readonly actionRepository;
    constructor(ncRepository: Repository<NonConformity>, actionRepository: Repository<CorrectiveAction>);
    create(createNonConformityDto: CreateNonConformityDto): Promise<NonConformity>;
    findAll(): Promise<NonConformity[]>;
    findByLot(lotId: string): Promise<NonConformity[]>;
    findByStatus(status: NCStatus): Promise<NonConformity[]>;
    findOne(id: string): Promise<NonConformity>;
    updateStatus(id: string, status: NCStatus, userId?: string): Promise<NonConformity>;
    assignTo(id: string, userId: string): Promise<NonConformity>;
    addCorrectiveAction(ncId: string, actionData: {
        actionType: any;
        description: string;
        responsibleUserId?: string;
        dueDate?: string;
    }): Promise<CorrectiveAction>;
    updateActionStatus(actionId: string, status: ActionStatus, completionDate?: Date): Promise<CorrectiveAction>;
    verifyAction(actionId: string, verifierId: string, verificationNotes?: string): Promise<CorrectiveAction>;
    close(id: string, userId: string, closureNotes?: string): Promise<NonConformity>;
    remove(id: string): Promise<void>;
    private generateReferenceNumber;
}
