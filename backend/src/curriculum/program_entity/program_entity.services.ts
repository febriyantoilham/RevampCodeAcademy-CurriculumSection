import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramEntityDescription } from 'output/entities/ProgramEntityDescription';
import { Sections } from 'output/entities/Sections';
import { SectionDetail } from 'output/entities/SectionDetail';
import { SectionDetailMaterial } from 'output/entities/SectionDetailMaterial';
import { ProgramEntityInterface } from './program_entity.interface';
import { Category } from 'output/entities/Category';
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';

import * as fs from 'fs';
import * as path from 'path';

interface PaginationOptions {
  page: number;
  limit: number;
  searchValue: string;
  status: string;
}

@Injectable()
export class ProgramEntityService {
  constructor(
    @InjectRepository(ProgramEntity)
    private serviceProgEntity: Repository<ProgramEntity>,
    @InjectRepository(ProgramEntityDescription)
    private serviceProgEntDesc: Repository<ProgramEntityDescription>,
    @InjectRepository(Sections)
    private serviceSec: Repository<Sections>,
    @InjectRepository(SectionDetail)
    private serviceSecDet: Repository<SectionDetail>,
    @InjectRepository(SectionDetailMaterial)
    private serviceSecDetMat: Repository<SectionDetailMaterial>,
    @InjectRepository(Category)
    private serviceCategoryProgram: Repository<Category>,
    @InjectRepository(Employee)
    private serviceProgramInstructor: Repository<Employee>,
    @InjectRepository(Users)
    private serviceUsers: Repository<Users>,
  ) {}

