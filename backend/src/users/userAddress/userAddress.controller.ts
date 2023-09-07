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
import { UserAddressService } from './userAddress.service';

@Controller('users/users/profile/address')
export class UserAddressController {
  constructor(private Service: UserAddressService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async getUserAddress(@Param('id') id: number) {
    return this.Service.getUserAddress(id);
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
  @Delete(':id')
  public async delete(@Param('id') id: any) {
    return this.Service.delete(id);
  }
}
