import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { Employee } from 'output/entities/Employee';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { Like, Repository } from 'typeorm';

import * as fs from 'fs';
import * as path from 'path';
import { Status } from 'output/entities/Status';
import { InstructorPrograms } from 'output/entities/InstructorPrograms';
import { Users } from 'output/entities/Users';
import { BatchTrainee } from 'output/entities/BatchTrainee';
import { UsersRoles } from 'output/entities/UsersRoles';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(ProgramEntity)
    private serviceProgramEntity: Repository<ProgramEntity>,
    @InjectRepository(Employee)
    private serviceEmployee: Repository<Employee>,
    @InjectRepository(Batch)
    private serviceBatch: Repository<Batch>,
    @InjectRepository(InstructorPrograms)
    private serviceInstructorPrograms: Repository<InstructorPrograms>,
    @InjectRepository(BatchTrainee)
    private serviceBatchTrainee: Repository<BatchTrainee>,
    @InjectRepository(Status)
    private serviceStatus: Repository<Status>,
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
    @InjectRepository(UsersRoles)
    private serviceUsersRoles: Repository<UsersRoles>,
  ) {}

  public async getImg(imageName: any, res: any) {
    const defaultImageName = 'userDefault.png';
    const imagePath = path.join(process.cwd(), 'uploads', imageName);
    try {
      const image = fs.readFileSync(imagePath);
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(image);
    } catch (error) {
      // If the requested image is not found, serve the default image instead
      const defaultImagePath = path.join(
        process.cwd(),
        'uploads',
        defaultImageName,
      );

      try {
        const defaultImage = fs.readFileSync(defaultImagePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(defaultImage);
      } catch (defaultError) {
        // If the default image is also not found, return a 404 response
        res.status(404).end();
      }
    }
  }

  public async getStatus() {
    const statusList = await this.serviceStatus.find({
      select: { status: true },
      where: { statusModule: { moduleName: 'Bootcamp' } },
    });

    return statusList;
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

  public async getCandidate() {
    const program = await this.serviceUsers.find({
      where: { userCurrentRole: 1 },
      relations: { usersEducations: true },
      select: {
        userEntityId: true,
        userFirstName: true,
        userLastName: true,
        userModifiedDate: true,
        userPhoto: true,
      },
      order: { userEntityId: 'ASC' },
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
            instructorPrograms: true,
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
            batchTrainees: true,
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
            instructorPrograms: true,
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
            batchTrainees: {
              batrId: true,
              batrTraineeEntity: { userEntityId: true, userPhoto: true },
            },
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

  public async getByProgId(options: BootcampOptions) {
    try {
      const batch = await this.serviceBatch.find({
        where: { batchEntityId: options.progEntityId },
        relations: {
          batchEntity: { progCreatedBy: { empEntity: true } },
          batchTrainees: { batrTraineeEntity: true },
          instructorPrograms: true,
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
      });
      return { success: true, data: batch };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async getByBatchId(id: number) {
    try {
      const result = await this.serviceBatch.findOne({
        where: { batchId: id },
        relations: {
          batchEntity: { progCreatedBy: { empEntity: true } },
          batchTrainees: { batrTraineeEntity: true },
          instructorPrograms: true,
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
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /* Get new batchId */
  public async resetBatchId() {
    const sequenceName = 'bootcamp.batch_batch_id_seq';

    const query = `
      SELECT SETVAL('${sequenceName}', MAX(batch_id))
      FROM bootcamp.batch;
    `;

    const result = await this.serviceBatch.query(query);

    // const newId = parseInt(currVal[0].setval) + 1;

    return result;
  }

  /* Create */
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

    const batchTraineeData = fields.batchTraineeData;

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

      if (!result) {
        return { success: false, error: 'Failed!' };
      }

      const instructorsData = [
        {
          batchId: result.batchId,
          inproEntityId: fields.batchEntityId,
          inproEmpEntityId: fields.inproEmpEntityId,
          inproModifiedDate: new Date(),
        },
      ];

      const resultInstructor = await this.serviceInstructorPrograms.save(
        instructorsData,
      );

      for (const trainee of batchTraineeData) {
        await this.serviceBatchTrainee.save({
          batrTraineeEntityId: trainee,
          batrBatchId: result.batchId,
        });

        await this.serviceUsersRoles.save({
          usroEntityId: trainee,
          usroRoleId: 9,
        });

        await this.serviceUsers.update(trainee, { userCurrentRole: 9 });
      }

      // Get New Batch Data
      const newBatch = this.getByBatchId(result.batchId);

      console.log(`Result: ${JSON.stringify(newBatch)}`);
      return newBatch;
    } catch (error) {
      // Reset Batch Id if not used because some error
      await this.resetBatchId();
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
      // Reset Batch Id if not used because some error
      await this.resetBatchId();
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

      // Reset Batch Id if not used because some error
      await this.resetBatchId();

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async bulkDelete(fields: any) {
    try {
      console.log(JSON.stringify(fields));

      for (const id of fields) {
        const batchData = await this.serviceBatch.findOne({
          where: { batchId: id },
        });

        if (!batchData) {
          return {
            success: false,
            error: `Batch id ${batchData.batchId} not found!`,
          };
        }

        if (batchData.batchPicId === null) {
          return {
            success: false,
            error: `Pic Id in batch id ${batchData.batchId} is null!`,
          };
        }

        const instructorData = await this.serviceInstructorPrograms.find({
          where: { batchId: batchData.batchId },
        });

        if (instructorData) {
          await this.serviceInstructorPrograms.remove(instructorData);
        }

        await this.serviceBatchTrainee.delete({
          batrBatchId: batchData.batchId,
        });

        await this.serviceBatch.remove(batchData);
      }
      await this.resetBatchId();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
