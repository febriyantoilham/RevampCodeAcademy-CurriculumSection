import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { UsersEducation } from 'output/entities/UsersEducation';
import { Repository } from 'typeorm';

@Injectable()
export class UserEducationService {
  constructor(
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(UsersEducation)
    private serviceUserEducations: Repository<UsersEducation>,
  ) {}

  public async getUserEducations(id: any) {
    try {
      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        const educationsData = await this.serviceUserEducations.find({
          where: { usduEntityId: id },
          order: {
            usduStartDate: 'ASC',
          },
        });

        return { success: true, result: educationsData };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(id: any, fields: any) {
    try {
      const dataEducation = {
        usduEntityId: id,
        usduSchool: fields.usduSchool,
        usduDegree: fields.usduDegree,
        usduFieldStudy: fields.usduFieldStudy,
        usduGraduateYear: fields.usduGraduateYear,
        usduStartDate: fields.usduStartDate,
        usduEndDate: fields.usduEndDate,
        usduGrade: fields.usduGrade,
        usduActivities: fields.usduActivities,
        usduDescription: fields.usduDescription,
        usduModifiedDate: new Date(),
      };

      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        await this.serviceUserEducations.save(dataEducation);

        const educationsData = await this.serviceUserEducations.find({
          where: { usduEntityId: id },
        });

        return { success: true, result: educationsData };
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async edit(options: UsersOptions, fields: any) {
    try {
      const userCheck = await this.serviceUsers.findOne({
        where: { userEntityId: options.userEntityId },
      });

      if (!userCheck) {
        return { success: false, error: `User not found` };
      }
      const educationCheck = await this.serviceUserEducations.findOne({
        where: {
          usduEntityId: options.userEntityId,
          usduId: options.id,
        },
      });

      if (!educationCheck) {
        return { success: false, error: `Education id not found` };
      }

      const dataEducation = {
        usduSchool: fields.usduSchool,
        usduDegree: fields.usduDegree,
        usduFieldStudy: fields.usduFieldStudy,
        usduGraduateYear: fields.usduGraduateYear,
        usduStartDate: fields.usduStartDate,
        usduEndDate: fields.usduEndDate,
        usduGrade: fields.usduGrade,
        usduActivities: fields.usduActivities,
        usduDescription: fields.usduDescription,
        usduModifiedDate: new Date(),
      };

      await this.serviceUserEducations.update(
        { usduEntityId: options.userEntityId, usduId: options.id },
        { ...dataEducation },
      );

      const updateUserEducations = await this.serviceUserEducations.find({
        where: { usduEntityId: options.userEntityId, usduId: options.id },
      });

      return { success: true, result: updateUserEducations };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async delete(options: UsersOptions) {
    try {
      const userCheck = await this.serviceUsers.findOne({
        where: { userEntityId: options.userEntityId },
      });

      if (!userCheck) {
        return { success: false, error: `User not found` };
      }

      const educationCheck = await this.serviceUserEducations.findOne({
        where: { usduEntityId: options.userEntityId, usduId: options.id },
      });

      if (!educationCheck) {
        return { success: false, error: `Education id not found!` };
      }

      const result = await this.serviceUserEducations.remove(educationCheck);
      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
