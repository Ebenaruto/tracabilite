import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Producer, ProducerStatus } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    // Générer un code de référence unique
    const referenceCode = await this.generateReferenceCode();

    const producer = this.producerRepository.create({
      ...createProducerDto,
      referenceCode,
    });

    return await this.producerRepository.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return await this.producerRepository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!producer) {
      throw new NotFoundException(`Producteur avec l'ID ${id} non trouvé`);
    }

    return producer;
  }

  async update(id: string, updateData: Partial<CreateProducerDto>): Promise<Producer> {
    const producer = await this.findOne(id);

    Object.assign(producer, updateData);

    return await this.producerRepository.save(producer);
  }

  async remove(id: string): Promise<void> {
    const producer = await this.findOne(id);
    producer.deletedAt = new Date();
    await this.producerRepository.save(producer);
  }

  private async generateReferenceCode(): Promise<string> {
    // Chercher le dernier producteur avec un code commençant par PROD-
    const lastProducer = await this.producerRepository
      .createQueryBuilder('producer')
      .where('producer.reference_code LIKE :prefix', { prefix: 'PROD-%' })
      .orderBy('producer.reference_code', 'DESC')
      .getOne();

    let sequence = 1;
    if (lastProducer) {
      const parts = lastProducer.referenceCode.split('-');
      const lastSequence = parseInt(parts[parts.length - 1], 10);
      sequence = lastSequence + 1;
    }

    return `PROD-${String(sequence).padStart(4, '0')}`;
  }
}