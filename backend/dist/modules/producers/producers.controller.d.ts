import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
export declare class ProducersController {
    private readonly producersService;
    constructor(producersService: ProducersService);
    create(createProducerDto: CreateProducerDto): Promise<import("./entities/producer.entity").Producer>;
    findAll(): Promise<import("./entities/producer.entity").Producer[]>;
    findOne(id: string): Promise<import("./entities/producer.entity").Producer>;
    update(id: string, updateProducerDto: Partial<CreateProducerDto>): Promise<import("./entities/producer.entity").Producer>;
    remove(id: string): Promise<void>;
}
