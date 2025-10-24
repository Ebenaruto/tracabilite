import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsBoolean, Min, IsInt } from 'class-validator';
import { CultivationType } from '../entities/parcel.entity';

export class CreateParcelDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom de la parcelle est requis' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'L\'ID du producteur est requis' })
  producerId: string;

  @IsNumber()
  @Min(0.0001, { message: 'La superficie doit être supérieure à 0' })
  areaHectares: number;

  @IsString()
  @IsOptional()
  mangoVariety?: string;

  @IsInt()
  @IsOptional()
  treeCount?: number;

  @IsInt()
  @IsOptional()
  plantingYear?: number;

  @IsEnum(CultivationType)
  @IsOptional()
  cultivationType?: CultivationType;

  @IsBoolean()
  @IsOptional()
  hasIrrigation?: boolean;

  @IsOptional()
  certifications?: Array<{
    type: string;
    number: string;
    issueDate: Date;
    expiryDate: Date;
  }>;

  @IsString()
  @IsOptional()
  notes?: string;
}