"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lab_test_entity_1 = require("./entities/lab-test.entity");
const lab_result_entity_1 = require("./entities/lab-result.entity");
let LabService = class LabService {
    labTestRepository;
    labResultRepository;
    constructor(labTestRepository, labResultRepository) {
        this.labTestRepository = labTestRepository;
        this.labResultRepository = labResultRepository;
    }
    async create(createLabTestDto) {
        const sampleId = await this.generateSampleId();
        let isCompliant = null;
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
            status: (createLabTestDto.results?.length ?? 0) > 0 ? lab_test_entity_1.TestStatus.COMPLETED : lab_test_entity_1.TestStatus.PLANNED,
        });
        const savedTest = await this.labTestRepository.save(labTest);
        if (createLabTestDto.results && createLabTestDto.results.length > 0) {
            const results = createLabTestDto.results.map((result) => {
                const isParamCompliant = this.checkParameterCompliance(result.measuredValue, result.acceptableLimit);
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
    async findAll() {
        return await this.labTestRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['lot', 'operator', 'validator', 'results'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByLot(lotId) {
        return await this.labTestRepository.find({
            where: {
                lotId,
                deletedAt: (0, typeorm_2.IsNull)()
            },
            relations: ['operator', 'validator', 'results'],
            order: { samplingDatetime: 'DESC' },
        });
    }
    async findOne(id) {
        const labTest = await this.labTestRepository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['lot', 'operator', 'validator', 'results'],
        });
        if (!labTest) {
            throw new common_1.NotFoundException(`Test de laboratoire avec l'ID ${id} non trouvé`);
        }
        return labTest;
    }
    async updateStatus(id, status) {
        const labTest = await this.findOne(id);
        labTest.status = status;
        if (status === lab_test_entity_1.TestStatus.COMPLETED && !labTest.analysisDatetime) {
            labTest.analysisDatetime = new Date();
        }
        return await this.labTestRepository.save(labTest);
    }
    async validate(id, validatorId) {
        const labTest = await this.findOne(id);
        if (labTest.status !== lab_test_entity_1.TestStatus.COMPLETED) {
            throw new common_1.BadRequestException('Seuls les tests complétés peuvent être validés');
        }
        labTest.status = lab_test_entity_1.TestStatus.VALIDATED;
        labTest.validatedBy = validatorId;
        labTest.validatedAt = new Date();
        return await this.labTestRepository.save(labTest);
    }
    async remove(id) {
        const labTest = await this.findOne(id);
        labTest.deletedAt = new Date();
        await this.labTestRepository.save(labTest);
    }
    async generateSampleId() {
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
    calculateCompliance(results) {
        return results.every(result => {
            return this.checkParameterCompliance(result.measuredValue, result.acceptableLimit);
        });
    }
    checkParameterCompliance(measuredValue, acceptableLimit) {
        if (!acceptableLimit)
            return true;
        const measured = parseFloat(measuredValue);
        const limit = parseFloat(acceptableLimit);
        if (!isNaN(measured) && !isNaN(limit)) {
            return measured <= limit;
        }
        return true;
    }
};
exports.LabService = LabService;
exports.LabService = LabService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lab_test_entity_1.LabTest)),
    __param(1, (0, typeorm_1.InjectRepository)(lab_result_entity_1.LabResult)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LabService);
//# sourceMappingURL=lab.service.js.map