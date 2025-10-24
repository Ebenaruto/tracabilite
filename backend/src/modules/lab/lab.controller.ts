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
  import { LabService } from './lab.service';
  import { CreateLabTestDto } from './dto/create-lab-test.dto';
  import { TestStatus } from './entities/lab-test.entity';
  
  @Controller('lab')
  export class LabController {
    constructor(private readonly labService: LabService) {}
  
    @Post('tests')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLabTestDto: CreateLabTestDto) {
      return await this.labService.create(createLabTestDto);
    }
  
    @Get('tests')
    async findAll(@Query('lotId') lotId?: string) {
      if (lotId) {
        return await this.labService.findByLot(lotId);
      }
      return await this.labService.findAll();
    }
  
    @Get('tests/:id')
    async findOne(@Param('id') id: string) {
      return await this.labService.findOne(id);
    }
  
    @Patch('tests/:id/status')
    async updateStatus(
      @Param('id') id: string,
      @Body('status') status: TestStatus,
    ) {
      return await this.labService.updateStatus(id, status);
    }
  
    @Patch('tests/:id/validate')
    async validate(
      @Param('id') id: string,
      @Body('validatorId') validatorId: string,
    ) {
      return await this.labService.validate(id, validatorId);
    }
  
    @Delete('tests/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
      await this.labService.remove(id);
    }
  }
 