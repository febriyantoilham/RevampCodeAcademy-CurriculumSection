import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { Employee } from 'output/entities/Employee';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { In, Like, Repository } from 'typeorm';

import * as fs from 'fs';
import * as path from 'path';
import { Status } from 'output/entities/Status';

@Injectable()
export class InstructorProgramsService {
  constructor(
    @InjectRepository(ProgramEntity)
    private serviceProgramEntity: Repository<ProgramEntity>,
    @InjectRepository(Employee)
    private serviceEmployee: Repository<Employee>,
    @InjectRepository(Batch)
    private serviceBatch: Repository<Batch>,
  ) {}

  public async getInstructor() {
    const instructorList = await this.serviceEmployee.find({
      relations: { empEntity: true },
      where: { empEntity: { userCurrentRole: In([4]) } },
      select: {
        empEntityId: true,
        empEntity: {
          userEntityId: true,
          userFirstName: true,
          userLastName: true,
        },
      },
      order: {},
    });

    return instructorList;
  }

  public async getProgram() {
    const program = await this.serviceProgramEntity.find({
      relations: { progCreatedBy: { empEntity: true } },
      select: {
        progEntityId: true,
        progTitle: true,
        progLearningType: true,
        progCreatedBy: {
          empEntityId: true,
          empEntity: {
            userFirstName: true,
            userLastName: true,
          },
        },
      },
      order: {
        progEntityId: 'DESC',
      },
    });

    return program;
  }

  public async getAll(options: BootcampOptions) {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceBatch.count();
    let name = '';
    let tech = '';

    try {
      if (options.searchValue || options.status) {
        const checkSearchValue = await this.serviceBatch.find({
          where: { batchName: Like(`%${options.searchValue}%`) },
        });

        if (checkSearchValue.length === 0) {
          tech = options.searchValue;
        } else {
          name = options.searchValue;
        }

        const batch = await this.serviceBatch.find({
          relations: {
            batchEntity: { progCreatedBy: { empEntity: true } },
            batchTrainees: { batrTraineeEntity: true },
          },
          select: {
            batchEntity: {
              progEntityId: true,
              progTitle: true,
              progHeadline: true,
              progType: true,
              progLearningType: true,
              progImage: true,
              progCreatedBy: {
                empEntityId: true,
                empEntity: {
                  userFirstName: true,
                  userLastName: true,
                  userPhoto: true,
                },
              },
            },
          },
          take: options.limit,
          skip: skippedItems,
          where: [
            {
              batchName: Like(`%${name}%`),
              batchEntity: {
                progTitle: Like(`%${tech}%`),
              },
              batchStatus: Like(`%${options.status}%`),
            },
          ],
          order: {
            batchId: 'DESC',
          },
        });
        return {
          success: true,
          data: {
            totalCount,
            page: options.page,
            limit: options.limit,
            data: batch,
          },
        };
      } else {
        const batch = await this.serviceBatch.find({
          relations: {
            batchEntity: { progCreatedBy: { empEntity: true } },
            batchTrainees: { batrTraineeEntity: true },
          },
          take: options.limit,
          skip: skippedItems,
          order: {
            batchId: 'DESC',
          },
        });
        return {
          success: true,
          data: {
            totalCount,
            page: options.page,
            limit: options.limit,
            data: batch,
          },
        };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async create(fields: any) {
    const batchData = {
      batchEntityId: fields.batchEntityId,
      batchName: fields.batchName,
      batchDescription: null,
      batchStartDate: fields.batchStartDate,
      batchEndDate: fields.batchEndDate,
      batchReason: null,
      batchType: fields.batchType, // From program.progLearningType
      batchModifiedDate: new Date(),
      batchStatus: 'Open',
      batchPicId: fields.batchPicId, // From user.userEntityId
    };

    const batchTraineeData = {};
    const instructorsData = {};

    try {
      if (!fields.batchPicId) {
        return { success: false, error: 'Please insert batch PIC id' };
      }

      // Get Curriculum Program Data
      const program = await this.serviceProgramEntity.findOne({
        where: { progEntityId: batchData.batchEntityId },
      });

      if (!program) {
        console.log(`Program with id: ${batchData.batchEntityId} not found!`);
        return { success: false, error: 'Program not found!' };
      }

      // Save Batch
      const result = await this.serviceBatch.save({ ...batchData });

      // Get New Batch Data
      const newBatch = await this.serviceBatch.findOne({
        where: { batchId: result.batchId },
      });

      console.log(`Result: ${JSON.stringify(newBatch)}`);
      return newBatch;
    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }
  }

  public async edit(options: BootcampOptions, fields: any) {
    const batchData = {
      batchName: fields.batchName,
      batchDescription: null,
      batchStartDate: fields.batchStartDate,
      batchEndDate: fields.batchEndDate,
      batchReason: null,
      batchType: fields.batchType, // From program.progLearningType
      batchModifiedDate: new Date(),
      batchStatus: fields.batchStatus,
      batchPicId: fields.batchPicId, // From user.userEntityId
    };

    const batchTraineeData = {};
    const instructorsData = {};

    try {
      if (!fields.batchPicId) {
        return { success: false, error: 'Please insert batch PIC id' };
      }

      // Get Curriculum Program Data
      const checkBatch = await this.serviceBatch.findOne({
        where: { batchId: options.id, batchEntityId: options.progEntityId },
      });

      if (!checkBatch) {
        console.log(`Batch not found!`);
        return { success: false, error: 'Batch not found!' };
      }

      // Save Batch
      await this.serviceBatch.update(
        { batchId: options.id, batchEntityId: options.progEntityId },
        { ...batchData },
      );

      // Get New Batch Data
      const newBatch = await this.serviceBatch.findOne({
        where: { batchId: options.id, batchEntityId: options.progEntityId },
      });

      console.log(`Update Result: ${JSON.stringify(newBatch)}`);
      return newBatch;
    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }
  }

  public async delete(options: BootcampOptions) {
    try {
      const checkBatch = await this.serviceBatch.findOne({
        where: {
          batchEntityId: options.progEntityId,
          batchId: options.id,
        },
      });

      if (!checkBatch) {
        return { success: false, error: `Batch data not found!` };
      }

      if (checkBatch.batchPicId === null) {
        return { success: false, error: `Pic Id is null!` };
      }

      const result = await this.serviceBatch.remove(checkBatch);

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
