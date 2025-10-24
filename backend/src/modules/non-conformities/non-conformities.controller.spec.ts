import { Test, TestingModule } from '@nestjs/testing';
import { NonConformitiesController } from './non-conformities.controller';

describe('NonConformitiesController', () => {
  let controller: NonConformitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonConformitiesController],
    }).compile();

    controller = module.get<NonConformitiesController>(NonConformitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
