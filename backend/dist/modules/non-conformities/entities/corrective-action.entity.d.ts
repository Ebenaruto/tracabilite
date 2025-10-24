import { NonConformity } from './non-conformity.entity';
import { User } from '../../users/entities/user.entity';
export declare enum ActionType {
    IMMEDIATE = "immediate",
    CORRECTIVE = "corrective",
    PREVENTIVE = "preventive"
}
export declare enum ActionStatus {
    PLANNED = "planned",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    VERIFIED = "verified"
}
export declare class CorrectiveAction {
    id: string;
    nonConformityId: string;
    nonConformity: NonConformity;
    actionType: ActionType;
    description: string;
    responsibleUserId: string;
    responsibleUser: User;
    dueDate: Date;
    completionDate: Date;
    status: ActionStatus;
    effectivenessVerified: boolean;
    verificationNotes: string;
    verifiedBy: string;
    verifier: User;
    verifiedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
