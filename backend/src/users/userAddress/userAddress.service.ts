import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'output/entities/Address';
import { Users } from 'output/entities/Users';
import { UsersAddress } from 'output/entities/UsersAddress';
import { Repository } from 'typeorm';

function generateDataAddress(fields) {
  return {
    addrLine1: fields.addrLine1,
    addrLine2: fields.addrLine2,
    addrPostalCode: fields.addrPostalCode,
    addrSpatialLocation: '',
    addrModifiedDate: new Date(),
    addrCityId: fields.addrCityId,
  };
}

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(UsersAddress)
    private serviceUserAddress: Repository<UsersAddress>,
    @InjectRepository(Address)
    private serviceAddress: Repository<Address>,
  ) {}

  public async getUserAddress(id: any) {
    try {
      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (userData) {
        const addressData = await this.serviceUserAddress.find({
          where: { etadEntityId: id },
          relations: ['etadAddr', 'etadAddr.addrCity', 'etadAdty'],
        });

        if (addressData) {
          return { success: true, result: addressData };
        } else {
          return { success: true, result: `Address Empty` };
        }
      } else {
        return { success: false, error: `User not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(id: any, fields: any) {
    try {
      const dataAddress = generateDataAddress(fields);

      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: id },
      });

      if (!userData) {
        return { success: false, error: 'User not found!' };
      }

      const addressResult = await this.serviceAddress.save(dataAddress);

      const dataUserAddress = {
        etadEntityId: id,
        etadAddrId: addressResult.addrId,
        etadAdtyId: fields.etadAdtyId,
        etadModifiedDate: new Date(),
      };

      const userAddressResult = await this.serviceUserAddress.save(
        dataUserAddress,
      );

      return { success: true, result: userAddressResult };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'An error occurred while processing the request.',
      };
    }
  }

  public async edit(options: UsersOptions, fields: any) {
    try {
      const dataAddress = generateDataAddress(fields);

      const userData = await this.serviceUsers.findOne({
        where: { userEntityId: options.userEntityId },
      });

      if (!userData) {
        return { success: false, error: 'User not found!' };
      }

      const addressCheck = await this.serviceAddress.findOne({
        where: { addrId: options.id },
      });

      if (!addressCheck) {
        return { success: false, error: 'Address Not Found' };
      }

      await this.serviceAddress.update(options.id, { ...dataAddress });

      const dataUserAddress = {
        etadAdtyId: fields.etadAdtyId,
        etadModifiedDate: new Date(),
      };

      await this.serviceUserAddress.update(options.id, {
        ...dataUserAddress,
      });

      const userAddressResult = await this.serviceUserAddress.find({
        where: { etadAddrId: options.id },
        relations: ['etadAddr', 'etadAdty'],
      });

      return { success: true, result: userAddressResult };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'An error occurred while processing the request.',
      };
    }
  }

  public async delete(id: any) {
    try {
      const dataAddress = await this.serviceUserAddress.findOne({
        where: {
          etadAddrId: id,
        },
      });

      if (dataAddress) {
        const result = await this.serviceUserAddress.delete(id);
        return { success: true, result: result };
      } else {
        return { success: false, error: `Address not found!` };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
