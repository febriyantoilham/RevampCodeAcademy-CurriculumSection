import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SectionDetailService } from './sectionDetail.services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('curriculum/subsection')
export class SectionDetailController {
  constructor(private Service: SectionDetailService) {}

  @Post('create/:sectProgEntityId/:sectId')
  @UseInterceptors(FileInterceptor('file'))
  public async Create(
    @UploadedFile() file: any,
    @Param('sectId') sectId: number,
    @Param('sectProgEntityId') sectProgEntityId: number,
    @Body() fields: any,
  ) {
    return this.Service.create(file, sectId, sectProgEntityId, fields);
  }

  @Get('get/:sectProgEntityId/:sectId')
  public async getOne(
    @Param('sectId') sectId: number,
    @Param('sectProgEntityId') sectProgEntityId: number,
  ) {
    return this.Service.findOne(sectId, sectProgEntityId);
  }
}
