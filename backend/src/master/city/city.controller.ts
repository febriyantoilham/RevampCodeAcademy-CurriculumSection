import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('master/city')
export class CityController {
  constructor(private Service: CityService) {}

  @Get()
  public async getCity() {
    return this.Service.getCity();
  }
}
