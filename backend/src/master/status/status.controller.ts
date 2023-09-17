import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('master/status')
export class StatusController {
  constructor(private service: StatusService) {}

  @Get()
  public async getAllStatus() {
    return this.service.getAllStatus();
  }

  @Post('create')
  public async create(@Body() fields: any) {
    return this.service.create(fields);
  }

  @Put('edit')
  public async edit(@Query() options: { status: string }, @Body() fields: any) {
    return this.service.edit(options, fields);
  }

  @Delete('delete')
  public async delete(@Query() options: { status: string }) {
    return this.service.delete(options);
  }
}
