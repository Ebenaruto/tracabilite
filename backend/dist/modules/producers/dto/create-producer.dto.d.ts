import { ProducerType } from '../entities/producer.entity';
export declare class CreateProducerDto {
    fullName: string;
    type?: ProducerType;
    registryNumber?: string;
    phone?: string;
    email?: string;
    address?: {
        street?: string;
        city?: string;
        region?: string;
        country?: string;
        postalCode?: string;
    };
    certifications?: Array<{
        type: string;
        number: string;
        issuer: string;
        issueDate: Date;
        expiryDate: Date;
        documentUrl?: string;
    }>;
    contractStartDate?: string;
    notes?: string;
}
