import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';
import { BusinessEntityService } from '../bussiness_entity/business_entity.services';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersPhones } from 'output/entities/UsersPhones';
import { UsersRoles } from 'output/entities/UsersRoles';

import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

import { Roles } from 'output/entities/Roles';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'output/entities/Employee';
import { UsersAddress } from 'output/entities/UsersAddress';
import { UserEmailsService } from '../userEmails/userEmails.service';
import { UserPhonesService } from '../userPhones/userPhones.service';
import { UserAddressService } from '../userAddress/userAddress.service';
import { Address } from 'output/entities/Address';
import { UserEducationService } from '../userEducation/userEducation.service';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UserExperiencesService } from '../userExperiences/userExperiences.service';
import { UsersExperiences } from 'output/entities/UsersExperiences';

@Injectable()
export class UsersService {
  private businessEntityService: BusinessEntityService;
  private userEmailsService: UserEmailsService;
  private userPhonesService: UserPhonesService;
  private userAddressService: UserAddressService;
  private userEducationsService: UserEducationService;
  private userExperiencesService: UserExperiencesService;

  constructor(
    @InjectRepository(BusinessEntity)
    private serviceBusinessEntity: Repository<BusinessEntity>,
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(UsersEmail)
    private serviceUserEmails: Repository<UsersEmail>,
    @InjectRepository(UsersPhones)
    private serviceUserPhones: Repository<UsersPhones>,
    @InjectRepository(UsersRoles)
    private serviceUserRoles: Repository<UsersRoles>,
    @InjectRepository(UsersAddress)
    private serviceUserAddress: Repository<UsersAddress>,
    @InjectRepository(Roles)
    private serviceRoles: Repository<Roles>,
    @InjectRepository(Employee)
    private serviceEmployee: Repository<Employee>,
    @InjectRepository(Address)
    private serviceAddress: Repository<Address>,
    @InjectRepository(UsersEducation)
    private serviceUserEducations: Repository<UsersEducation>,
    @InjectRepository(UsersExperiences)
    private serviceUserExperiences: Repository<UsersExperiences>,
    private serviceJwt: JwtService,
  ) {
    this.businessEntityService = new BusinessEntityService(
      this.serviceBusinessEntity,
    );
    this.userEmailsService = new UserEmailsService(
      this.serviceUsers,
      this.serviceUserEmails,
    );
    this.userPhonesService = new UserPhonesService(
      this.serviceUsers,
      this.serviceUserPhones,
    );
    this.userEducationsService = new UserEducationService(
      this.serviceUsers,
      this.serviceUserEducations,
    );
    this.userAddressService = new UserAddressService(
      this.serviceUsers,
      this.serviceUserAddress,
      this.serviceAddress,
    );
    this.userExperiencesService = new UserExperiencesService(
      this.serviceUsers,
      this.serviceUserExperiences,
    );
  }

