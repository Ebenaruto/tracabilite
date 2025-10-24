import { Test, TestingModule } from '@nestjs/testing';
import { NonConformitiesService } from './non-conformities.service';

describe('NonConformitiesService', () => {
  let service: NonConformitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NonConformitiesService],
    }).compile();

    service = module.get<NonConformitiesService>(NonConformitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
