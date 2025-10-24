import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
    Query,
  } from '@nestjs/common';
  import { ParcelsService } from './parcels.service';
  import { CreateParcelDto } from './dto/create-parcel.dto';
  import { ParcelStatus } from './entities/parcel.entity';
  
  @Controller('parcels')
  export class ParcelsController {
    constructor(private readonly parcelsService: ParcelsService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createParcelDto: CreateParcelDto) {
      return await this.parcelsService.create(createParcelDto);
    }
  
    @Get()
    async findAll(@Query('producerId') producerId?: string) {
      if (producerId) {
        return await this.parcelsService.findByProducer(producerId);
      }
      return await this.parcelsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.parcelsService.findOne(id);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateParcelDto: Partial<CreateParcelDto>,
    ) {
      return await this.parcelsService.update(id, updateParcelDto);
    }
  
    @Patch(':id/status')
    async updateStatus(
      @Param('id') id: string,
      @Body('status') status: ParcelStatus,
    ) {
      return await this.parcelsService.updateStatus(id, status);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
      await this.parcelsService.remove(id);
    }
  }