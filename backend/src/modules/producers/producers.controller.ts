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
  } from '@nestjs/common';
  import { ProducersService } from './producers.service';
  import { CreateProducerDto } from './dto/create-producer.dto';
  
  @Controller('producers')
  export class ProducersController {
    constructor(private readonly producersService: ProducersService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProducerDto: CreateProducerDto) {
      return await this.producersService.create(createProducerDto);
    }
  
    @Get()
    async findAll() {
      return await this.producersService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.producersService.findOne(id);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProducerDto: Partial<CreateProducerDto>,
    ) {
      return await this.producersService.update(id, updateProducerDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
      await this.producersService.remove(id);
    }
  }