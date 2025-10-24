import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { LabTest } from './entities/lab-test.entity';
import { LabResult } from './entities/lab-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabTest, LabResult])],
  controllers: [LabController],
  providers: [LabService],
  exports: [LabService],
})
export class LabModule {}