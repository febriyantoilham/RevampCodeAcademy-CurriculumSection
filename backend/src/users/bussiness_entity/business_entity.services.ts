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
  public async getAll() {
    try {
      const businessEntityId = await this.serviceBusinessEntity.find({
        order: { entityId: 'DESC' },
      });

      return { success: true, data: businessEntityId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async getOne(id: number) {
    try {
      const businessEntityId = await this.serviceBusinessEntity.findOne({
        where: { entityId: id },
      });

      return { success: true, data: businessEntityId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create() {
    try {
      const sequenceName = 'users.business_entity_entity_id_seq';

      const query = `
      SELECT SETVAL('${sequenceName}', MAX(entity_id))
      FROM users.business_entity;
    `;

      await this.serviceBusinessEntity.query(query);

      const newBusinessEntity = await this.serviceBusinessEntity.save({});

      return { success: true, data: newBusinessEntity };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async delete(id: number) {
    try {
      const data = await this.serviceBusinessEntity.findOne({
        where: { entityId: id },
      });
      if (data) {
        await this.serviceBusinessEntity.remove(data);
        return { success: true, massage: `Id ${id} Deleted` };
      } else {
        return { success: false, error: `Id ${id} Not Found` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
