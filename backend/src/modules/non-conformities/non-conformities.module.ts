import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonConformitiesService } from './non-conformities.service';
import { NonConformitiesController } from './non-conformities.controller';
import { NonConformity } from './entities/non-conformity.entity';
import { CorrectiveAction } from './entities/corrective-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NonConformity, CorrectiveAction])],
  controllers: [NonConformitiesController],
  providers: [NonConformitiesService],
  exports: [NonConformitiesService],
})
export class NonConformitiesModule {}