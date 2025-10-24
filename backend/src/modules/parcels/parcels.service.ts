import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Parcel, ParcelStatus } from './entities/parcel.entity';
import { Producer } from '../producers/entities/producer.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Injectable()
export class ParcelsService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
  ) {}

  async create(createParcelDto: CreateParcelDto): Promise<Parcel> {
    // Générer un code de référence unique
    const referenceCode = await this.generateReferenceCode();

    const parcel = this.parcelRepository.create({
      ...createParcelDto,
      referenceCode,
    });

    return await this.parcelRepository.save(parcel);
  }

  async findAll(): Promise<Parcel[]> {
    return await this.parcelRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['producer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByProducer(producerId: string): Promise<Parcel[]> {
    return await this.parcelRepository.find({
      where: { 
        producerId,
        deletedAt: IsNull() 
      },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Parcel> {
    const parcel = await this.parcelRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['producer'],
    });

    if (!parcel) {
      throw new NotFoundException(`Parcelle avec l'ID ${id} non trouvée`);
    }

    return parcel;
  }

  async update(id: string, updateData: Partial<CreateParcelDto>): Promise<Parcel> {
    const parcel = await this.findOne(id);

    Object.assign(parcel, updateData);

    return await this.parcelRepository.save(parcel);
  }

  async updateStatus(id: string, status: ParcelStatus): Promise<Parcel> {
    const parcel = await this.findOne(id);
    parcel.status = status;
    return await this.parcelRepository.save(parcel);
  }

  async remove(id: string): Promise<void> {
    const parcel = await this.findOne(id);
    parcel.deletedAt = new Date();
    await this.parcelRepository.save(parcel);
  }

  private async generateReferenceCode(): Promise<string> {
    // Chercher la dernière parcelle avec un code commençant par PARC-
    const lastParcel = await this.parcelRepository
      .createQueryBuilder('parcel')
      .where('parcel.reference_code LIKE :prefix', { prefix: 'PARC-%' })
      .orderBy('parcel.reference_code', 'DESC')
      .getOne();

    let sequence = 1;
    if (lastParcel) {
      const parts = lastParcel.referenceCode.split('-');
      const lastSequence = parseInt(parts[parts.length - 1], 10);
      sequence = lastSequence + 1;
    }

    return `PARC-${String(sequence).padStart(4, '0')}`;
  }
}