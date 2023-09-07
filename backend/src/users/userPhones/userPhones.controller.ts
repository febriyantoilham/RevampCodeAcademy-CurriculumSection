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
import { AuthGuard } from '@nestjs/passport';
import { UsersDto } from '../dto/users.dto';
import { UserPhonesService } from './userPhones.service';

@Controller('users/users/profile/phone')
export class UserPhonesController {
  constructor(private Service: UserPhonesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async getUserPhones(@Param('id') id: number) {
    return this.Service.getUserPhones(id);
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
