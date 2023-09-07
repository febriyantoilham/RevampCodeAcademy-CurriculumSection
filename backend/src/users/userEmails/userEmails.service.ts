import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { UsersEmail } from 'output/entities/UsersEmail';
import { Repository } from 'typeorm';

@Injectable()
export class UserEmailsService {
  constructor(
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(UsersEmail)
    private serviceUserEmails: Repository<UsersEmail>,
  ) {}

  public async getUserEmails(id: any) {
    try {
      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        const emailData = await this.serviceUserEmails.find({
          where: { pmailEntityId: id },
        });

        return { success: true, result: emailData };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(id: any, fields: any) {
    try {
      const dataEmail = {
        pmailEntityId: id,
        pmailAddress: fields.pmailAddress,
      };

      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        await this.serviceUserEmails.save(dataEmail);
        const userEmails = await this.serviceUserEmails.find({
          where: { pmailEntityId: id },
        });

        return { success: true, result: userEmails };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async edit(options: UsersOptions, fields: any) {
    try {
      const userEmails = await this.serviceUserEmails.findOne({
        where: {
          pmailEntityId: options.userEntityId,
          pmailId: options.id,
        },
      });

      const updateData = {
        pmailAddress: fields.pmailAddress,
      };

      if (userEmails) {
        await this.serviceUserEmails.update(
          { pmailEntityId: options.userEntityId, pmailId: options.id },
          { ...updateData },
        );
        const updateUserEmails = await this.serviceUserEmails.find({
          where: { pmailEntityId: options.userEntityId, pmailId: options.id },
        });

        return { success: true, result: updateUserEmails };
      } else {
        return { success: false, error: `Email not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async delete(options: UsersOptions) {
    try {
      const dataEmail = await this.serviceUserEmails.findOne({
        where: { pmailEntityId: options.userEntityId, pmailId: options.id },
      });

      if (dataEmail) {
        const result = await this.serviceUserEmails.remove(dataEmail);

        return { success: true, result: result };
      } else {
        return { success: false, error: `Email not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
