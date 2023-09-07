import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BusinessEntityService } from './business_entity.services';

@Controller('users/business_entity')
export class BusinessEntityController {
  constructor(private Service: BusinessEntityService) {}

  @Get()
  public async getAll() {
    return this.Service.getAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return this.Service.getOne(id);
  }

  @Post('create')
  public async createNew() {
    return this.Service.create();
  }

  @Delete(':id')
  public async deleteOne(@Param('id') id: number) {
    return this.Service.delete(id);
  }
}
