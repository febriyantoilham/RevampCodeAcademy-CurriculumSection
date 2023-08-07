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

@Controller('curriculum/section')
export class SectionController {
  constructor(private Service: SectionService) {}

  @Post('create/:sectProgEntityId')
  public async Create(
    @Param('sectProgEntityId') sectProgEntityId: number,
    @Body() fields: any,
  ) {
    return this.Service.create(sectProgEntityId, fields);
  }

  @Get('get/:sectProgEntityId')
  public async getOne(
    // @Param('sectId') sectId: number,
    @Param('sectProgEntityId') sectProgEntityId: number,
  ) {
    return this.Service.findOne(sectProgEntityId);
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
