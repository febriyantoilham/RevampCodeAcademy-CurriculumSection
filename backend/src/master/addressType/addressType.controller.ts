import { Controller, Get } from '@nestjs/common';
import { AddressTypeService } from './addressType.service';

@Controller('master/addressType')
export class AddressTypeController {
  constructor(private Service: AddressTypeService) {}

  @Get()
  public async getAddressType() {
    return this.Service.getAddressType();
  }
}
