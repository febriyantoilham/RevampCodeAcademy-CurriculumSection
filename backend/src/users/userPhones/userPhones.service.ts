import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { UsersPhones } from 'output/entities/UsersPhones';
import { Repository } from 'typeorm';

@Injectable()
export class UserPhonesService {
  constructor(
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(UsersPhones)
    private serviceUserPhones: Repository<UsersPhones>,
  ) {}

  public async getUserPhones(id: any) {
    try {
      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        const phonesData = await this.serviceUserPhones.find({
          where: { uspoEntityId: id },
        });

        return { success: true, result: phonesData };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(id: any, fields: any) {
    try {
      const dataPhones = {
        uspoEntityId: id,
        uspoNumber: fields.uspoNumber,
        uspoPontyCodeValue: fields.uspoPontyCodeValue,
      };

      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        await this.serviceUserPhones.save(dataPhones);
        const userPhones = await this.serviceUserPhones.find({
          where: { uspoEntityId: id },
        });

        return { success: true, result: userPhones };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async edit(options: UsersOptions, fields: any) {
    try {
      const userPhones = await this.serviceUserPhones.findOne({
        where: {
          uspoEntityId: options.userEntityId,
          uspoNumber: options.id.toString(),
        },
      });

      const updateData = {
        uspoNumber: fields.uspoNumber,
        uspoPontyCodeValue: fields.uspoPontyCodeValue,
      };

      if (userPhones) {
        await this.serviceUserPhones.update(
          {
            uspoEntityId: options.userEntityId,
            uspoNumber: options.id.toString(),
          },
          { ...updateData },
        );
        const updateUserPhones = await this.serviceUserPhones.find({
          where: {
            uspoEntityId: options.userEntityId,
            uspoNumber: fields.uspoNumber,
          },
        });

        return { success: true, result: updateUserPhones };
      } else {
        return { success: false, error: `Phone Number not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async delete(options: UsersOptions) {
    try {
      const dataPhones = await this.serviceUserPhones.findOne({
        where: {
          uspoEntityId: options.userEntityId,
          uspoNumber: options.id.toString(),
        },
      });

      if (dataPhones) {
        const result = await this.serviceUserPhones.remove(dataPhones);

        return { success: true, result: result };
      } else {
        return { success: false, error: `Phone Number not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
