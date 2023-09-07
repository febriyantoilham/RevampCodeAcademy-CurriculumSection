import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
  Request,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users/users')
export class UsersController {
  constructor(private Service: UsersService) {}

  @Get()
  public async getAll() {
    return this.Service.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return this.Service.getOne(id);
  }

  @Post()
  public async create(@Body() fields: any) {
    return this.Service.create(fields);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.Service.delete(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  public async signIn(@Request() req: any) {
    return this.Service.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/view/:id')
  public async getUserData(@Param('id') id: number) {
    return this.Service.getUserData(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/edit/:id')
  public async edit(@Param('id') id: number, @Body() fields: any) {
    return this.Service.edit(id, fields);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/password/:id')
  public async password(@Param('id') id: number, @Body() fields: any) {
    return this.Service.password(id, fields);
  }

  @Get('profile/photo/:imageName')
  public async getUserPhoto(
    @Param('imageName') imageName: any,
    @Res() res: any,
  ) {
    return this.Service.getUserPhoto(imageName, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/photo/edit/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async editUserPhoto(
    @Param('id') id: any,
    @UploadedFile('file') file: any,
  ) {
    return this.Service.editUserPhoto(file, id);
  }
}
