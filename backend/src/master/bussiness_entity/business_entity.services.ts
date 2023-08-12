import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessEntityService {
  constructor(
    @InjectRepository(BusinessEntity)
    private serviceBusinessEntity: Repository<BusinessEntity>,
  ) {}

  /**
   * getNewBusinessEntityId
   */
  public async getNewBusinessEntityId() {
    const businessEntityId = await this.serviceBusinessEntity.find({
      order: { entityId: 'DESC' },
    });

    return businessEntityId;
  }
}
