import { Repository } from 'typeorm';
import { Parcel, ParcelStatus } from './entities/parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';
export declare class ParcelsService {
    private readonly parcelRepository;
    constructor(parcelRepository: Repository<Parcel>);
    create(createParcelDto: CreateParcelDto): Promise<Parcel>;
    findAll(): Promise<Parcel[]>;
    findByProducer(producerId: string): Promise<Parcel[]>;
    findOne(id: string): Promise<Parcel>;
    update(id: string, updateData: Partial<CreateParcelDto>): Promise<Parcel>;
    updateStatus(id: string, status: ParcelStatus): Promise<Parcel>;
    remove(id: string): Promise<void>;
    private generateReferenceCode;
}
