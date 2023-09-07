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
import { UserExperiencesService } from './userExperiences.service';

@Controller('users/users/profile/experiences')
export class UserExperiencesController {
  constructor(private Service: UserExperiencesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async getUserExperiences(@Param('id') id: number) {
    return this.Service.getUserExperiences(id);
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