  /* 
    Get all data Program Entity
  */
  public async getAll(
    options: PaginationOptions,
  ): Promise<ProgramEntityInterface> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceProgEntity.count();
    const program_entity = await this.serviceProgEntity.find({
      relations: [
        'programEntityDescription',
        'sections',
        'sections.sectionDetails',
        'sections.sectionDetails.sectionDetailMaterials',
      ],
      take: options.limit,
      skip: skippedItems,
      order: {
        progEntityId: 'DESC', // Sort by progTitle field in ascending order. Use 'DESC' for descending.
      },
    });
    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: program_entity,
    };
  }

  /* Search */
  public async search(
    options: PaginationOptions,
  ): Promise<ProgramEntityInterface> {
    const skippedItems = (options.page - 1) * options.limit;
    let totalCount = await this.serviceProgEntity.count();
    if (options.searchValue || options.status) {
      const program_entity = await this.serviceProgEntity.find({
        relations: [
          'programEntityDescription',
          'sections',
          'sections.sectionDetails',
          'sections.sectionDetails.sectionDetailMaterials',
        ],
        take: options.limit,
        skip: skippedItems,
        where: [
          {
            progTitle: ILike(`%${options.searchValue}%`),
            progLearningType: Like(`%${options.status}%`),
          },
        ],
        order: {
          progEntityId: 'DESC',
        },
      });
      totalCount = await this.serviceProgEntity.count({
        where: [
          {
            progTitle: Like(`%${options.searchValue}%`),
            progLearningType: Like(`%${options.status}%`),
          },
        ],
      });
      return {
        totalCount,
        page: options.page,
        limit: options.limit,
        data: program_entity,
      };
    } else {
      const program_entity = await this.serviceProgEntity.find({
        relations: [
          'programEntityDescription',
          'sections',
          'sections.sectionDetails',
          'sections.sectionDetails.sectionDetailMaterials',
        ],
        take: options.limit,
        skip: skippedItems,
        order: {
          progEntityId: 'DESC',
        },
      });
      return {
        totalCount,
        page: options.page,
        limit: options.limit,
        data: program_entity,
      };
    }
  }

  /* Get New progEntityId */
  public async getNewProgEntityId() {
    try {
      const sequenceName = 'curriculum.program_entity_prog_entity_id_seq';

      // Use parameterized query to prevent SQL injection
      const query = `
      SELECT SETVAL($1, COALESCE((SELECT MAX(prog_entity_id) FROM curriculum.program_entity), 0));
    `;

      // Execute the parameterized query
      const currVal = await this.serviceProgEntity.query(query, [sequenceName]);

      const newProgEntityId = parseInt(currVal[0].setval) + 1;

      console.log('New progEntityId:', newProgEntityId); // Added for debugging

      return { success: true, data: newProgEntityId };
    } catch (error) {
      console.error('Error:', error); // Added for debugging
      return { success: false, result: error.message };
    }
  }

  /* 
    Create data Program Entity
    Include table:
      program_entity,
      program_entity_description,
  */
  public async create(fields: any, file: any) {
    try {
      console.log(`Payload: ${JSON.stringify(fields)}`);
      // Insert ke Table program_entity

      const insertData = {
        progHeadline: fields.progHeadline,
        progTitle: fields.progTitle,
        progType: fields.progType,
        progLearningType: fields.progLearningType,
        progRating: fields.progRating,
        progTotalTrainee: fields.progTotalTrainee,
        progModifiedDate: new Date(),
        progBestSeller: fields.progBestSeller,
        progPrice: fields.progPrice,
        progLanguage: fields.progLanguage,
        progDuration: fields.progDuration,
        progDurationType: fields.progDurationType,
        progTagSkill: fields.progTagSkill,
        progCityId: fields.progCityId,
        progCateId: fields.progCateId,
        progCreatedById: fields.progCreatedById,
        progStatus: fields.progStatus,
      };

      const progEnt = await this.serviceProgEntity.save(
        file ? { ...insertData, progImage: file.originalname } : insertData,
      );

      // Insert ke Table program_entity_description
      await this.serviceProgEntDesc.save({
        predProgEntityId: progEnt.progEntityId,
        predItemLearning: { items: fields.predItemLearning },
        predDescription: { items: fields.predDescription },
      });

      const result = await this.serviceProgEntity.findOne({
        where: { progEntityId: progEnt.progEntityId },
        relations: ['programEntityDescription'],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async findOne(id: number) {
    const progEntity = await this.serviceProgEntity.findOne({
      where: { progEntityId: id },
      relations: [
        'programEntityDescription',
        'sections',
        'sections.sectionDetails',
        'sections.sectionDetails.sectionDetailMaterials',
      ],
    });
    return progEntity;
  }

  public async update(file: any, id: any, fields: any) {
    try {
      const updateData = {
        progHeadline: fields.progHeadline,
        progTitle: fields.progTitle,
        progType: fields.progType,
        progLearningType: fields.progLearningType,
        progRating: fields.progRating,
        progTotalTrainee: fields.progTotalTrainee,
        progBestSeller: fields.progBestSeller,
        progPrice: fields.progPrice,
        progLanguage: fields.progLanguage,
        progDuration: fields.progDuration,
        progDurationType: fields.progDurationType,
        progTagSkill: fields.progTagSkill,
        progCityId: fields.progCityId,
        progCateId: fields.progCateId,
        progCreatedById: fields.progCreatedById,
        progStatus: fields.progStatus,
      };

      await this.serviceProgEntity.update(
        id,
        file ? { ...updateData, progImage: file.originalname } : updateData,
      );

      const desc = await this.serviceProgEntDesc.findOne({
        where: { predProgEntityId: id },
      });

      if (desc !== null) {
        await this.serviceProgEntDesc.update(id, {
          predItemLearning: {
            items: fields.predItemLearning,
          },
          predDescription: {
            items: fields.predDescription,
          },
        });
      } else {
        await this.serviceProgEntDesc.save({
          predProgEntityId: id,
          predItemLearning: { items: fields.predItemLearning },
          predDescription: { items: fields.predDescription },
        });
      }

      const result = await this.serviceProgEntity.findOne({
        where: { progEntityId: id },
        relations: ['programEntityDescription'],
      });

      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async getImg(imageName: any, res: any) {
    const imagePath = path.join(process.cwd(), 'uploads', imageName);
    try {
      const image = fs.readFileSync(imagePath);
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(image);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async Delete(id: number) {
    try {
      const section = await this.serviceSec.find({
        where: { sectProgEntityId: id },
        relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
      });

      for (const item of section) {
        for (const itemDetail of item.sectionDetails) {
          const sectionMaterial = itemDetail.sectionDetailMaterials;
          for (const itemDetailMaterial of sectionMaterial) {
            await this.serviceSecDetMat.remove(itemDetailMaterial);
          }
          await this.serviceSecDet.remove(itemDetail);
        }
        await this.serviceSec.remove(item);
      }
      await this.serviceProgEntDesc.delete(id);
      await this.serviceProgEntity.delete(id);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async BulkDelete(fields: any) {
    try {
      let totalResult = 0;

      // Loop through the fields (program IDs)
      for (const id of fields) {
        // Check if the program exists
        const program = await this.serviceProgEntity.findOne({
          where: { progEntityId: id },
        });

        if (!program) {
          return { success: false, error: `Program with ID ${id} not found!` };
        }

        // Find program descriptions and delete if they exist
        const programDescriptions = await this.serviceProgEntDesc.findOne({
          where: { predProgEntityId: id },
        });

        if (programDescriptions) {
          await this.serviceProgEntDesc.delete({ predProgEntityId: id });
        }

        // Find sections associated with the program
        const sections = await this.serviceSec.find({
          where: { sectProgEntityId: id },
          relations: ['sectionDetails'],
        });

        for (const section of sections) {
          // Loop through section details
          for (const itemDetail of section.sectionDetails) {
            const sectDet = await this.serviceSecDet.find({
              where: { secdId: itemDetail.secdId },
              relations: ['sectionDetailMaterials'],
            });

            // Delete Section Detail Materials
            for (const itemMaterial of sectDet) {
              if (itemMaterial.sectionDetailMaterials) {
                await this.serviceSecDetMat.delete({
                  sedmSecdid: itemMaterial.secdId,
                });
              }
            }

            // Delete Section Details
            await this.serviceSecDet.delete({ secdId: itemDetail.secdId });
          }

          // Delete Sections
          await this.serviceSec.delete({ sectId: section.sectId });
        }

        // Delete Programs
        const result = await this.serviceProgEntity.delete({
          progEntityId: id,
        });

        if (result.affected === 1) {
          totalResult++;
        }
      }

      console.log(`${totalResult} Program(s) Successfully Deleted`);
      return {
        success: true,
        result: `${totalResult} Program(s) Successfully Deleted`,
      };
    } catch (error) {
      console.log(`error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  public async getCatAndEmp() {
    try {
      const call = [this.getAllCategory(), this.getAllInstructor()];

      const [category, instructor] = await Promise.all(call);

      return {
        category: category,
        instructor: instructor,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async getAllCategory() {
    try {
      const category = await this.serviceCategoryProgram.find({
        select: ['cateId', 'cateName'],
      });

      return category;
    } catch (error) {
      throw error.message;
    }
  }

  public async getAllInstructor() {
    try {
      const employee = await this.serviceProgramInstructor.find({});
      const instructor = [];
      for (const emp of employee) {
        const user = await this.serviceUsers.find({
          select: [
            'userEntityId',
            'userFirstName',
            'userLastName',
            'userPhoto',
            'userCurrentRole',
          ],
          where: { userEntityId: emp.empEntityId, userCurrentRole: 4 },
        });
        instructor.push(...user);
      }
      return instructor;
    } catch (error) {
      throw error.message;
    }
  }
}
