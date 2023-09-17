import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  Res,
} from '@nestjs/common';
import { ProgramEntityService } from './program_entity.services';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/curriculum/dto/pagination.dto';

@Controller('program_entity')
export class ProgramEntityController {
  constructor(private Service: ProgramEntityService) {}

  /* Get All Program */
  @Get('paging')
  public async getAll(@Query() options: PaginationDto) {
    const room = this.Service.getAll(options);
    return room;
  }

  /* Search Program */
  @Get('search')
  public async search(@Query() options: PaginationDto) {
    const room = this.Service.search(options);
    return room;
  }

  /* Get New progEntityId */
  @Get('getNewProgEntityId')
  public async getNewProgEntityId() {
    return this.Service.getNewProgEntityId();
  }

  /* 
    Create Program Entity
    Upload Logo (Optional)
  */
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  public async Create(@Body() fields: any, @UploadedFile() file?: any) {
    return this.Service.create(fields, file);
  }

  @Get('view/proentityid/:id')
  public async getOne(@Param('id') id: number) {
    return this.Service.findOne(id);
  }

  @Get('getImg/:imageName')
  public async getImg(@Param('imageName') imageName: any, @Res() res: any) {
    return this.Service.getImg(imageName, res);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async Update(
    @Param('id') id: any,
    @Body() fields?: any,
    @UploadedFile('file') file?: any,
  ) {
    return this.Service.update(file, id, fields);
  }

  @Delete('delete/:id')
  public async Delete(@Param('id') id: number) {
    return this.Service.Delete(id);
  }

  @Delete('bulk_delete')
  public async BulkDelete(@Body() fields: any) {
    return this.Service.BulkDelete(fields);
  }

  @Get('cat&emp')
  public async getCatAndEmp() {
    return this.Service.getCatAndEmp();
  }

  @Get('category')
  /**
   * Category
   */
  public async Category() {
    return this.Service.getAllCategory();
  }

  @Get('instructor')
  /**
   * Instructor
   */
  public Instructor() {
    return this.Service.getAllInstructor();
  }
}
