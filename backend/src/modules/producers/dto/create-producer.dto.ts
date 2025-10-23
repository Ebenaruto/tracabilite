import { IsNotEmpty, IsString, IsEnum, IsEmail, IsOptional, IsDateString } from 'class-validator';
import { ProducerType } from '../entities/producer.entity';

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom complet est requis' })
  fullName: string;

  @IsEnum(ProducerType)
  @IsOptional()
  type?: ProducerType;

  @IsString()
  @IsOptional()
  registryNumber?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  address?: {
    street?: string;
    city?: string;
    region?: string;
    country?: string;
    postalCode?: string;
  };

  @IsOptional()
  certifications?: Array<{
    type: string;
    number: string;
    issuer: string;
    issueDate: Date;
    expiryDate: Date;
    documentUrl?: string;
  }>;

  @IsDateString()
  @IsOptional()
  contractStartDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}