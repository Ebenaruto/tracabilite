import { Lot } from '../../lots/entities/lot.entity';
import { LabTest } from '../../lab/entities/lab-test.entity';
import { User } from '../../users/entities/user.entity';
import { CorrectiveAction } from './corrective-action.entity';
export declare enum NCType {
    MICROBIOLOGICAL = "microbiological",
    CHEMICAL = "chemical",
    PHYSICAL = "physical",
    ORGANOLEPTIC = "organoleptic",
    PROCESS = "process",
    DOCUMENTATION = "documentation",
    OTHER = "other"
}
export declare enum NCSeverity {
    MINOR = "minor",
    MAJOR = "major",
    CRITICAL = "critical"
}
export declare enum NCStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
export declare class NonConformity {
    id: string;
    referenceNumber: string;
    lotId: string;
    lot: Lot;
    labTestId: string;
    labTest: LabTest;
    ncType: NCType;
    severity: NCSeverity;
    description: string;
    identifiedCause: string;
    potentialImpact: string;
    status: NCStatus;
    openedBy: string;
    opener: User;
    assignedTo: string;
    assignee: User;
    openedAt: Date;
    targetResolutionDate: Date;
    closedAt: Date;
    closedBy: string;
    closer: User;
    closureNotes: string;
    correctiveActions: CorrectiveAction[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