  public async getAll() {
    try {
      const businessEntityId = await this.serviceUsers.find({
        order: { userEntityId: 'DESC' },
        relations: ['usersEmails', 'usersPhones'],
      });

      return { success: true, data: businessEntityId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async getOne(id: number) {
    try {
      const businessEntityId = await this.serviceUsers.findOne({
        where: { userEntityId: id },
        select: [
          'userEntityId',
          'userName',
          'userFirstName',
          'userLastName',
          'userBirthDate',
          'userEmailPromotion',
          'userDemographic',
          'userPhoto',
          'userCurrentRole',
        ],
        relations: ['usersEmails', 'usersPhones', 'usersRoles.usroRole'],
      });

      return { success: true, data: businessEntityId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async getUserData(id: number) {
    try {
      const users = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      const usersEmails = (await this.userEmailsService.getUserEmails(id))
        .result;

      const usersPhones = (await this.userPhonesService.getUserPhones(id))
        .result;

      const usersAddresses = (await this.userAddressService.getUserAddress(id))
        .result;

      const usersEducation = (
        await this.userEducationsService.getUserEducations(id)
      ).result;

      const usersExperiences = (
        await this.userExperiencesService.getUserExperiences(id)
      ).result;

      const usersRoles = await this.serviceUserRoles.find({
        where: { usroEntityId: id },
        relations: ['usroRole'],
      });

      return {
        success: true,
        data: {
          ...users,
          usersEmails,
          usersPhones,
          usersAddresses,
          usersEducation,
          usersExperiences,
          usersRoles,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(fields: any) {
    let businessEntity:
      | { success: boolean; data: BusinessEntity; error?: undefined }
      | { success: boolean; error: any; data?: undefined };
    try {
      businessEntity = await this.businessEntityService.create();
      const password = await bcrypt.hash(fields.userPassword, 10);
      const dataUsers = {
        userEntityId: businessEntity.data.entityId,
        userName: fields.userName,
        userPassword: password,
        userCurrentRole: fields.roleId,
      };
      const dataEmail = {
        pmailEntityId: businessEntity.data.entityId,
        pmailAddress: fields.email,
      };

      const dataPhones = {
        uspoEntityId: businessEntity.data.entityId,
        uspoNumber: fields.phone,
        uspoPontyCodeValue: 'Cell',
      };

      const dataRoles = {
        usroEntityId: businessEntity.data.entityId,
        usroRoleId: fields.roleId,
      };

      const dataEmployee = {
        empEntityId: businessEntity.data.entityId,
      };

      if (businessEntity) {
        if (dataRoles.usroRoleId) {
          if (dataPhones.uspoNumber) {
            if (dataEmail.pmailAddress) {
              if (dataUsers.userName) {
                if (dataUsers.userPassword) {
                  await this.serviceUsers.save(dataUsers);
                  await this.serviceUserRoles.save(dataRoles);
                  await this.serviceUserPhones.save(dataPhones);
                  await this.serviceUserEmails.save(dataEmail);
                  if (fields.roleId === 12) {
                    await this.serviceEmployee.save(dataEmployee);
                  }
                } else {
                  await this.businessEntityService.delete(
                    businessEntity.data.entityId,
                  );
                  return {
                    success: false,
                    error: 'Please insert your password',
                  };
                }
              } else {
                await this.businessEntityService.delete(
                  businessEntity.data.entityId,
                );
                return {
                  success: false,
                  error: 'Please insert your username',
                };
              }
            } else {
              await this.businessEntityService.delete(
                businessEntity.data.entityId,
              );
              return {
                success: false,
                error: 'Please Insert Your Email!',
              };
            }
          } else {
            await this.businessEntityService.delete(
              businessEntity.data.entityId,
            );
            return {
              success: false,
              error: 'Please Insert Your Phone Number!',
            };
          }
        } else {
          await this.businessEntityService.delete(businessEntity.data.entityId);
          return {
            success: false,
            error: 'Please Insert User Roles!',
          };
        }

        const businessEntityId = await this.serviceUsers.findOne({
          where: { userEntityId: businessEntity.data.entityId },
          relations: ['usersEmails', 'usersPhones', 'usersRoles'],
        });

        return { success: true, data: businessEntityId };
      } else {
        return {
          success: false,
          error: 'Failed Create New Business Entity, Try Again!',
        };
      }
    } catch (error) {
      if (businessEntity) {
        await this.businessEntityService.delete(businessEntity.data.entityId);
      }
      return { success: false, error: error.message };
    }
  }

  public async edit(id: any, fields: any) {
    try {
      const updateData = {
        userName: fields.userName,
        userFirstName: fields.userFirstName,
        userLastName: fields.userLastName,
        userBirthDate: fields.userBirthDate,
      };

      const users = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (users) {
        await this.serviceUsers.update(id, { ...updateData });

        const result = await this.serviceUsers.findOne({
          where: { userEntityId: id },
          relations: [
            'usersEmails',
            'usersPhones',
            'usersAddresses',
            'usersRoles.usroRole',
          ],
        });

        return { success: true, result };
      } else {
        return { success: false, error: `Users with id ${id} not found.` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async password(id: any, fields: any) {
    try {
      const password = await bcrypt.hash(fields.newPassword, 10);
      const updateData = {
        userPassword: password,
      };

      const users = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (users) {
        const compare = await bcrypt.compare(
          fields.oldPassword,
          users.userPassword,
        );
        if (compare) {
          await this.serviceUsers.update(id, { ...updateData });
          const result = await this.serviceUsers.findOne({
            where: { userEntityId: id },
            relations: [
              'usersEmails',
              'usersPhones',
              'usersAddresses',
              'usersRoles.usroRole',
            ],
          });

          return { success: true, result };
        } else {
          return { success: false, error: `Old password wrong!` };
        }
      } else {
        return { success: false, error: `Users with id ${id} not found.` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async delete(id: number) {
    try {
      const users = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      const employee = await this.serviceEmployee.findOne({
        where: { empEntityId: id },
      });

      if (users) {
        if (employee) {
          await this.serviceEmployee.remove(employee);
        }
        await this.serviceUserEmails.delete({ pmailEntityId: id });
        await this.serviceUserPhones.delete({ uspoEntityId: id });
        await this.serviceUserRoles.delete({ usroEntityId: id });
        await this.serviceUserAddress.delete({ etadEntityId: id });
        await this.serviceUserEducations.delete({ usduEntityId: id });
        await this.serviceUserExperiences.delete({ usexEntityId: id });
        await this.serviceUsers.remove(users);
        await this.businessEntityService.delete(id);
        return {
          success: true,
          response: `Delete Users with id ${id} success`,
        };
      } else {
        return { success: false, response: 'User Not Found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async validateUser(username: string, password: string) {
    const user = await this.serviceUsers.findOne({
      where: { userName: username },
    });

    if (user) {
      const roles = await this.serviceRoles.findOne({
        where: { roleId: user.userCurrentRole },
      });
      const compare = await bcrypt.compare(password, user.userPassword);
      if (compare) {
        return {
          userEntityId: user.userEntityId,
          userName: user.userName,
          userPhoto: user.userPhoto,
          userRolesType: roles.roleType,
        };
      } else {
        return { error: `Password Wrong!` };
      }
    } else {
      return { error: `Username not found!` };
    }
  }

  public async login(payload: any) {
    if (payload.error) {
      return {
        payload: payload,
      };
    } else {
      return {
        access_token: this.serviceJwt.sign(payload),
        payload: payload,
      };
    }
  }

  public async getUserPhoto(userPhoto: any, res: any) {
    const imagePath = path.join(process.cwd(), 'uploads', userPhoto);
    try {
      const image = fs.readFileSync(imagePath);
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(image);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async editUserPhoto(file: any, id: any) {
    try {
      const users = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (users) {
        await this.serviceUsers.update(id, { userPhoto: file.originalname });

        const result = await this.serviceUsers.findOne({
          where: { userEntityId: id },
          relations: [
            'usersEmails',
            'usersPhones',
            'usersAddresses',
            'usersRoles.usroRole',
          ],
        });

        return { success: true, result };
      } else {
        return { success: false, error: `Users with id ${id} not found.` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
