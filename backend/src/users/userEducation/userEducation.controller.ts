import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserEducationService } from './userEducation.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersDto } from '../dto/users.dto';

@Controller('users/users/profile/education')
export class UserEdicationController {
  constructor(private Service: UserEducationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async getUserEducations(@Param('id') id: number) {
    return this.Service.getUserEducations(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  public async create(@Param('id') id: number, @Body() fields: any) {
    return this.Service.create(id, fields);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  public async edit(@Query() options: UsersDto, @Body() fields: any) {
    return this.Service.edit(options, fields);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  public async delete(@Query() options: UsersDto) {
    return this.Service.delete(options);
  }
}
