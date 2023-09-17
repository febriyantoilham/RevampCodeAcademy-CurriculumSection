import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from 'output/entities/Modules';
import { Status } from 'output/entities/Status';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusService: Repository<Status>,
    @InjectRepository(Modules)
    private modulesService: Repository<Modules>,
  ) {}

  public async getAllStatus() {
    try {
      const result = await this.statusService.find({
        order: { statusModifiedDate: 'ASC' },
      });

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(fields: any) {
    try {
      // Check module
      const checkModules = await this.modulesService.findOne({
        where: { moduleName: fields.moduleName },
      });

      if (!checkModules) {
        return {
          status: false,
          error: `Module ${fields.moduleName} not exist`,
        };
      }

      // Check status
      const checkStatus = await this.statusService.findOne({
        where: { status: fields.status },
      });

      if (checkStatus) {
        return {
          success: false,
          error: `${fields.status} already exist for module ${checkStatus.moduleName}`,
        };
      }

      // Save Status
      const result = await this.statusService.save({
        status: fields.status,
        statusModifiedDate: new Date(),
        moduleName: fields.moduleName,
      });

      return { success: true, result: result };
    } catch (error) {
      console.error('Error in create:', error);
      return { success: false, error: error.message };
    }
  }

  public async edit(options: { status: string }, fields: any) {
    try {
      if (!options.status) {
        return {
          success: false,
          error: 'Please insert parameter status!',
        };
      }

      // Check old status
      const checkOldStatus = await this.statusService.findOne({
        where: { status: options.status },
      });

      if (!checkOldStatus) {
        return {
          success: false,
          error: 'The specified item does not exist.',
        };
      }

      // Check module
      const checkModules = await this.modulesService.findOne({
        where: { moduleName: fields.moduleName },
      });

      if (!checkModules) {
        return {
          success: false,
          error: `Module ${fields.moduleName} does not exist.`,
        };
      }

      if (options.status !== fields.status) {
        // Check new status
        const checkNewStatus = await this.statusService.findOne({
          where: {
            status: fields.status,
          },
        });

        if (checkNewStatus) {
          return {
            success: false,
            error: `Status ${fields.status} already exists for module ${checkNewStatus.moduleName}`,
          };
        }
      }

      // Update Status
      const result = await this.statusService.update(options.status, {
        status: fields.status,
        statusModifiedDate: new Date(),
        moduleName: fields.moduleName,
      });

      if (result.affected !== 0) {
        const updatedStatus = await this.statusService.findOne({
          where: { status: fields.status },
        });
        return {
          success: true,
          result: updatedStatus,
        };
      } else {
        return {
          success: false,
          error: result,
        };
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in edit:', error);
      return {
        success: false,
        error: 'An error occurred while processing your request.',
      };
    }
  }

  public async delete(options: { status: string }) {
    try {
      if (!options.status) {
        return {
          success: false,
          error: 'Please insert parameter status!',
        };
      }

      // Check status
      const checkStatus = await this.statusService.findOne({
        where: { status: options.status },
      });

      if (!checkStatus) {
        return {
          success: false,
          error: 'The specified item does not exist.',
        };
      }

      // Delete
      const result = await this.statusService.delete({
        status: options.status,
      });

      if (result.affected !== 0) {
        return {
          success: true,
          result: `${options.status} successfully deleted.`,
        };
      } else {
        return {
          success: false,
          result: `Delete unsuccesfully`,
        };
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in delete:', error);
      return {
        success: false,
        error: 'An error occurred while processing your request.',
      };
    }
  }
}
