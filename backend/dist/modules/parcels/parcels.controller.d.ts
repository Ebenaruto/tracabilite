import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { ParcelStatus } from './entities/parcel.entity';
export declare class ParcelsController {
    private readonly parcelsService;
    constructor(parcelsService: ParcelsService);
    create(createParcelDto: CreateParcelDto): Promise<import("./entities/parcel.entity").Parcel>;
    findAll(producerId?: string): Promise<import("./entities/parcel.entity").Parcel[]>;
    findOne(id: string): Promise<import("./entities/parcel.entity").Parcel>;
    update(id: string, updateParcelDto: Partial<CreateParcelDto>): Promise<import("./entities/parcel.entity").Parcel>;
    updateStatus(id: string, status: ParcelStatus): Promise<import("./entities/parcel.entity").Parcel>;
    remove(id: string): Promise<void>;
}
