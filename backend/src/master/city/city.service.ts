import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'output/entities/City';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private serviceCity: Repository<City>,
  ) {}

  public async getCity() {
    try {
      const result = await this.serviceCity.find();

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
