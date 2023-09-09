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
import { InstructorProgramsService } from './instructorPrograms.service';
import { BootcampDto } from '../dto/pagination.dto';

@Controller('bootcamp/instructor_programs')
export class instructorProgramsController {
  constructor(private service: InstructorProgramsService) {}

  @Get('instructor_list')
  public async getInstructor() {
    return this.service.getInstructor();
  }

  @Get('program_list')
  public async getProgram() {
    return this.service.getProgram();
  }

  @Post('create')
  public async create(@Body() fields: any) {
    return this.service.create(fields);
  }

  @Put('edit')
  public async edit(@Query() options: BootcampDto, @Body() fields: any) {
    return this.service.edit(options, fields);
  }

  @Delete('delete')
  public async delete(@Query() options: BootcampDto) {
    return this.service.delete(options);
  }
}
