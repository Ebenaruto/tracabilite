import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { Lot } from './entities/lot.entity';
import { BatchEvent } from './entities/batch-event.entity';
import { BatchKDE } from './entities/batch-kde.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lot, BatchEvent, BatchKDE, User])],
  controllers: [LotsController],
  providers: [LotsService],
  exports: [LotsService],
})
export class LotsModule {}