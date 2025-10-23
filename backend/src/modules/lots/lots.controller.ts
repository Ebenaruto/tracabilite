import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { LotsService } from './lots.service';
  import { CreateLotDto } from './dto/create-lot.dto';
  import { AddEventDto } from './dto/add-event.dto';
  import { LotStatus } from './entities/lot.entity';
  
  @Controller('lots')
  export class LotsController {
    constructor(private readonly lotsService: LotsService) {}
  
    @Post()
@HttpCode(HttpStatus.CREATED)
async create(@Body() createLotDto: CreateLotDto) {
  // Temporaire : passer null, le service va chercher un vrai user
  return await this.lotsService.create(createLotDto, null);
}
  
    @Get()
    async findAll() {
      return await this.lotsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.lotsService.findOne(id);
    }
  
    @Post(':id/events')
    @HttpCode(HttpStatus.CREATED)
    async addEvent(@Param('id') id: string, @Body() addEventDto: AddEventDto) {
      return await this.lotsService.addEvent(id, addEventDto);
    }
  
    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Body('status') status: LotStatus) {
      return await this.lotsService.updateStatus(id, status);
    }
  }