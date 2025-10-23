import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { DestinationMarket } from '../entities/lot.entity';

export class CreateLotDto {
  @IsNumber()
  @Min(0.001)
  @IsNotEmpty({ message: 'La quantité initiale est requise' })
  initialQuantityKg: number;

  @IsString()
  @IsOptional()
  mangoVariety?: string;

  @IsEnum(DestinationMarket)
  @IsOptional()
  destinationMarket?: DestinationMarket;

  @IsString()
  @IsOptional()
  notes?: string;
}