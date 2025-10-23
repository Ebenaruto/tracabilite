import { IsNotEmpty, IsEnum, IsDateString, IsOptional, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from '../entities/batch-event.entity';

export class KDEDto {
  @IsString()
  @IsNotEmpty()
  keyName: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsOptional()
  unit?: string;
}

export class AddEventDto {
  @IsEnum(EventType)
  @IsNotEmpty({ message: 'Le type d\'événement est requis' })
  eventType: EventType;

  @IsDateString()
  @IsNotEmpty({ message: 'La date de l\'événement est requise' })
  eventDatetime: string;

  @IsString()
  @IsOptional()
  operatorId?: string;

  @IsNumber()
  @IsOptional()
  durationMinutes?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KDEDto)
  @IsOptional()
  kdes?: KDEDto[];
}