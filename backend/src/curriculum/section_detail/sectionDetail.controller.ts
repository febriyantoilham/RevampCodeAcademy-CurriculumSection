import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { SectionDetailService } from './sectionDetail.services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('program_entity/subsection')
export class SectionDetailController {
  constructor(private Service: SectionDetailService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  public async Create(@UploadedFile() file: any, @Body() fields: any) {
    return this.Service.create(file, fields);
  }

  @Get('get/all/:secdSectid')
  public async getAll(@Param('secdSectid') secdSectid: number) {
    return this.Service.findAll(secdSectid);
  }

  @Get('get/one/:secdId')
  public async getOne(@Param('secdId') secdId: number) {
    return this.Service.findOne(secdId);
  }

  @Put('update/:secdId')
  @UseInterceptors(FileInterceptor('file'))
  public async update(
    @Param('secdId') secdId: number,
    @Body() fields: any,
    @UploadedFile() file?: any,
  ) {
    return this.Service.update(secdId, file, fields);
  }

  @Delete('delete/one/:secdId')
  public async deleteOne(@Param('secdId') secdId: number) {
    return this.Service.deleteOne(secdId);
  }

  @Delete('delete/bulk')
  public async deleteBulk(@Body() fields: any) {
    return this.Service.deleteBulk(fields);
  }

  @Get('get/file/:fileName')
  public async getFile(@Param('fileName') fileName: any, @Res() res: any) {
    return this.Service.getFile(fileName, res);
  }
}
