import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { AddEventDto } from './dto/add-event.dto';
import { LotStatus } from './entities/lot.entity';
export declare class LotsController {
    private readonly lotsService;
    constructor(lotsService: LotsService);
    create(createLotDto: CreateLotDto): Promise<import("./entities/lot.entity").Lot>;
    findAll(): Promise<import("./entities/lot.entity").Lot[]>;
    findOne(id: string): Promise<import("./entities/lot.entity").Lot>;
    addEvent(id: string, addEventDto: AddEventDto): Promise<import("./entities/batch-event.entity").BatchEvent>;
    updateStatus(id: string, status: LotStatus): Promise<import("./entities/lot.entity").Lot>;
}
