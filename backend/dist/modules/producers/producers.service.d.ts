import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
export declare class ProducersService {
    private readonly producerRepository;
    constructor(producerRepository: Repository<Producer>);
    create(createProducerDto: CreateProducerDto): Promise<Producer>;
    findAll(): Promise<Producer[]>;
    findOne(id: string): Promise<Producer>;
    update(id: string, updateData: Partial<CreateProducerDto>): Promise<Producer>;
    remove(id: string): Promise<void>;
    private generateReferenceCode;
}
