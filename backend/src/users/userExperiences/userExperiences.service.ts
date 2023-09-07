import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { UsersExperiences } from 'output/entities/UsersExperiences';
import { Repository } from 'typeorm';

@Injectable()
export class UserExperiencesService {
  constructor(
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(UsersExperiences)
    private serviceUserExperiences: Repository<UsersExperiences>,
  ) {}

  public async getUserExperiences(id: any) {
    try {
      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        const ExperiencesData = await this.serviceUserExperiences.find({
          where: { usexEntityId: id },
          order: {
            usexStartDate: 'DESC',
          },
        });

        return { success: true, result: ExperiencesData };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(id: any, fields: any) {
    try {
      console.log(JSON.stringify(fields));

      const dataExperiences = {
        usexEntityId: id,
        usexTitle: fields.usexTitle,
        usexProfileHeadline: fields.usexProfileHeadline,
        usexEmploymentType: fields.usexEmploymentType,
        usexCompanyName: fields.usexCompanyName,
        usexIsCurrent: fields.usexIsCurrent,
        usexStartDate: fields.usexStartDate,
        usexEndDate: fields.usexEndDate,
        usexIndustry: fields.usexIndustry,
        usexDescription: fields.usexDescription,
        usexExperienceType: fields.usexExperienceType,
        usexCityId: fields.usexCityId,
      };

      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        await this.serviceUserExperiences.save(dataExperiences);
        const userExperiences = await this.serviceUserExperiences.find({
          where: { usexEntityId: id },
        });

        return { success: true, result: userExperiences };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async edit(options: UsersOptions, fields: any) {
    try {
      const userExperiences = await this.serviceUserExperiences.findOne({
        where: {
          usexEntityId: options.userEntityId,
          usexId: options.id,
        },
      });

      const updateData = {
        usexTitle: fields.usexTitle,
        usexProfileHeadline: fields.usexProfileHeadline,
        usexEmploymentType: fields.usexEmploymentType,
        usexCompanyName: fields.usexCompanyName,
        usexIsCurrent: fields.usexIsCurrent,
        usexStartDate: fields.usexStartDate,
        usexEndDate: fields.usexEndDate,
        usexIndustry: fields.usexIndustry,
        usexDescription: fields.usexDescription,
        usexExperienceType: fields.usexExperienceType,
        usexCityId: fields.usexCityId,
      };

      if (userExperiences) {
        await this.serviceUserExperiences.update(
          {
            usexEntityId: options.userEntityId,
            usexId: options.id,
          },
          { ...updateData },
        );
        const updateUserExperiences = await this.serviceUserExperiences.find({
          where: {
            usexEntityId: options.userEntityId,
            usexId: fields.id,
          },
        });

        return { success: true, result: updateUserExperiences };
      } else {
        return { success: false, error: `Experiences data not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async delete(options: UsersOptions) {
    try {
      const dataExperiences = await this.serviceUserExperiences.findOne({
        where: {
          usexEntityId: options.userEntityId,
          usexId: options.id,
        },
      });

      if (dataExperiences) {
        const result = await this.serviceUserExperiences.remove(
          dataExperiences,
        );

        return { success: true, result: result };
      } else {
        return { success: false, error: `Experiences data not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
