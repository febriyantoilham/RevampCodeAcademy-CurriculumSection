import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { SectionService } from './section.services';

@Controller('program_entity/section')
export class SectionController {
  constructor(private Service: SectionService) {}

  @Post('create/:progEntityId')
  public async Create(
    @Param('progEntityId') progEntityId: number,
    @Body() fields: any,
  ) {
    return this.Service.create(progEntityId, fields);
  }

  @Get('get/:progEntityId')
  public async getAll(@Param('progEntityId') progEntityId: number) {
    return this.Service.findAll(progEntityId);
  }

  @Get('get/one/:sectId')
  public async getOne(@Param('sectId') sectId: number) {
    return this.Service.findOne(sectId);
  }

  @Put('update/:sectProgEntityId/:sectId')
  public async Update(
    @Param('sectId') sectId: number,
    @Param('sectProgEntityId') sectProgEntityId: number,
    @Body() fields: any,
  ) {
    return this.Service.update(sectId, sectProgEntityId, fields);
  }

  @Delete('delete/:sectProgEntityId/:sectId')
  public async Delete(
    @Param('sectId') sectId: number,
    @Param('sectProgEntityId') sectProgEntityId: number,
  ) {
    return this.Service.Delete(sectId, sectProgEntityId);
  }
}
