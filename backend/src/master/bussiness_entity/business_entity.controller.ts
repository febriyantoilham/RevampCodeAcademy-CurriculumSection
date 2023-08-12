import { Controller, Get } from '@nestjs/common';
import { BusinessEntityService } from './business_entity.services';

@Controller('business_entity')
export class BusinessEntityController {
  constructor(private Service: BusinessEntityService) {}

  @Get()
  public async getAll() {
    return this.Service.getNewBusinessEntityId();
  }
}
