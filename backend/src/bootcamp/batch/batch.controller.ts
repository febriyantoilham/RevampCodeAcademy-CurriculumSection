import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Res,
  Query,
} from '@nestjs/common';
import { BatchService } from './batch.service';
import { BootcampDto } from '../dto/pagination.dto';

@Controller('bootcamp/batch')
export class BatchController {
  constructor(private service: BatchService) {}

  @Get('getImg/:imageName')
  public async getImg(@Param('imageName') imageName: any, @Res() res: any) {
    return this.service.getImg(imageName, res);
  }

  @Get('status_list')
  public async getStatus() {
    return this.service.getStatus();
  }

  @Get('program_list')
  public async getProgram() {
    return this.service.getProgram();
  }

  @Get('candidate_list')
  public async getCandidate() {
    return this.service.getCandidate();
  }

  @Get('paging')
  public async getAll(@Query() options: BootcampDto) {
    return this.service.getAll(options);
  }

  @Get('batch_per_program')
  public async getByProgId(@Query() options: BootcampDto) {
    return this.service.getByProgId(options);
  }

  @Get(':id')
  public async getByBatchId(@Param('id') id: number) {
    return this.service.getByBatchId(id);
  }

  @Post('create')
  public async create(@Body() fields: any) {
    return this.service.create(fields);
  }

  @Put('edit')
  public async edit(@Query() options: BootcampDto, @Body() fields: any) {
    return this.service.edit(options, fields);
  }

  @Put('close_batch')
  public async setClosed(@Query() options: BootcampDto) {
    return this.service.setClosed(options);
  }

  @Put('set_running')
  public async setRunning(@Query() options: BootcampDto) {
    return this.service.setRunning(options);
  }

  @Delete('delete')
  public async delete(@Query() options: BootcampDto) {
    return this.service.delete(options);
  }

  @Delete('bulk_delete')
  public async bulkDelete(@Body() fields: any) {
    return this.service.bulkDelete(fields);
  }
}
