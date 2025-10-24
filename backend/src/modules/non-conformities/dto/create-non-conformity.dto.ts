import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NCType, NCSeverity } from '../entities/non-conformity.entity';
import { ActionType } from '../entities/corrective-action.entity';

export class CorrectiveActionDto {
  @IsEnum(ActionType)
  @IsNotEmpty()
  actionType: ActionType;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  responsibleUserId?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}

export class CreateNonConformityDto {
  @IsString()
  @IsOptional()
  lotId?: string;

  @IsString()
  @IsOptional()
  labTestId?: string;

  @IsEnum(NCType)
  @IsNotEmpty({ message: 'Le type de non-conformité est requis' })
  ncType: NCType;

  @IsEnum(NCSeverity)
  @IsNotEmpty({ message: 'La gravité est requise' })
  severity: NCSeverity;

  @IsString()
  @IsNotEmpty({ message: 'La description est requise' })
  description: string;

  @IsString()
  @IsOptional()
  identifiedCause?: string;

  @IsString()
  @IsOptional()
  potentialImpact?: string;

  @IsString()
  @IsNotEmpty({ message: 'L\'auteur est requis' })
  openedBy: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;

  @IsDateString()
  @IsOptional()
  targetResolutionDate?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CorrectiveActionDto)
  @IsOptional()
  correctiveActions?: CorrectiveActionDto[];
}