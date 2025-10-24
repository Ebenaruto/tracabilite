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
  import { NonConformitiesService } from './non-conformities.service';
  import { CreateNonConformityDto } from './dto/create-non-conformity.dto';
  import { NCStatus } from './entities/non-conformity.entity';
  import { ActionStatus } from './entities/corrective-action.entity';
  
  @Controller('non-conformities')
  export class NonConformitiesController {
    constructor(private readonly nonConformitiesService: NonConformitiesService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createNonConformityDto: CreateNonConformityDto) {
      return await this.nonConformitiesService.create(createNonConformityDto);
    }
  
    @Get()
    async findAll(
      @Query('lotId') lotId?: string,
      @Query('status') status?: NCStatus,
    ) {
      if (lotId) {
        return await this.nonConformitiesService.findByLot(lotId);
      }
      if (status) {
        return await this.nonConformitiesService.findByStatus(status);
      }
      return await this.nonConformitiesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.nonConformitiesService.findOne(id);
    }
  
    @Patch(':id/status')
    async updateStatus(
      @Param('id') id: string,
      @Body('status') status: NCStatus,
      @Body('userId') userId?: string,
    ) {
      return await this.nonConformitiesService.updateStatus(id, status, userId);
    }
  
    @Patch(':id/assign')
    async assignTo(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ) {
      return await this.nonConformitiesService.assignTo(id, userId);
    }
  
    @Post(':id/actions')
    @HttpCode(HttpStatus.CREATED)
    async addCorrectiveAction(
      @Param('id') id: string,
      @Body() actionData: any,
    ) {
      return await this.nonConformitiesService.addCorrectiveAction(id, actionData);
    }
  
    @Patch('actions/:actionId/status')
    async updateActionStatus(
      @Param('actionId') actionId: string,
      @Body('status') status: ActionStatus,
      @Body('completionDate') completionDate?: string,
    ) {
      return await this.nonConformitiesService.updateActionStatus(
        actionId,
        status,
        completionDate ? new Date(completionDate) : undefined,
      );
    }
  
    @Patch('actions/:actionId/verify')
    async verifyAction(
      @Param('actionId') actionId: string,
      @Body('verifierId') verifierId: string,
      @Body('verificationNotes') verificationNotes?: string,
    ) {
      return await this.nonConformitiesService.verifyAction(
        actionId,
        verifierId,
        verificationNotes,
      );
    }
  
    @Patch(':id/close')
    async close(
      @Param('id') id: string,
      @Body('userId') userId: string,
      @Body('closureNotes') closureNotes?: string,
    ) {
      return await this.nonConformitiesService.close(id, userId, closureNotes);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
      await this.nonConformitiesService.remove(id);
    }
  }