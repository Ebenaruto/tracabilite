import { Repository } from 'typeorm';
import { Lot, LotStatus } from './entities/lot.entity';
import { BatchEvent } from './entities/batch-event.entity';
import { BatchKDE } from './entities/batch-kde.entity';
import { User } from '../users/entities/user.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { AddEventDto } from './dto/add-event.dto';
export declare class LotsService {
    private readonly lotRepository;
    private readonly batchEventRepository;
    private readonly batchKDERepository;
    private readonly userRepository;
    constructor(lotRepository: Repository<Lot>, batchEventRepository: Repository<BatchEvent>, batchKDERepository: Repository<BatchKDE>, userRepository: Repository<User>);
    create(createLotDto: CreateLotDto, userId: string | null): Promise<Lot>;
    findAll(): Promise<Lot[]>;
    findOne(id: string): Promise<Lot>;
    addEvent(lotId: string, addEventDto: AddEventDto): Promise<BatchEvent>;
    updateStatus(lotId: string, status: LotStatus): Promise<Lot>;
    private generateLotNumber;
}
