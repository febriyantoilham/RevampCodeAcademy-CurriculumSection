import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressType } from 'output/entities/AddressType';
import { Repository } from 'typeorm';

@Injectable()
export class AddressTypeService {
  constructor(
    @InjectRepository(AddressType)
    private serviceAddressType: Repository<AddressType>,
  ) {}

  public async getAddressType() {
    try {
      const result = await this.serviceAddressType.find();

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
