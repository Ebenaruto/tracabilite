import { DestinationMarket } from '../entities/lot.entity';
export declare class CreateLotDto {
    initialQuantityKg: number;
    mangoVariety?: string;
    destinationMarket?: DestinationMarket;
    notes?: string;
}
