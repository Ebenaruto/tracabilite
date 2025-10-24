import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { LabTest, TestStatus } from './entities/lab-test.entity';
import { LabResult } from './entities/lab-result.entity';
import { CreateLabTestDto } from './dto/create-lab-test.dto';

@Injectable()
export class LabService {
  constructor(
    @InjectRepository(LabTest)
    private readonly labTestRepository: Repository<LabTest>,
    @InjectRepository(LabResult)
    private readonly labResultRepository: Repository<LabResult>,
  ) {}

  async create(createLabTestDto: CreateLabTestDto): Promise<LabTest> {
    // Générer un ID d'échantillon unique
    const sampleId = await this.generateSampleId();

    // Calculer la conformité globale si des résultats sont fournis
    let isCompliant: boolean | null = null;
    if (createLabTestDto.results && createLabTestDto.results.length > 0) {
      isCompliant = this.calculateCompliance(createLabTestDto.results);
    }

    const labTest = this.labTestRepository.create({
      lotId: createLabTestDto.lotId,
      testType: createLabTestDto.testType,
      sampleId,
      samplingDatetime: new Date(createLabTestDto.samplingDatetime),
      analysisDatetime: createLabTestDto.analysisDatetime 
        ? new Date(createLabTestDto.analysisDatetime) 
        : null,
      laboratoryName: createLabTestDto.laboratoryName,
      laboratoryType: createLabTestDto.laboratoryType,
      operatorId: createLabTestDto.operatorId,
      certificateNumber: createLabTestDto.certificateNumber,
      certificateFileUrl: createLabTestDto.certificateFileUrl,
      notes: createLabTestDto.notes,
      isCompliant,
      status: (createLabTestDto.results?.length ?? 0) > 0 ? TestStatus.COMPLETED : TestStatus.PLANNED,
    } as LabTest);

    const savedTest = await this.labTestRepository.save(labTest);

    // Ajouter les résultats si fournis
    if (createLabTestDto.results && createLabTestDto.results.length > 0) {
      const results = createLabTestDto.results.map((result) => {
        const isParamCompliant = this.checkParameterCompliance(
          result.measuredValue,
          result.acceptableLimit,
        );

        return this.labResultRepository.create({
          testId: savedTest.id,
          parameterName: result.parameterName,
          measuredValue: result.measuredValue,
          unit: result.unit,
          acceptableLimit: result.acceptableLimit,
          isCompliant: isParamCompliant,
          method: result.method,
          uncertainty: result.uncertainty,
        });
      });

      await this.labResultRepository.save(results);
    }

    return await this.findOne(savedTest.id);
  }

  async findAll(): Promise<LabTest[]> {
    return await this.labTestRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['lot', 'operator', 'validator', 'results'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByLot(lotId: string): Promise<LabTest[]> {
    return await this.labTestRepository.find({
      where: { 
        lotId,
        deletedAt: IsNull() 
      },
      relations: ['operator', 'validator', 'results'],
      order: { samplingDatetime: 'DESC' },
    });
  }

  async findOne(id: string): Promise<LabTest> {
    const labTest = await this.labTestRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['lot', 'operator', 'validator', 'results'],
    });

    if (!labTest) {
      throw new NotFoundException(`Test de laboratoire avec l'ID ${id} non trouvé`);
    }

    return labTest;
  }

  async updateStatus(id: string, status: TestStatus): Promise<LabTest> {
    const labTest = await this.findOne(id);
    labTest.status = status;

    if (status === TestStatus.COMPLETED && !labTest.analysisDatetime) {
      labTest.analysisDatetime = new Date();
    }

    return await this.labTestRepository.save(labTest);
  }

  async validate(id: string, validatorId: string): Promise<LabTest> {
    const labTest = await this.findOne(id);

    if (labTest.status !== TestStatus.COMPLETED) {
      throw new BadRequestException('Seuls les tests complétés peuvent être validés');
    }

    labTest.status = TestStatus.VALIDATED;
    labTest.validatedBy = validatorId;
    labTest.validatedAt = new Date();

    return await this.labTestRepository.save(labTest);
  }

  async remove(id: string): Promise<void> {
    const labTest = await this.findOne(id);
    labTest.deletedAt = new Date();
    await this.labTestRepository.save(labTest);
  }

  private async generateSampleId(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const prefix = `SAMP-${year}${month}`;

    const lastSample = await this.labTestRepository
      .createQueryBuilder('test')
      .where('test.sample_id LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('test.sample_id', 'DESC')
      .getOne();

    let sequence = 1;
    if (lastSample) {
      const parts = lastSample.sampleId.split('-');
      const lastSequence = parseInt(parts[parts.length - 1], 10);
      sequence = lastSequence + 1;
    }

    return `${prefix}-${String(sequence).padStart(4, '0')}`;
  }

  private calculateCompliance(results: any[]): boolean {
    // Un test est conforme si tous ses paramètres sont conformes
    return results.every(result => {
      return this.checkParameterCompliance(
        result.measuredValue,
        result.acceptableLimit,
      );
    });
  }

  private checkParameterCompliance(
    measuredValue: string,
    acceptableLimit?: string,
  ): boolean {
    // Si pas de limite définie, considérer comme conforme
    if (!acceptableLimit) return true;

    // Logique simple : si la valeur mesurée est un nombre et la limite aussi
    // On vérifie que measuredValue <= acceptableLimit
    const measured = parseFloat(measuredValue);
    const limit = parseFloat(acceptableLimit);

    if (!isNaN(measured) && !isNaN(limit)) {
      return measured <= limit;
    }

    // Pour les valeurs non numériques, considérer comme conforme par défaut
    return true;
  }
}