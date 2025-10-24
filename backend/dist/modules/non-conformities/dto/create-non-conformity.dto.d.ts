import { NCType, NCSeverity } from '../entities/non-conformity.entity';
import { ActionType } from '../entities/corrective-action.entity';
export declare class CorrectiveActionDto {
    actionType: ActionType;
    description: string;
    responsibleUserId?: string;
    dueDate?: string;
}
export declare class CreateNonConformityDto {
    lotId?: string;
    labTestId?: string;
    ncType: NCType;
    severity: NCSeverity;
    description: string;
    identifiedCause?: string;
    potentialImpact?: string;
    openedBy: string;
    assignedTo?: string;
    targetResolutionDate?: string;
    correctiveActions?: CorrectiveActionDto[];
}
