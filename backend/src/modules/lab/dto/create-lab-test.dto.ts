import { IsNotEmpty, IsString, IsEnum, IsDateString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TestType } from '../entities/lab-test.entity';

export class LabResultDto {
  @IsString()
  @IsNotEmpty()
  parameterName: string;

  @IsString()
  @IsNotEmpty()
  measuredValue: string;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsString()
  @IsOptional()
  acceptableLimit?: string;

  @IsString()
  @IsOptional()
  method?: string;

  @IsString()
  @IsOptional()
  uncertainty?: string;
}

export class CreateLabTestDto {
  @IsString()
  @IsNotEmpty({ message: 'L\'ID du lot est requis' })
  lotId: string;

  @IsEnum(TestType)
  @IsNotEmpty({ message: 'Le type de test est requis' })
  testType: TestType;

  @IsDateString()
  @IsNotEmpty({ message: 'La date de prélèvement est requise' })
  samplingDatetime: string;

  @IsDateString()
  @IsOptional()
  analysisDatetime?: string;

  @IsString()
  @IsOptional()
  laboratoryName?: string;

  @IsString()
  @IsOptional()
  laboratoryType?: string;

  @IsString()
  @IsOptional()
  operatorId?: string;

  @IsString()
  @IsOptional()
  certificateNumber?: string;

  @IsString()
  @IsOptional()
  certificateFileUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabResultDto)
  @IsOptional()
  results?: LabResultDto[];
}