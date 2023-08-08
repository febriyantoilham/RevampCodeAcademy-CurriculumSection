import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
  public async findAll(
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

  public async search(
    options: PaginationOptions,
  ): Promise<ProgramEntityInterface> {
    const skippedItems = (options.page - 1) * options.limit;
    let totalCount = await this.serviceProgEntity.count();
    if (options.name && options.status) {
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
            progTitle: Like(`%${options.name}%`),
            progLearningType: Like(`%${options.status}%`),
          },
        ],
        order: {
          progEntityId: 'DESC', // Sort by progTitle field in ascending order. Use 'DESC' for descending.
        },
      });
      totalCount = await this.serviceProgEntity.count({
        where: [
          {
            progTitle: Like(`%${options.name}%`),
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
  }

  /* 
    Create data Program Entity
    Include table:
      program_entity,
      program_entity_description,
  */
  public async create(file: any, fields: any) {
    try {
      console.log(`Payload: ${JSON.stringify(fields)}`);
      // Insert ke Table program_entity
      const progEnt = await this.serviceProgEntity.save({
        progHeadline: fields.progHeadline,
        progTitle: fields.progTitle,
        progType: fields.progType,
        progLearningType: fields.progLearningType,
        progRating: fields.progRating,
        progTotalTrainee: fields.progTotalTrainee,
        progModifiedDate: new Date(),
        progImage: file.originalname,
        progBestSeller: fields.progBestSeller,
        progPrice: fields.progPrice,
        progLanguage: fields.progLanguage,
        progDuration: fields.progDuration,
        progDurationType: fields.progDurationType,
        progTagSkill: fields.progTagSkill,
        progCityId: fields.progCityId,
        progCateId: fields.progCateId,
        progCreatedById: fields.progCreatedById, // belum di ada function cek employee instructor apa bukan
        progStatus: fields.progStatus,
      });

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

  public async getImage(imageName: any, res: any) {
    const imagePath = path.join(process.cwd(), 'uploads', imageName);
    try {
      const image = fs.readFileSync(imagePath);
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(image);
    } catch (error) {
      res.status(404).end();
    }
  }

  public async update(file: any, id: any, fields: any) {
    try {
      // console.log(`fields: ${JSON.stringify(fields)}`);
      // console.log(`id: ${JSON.stringify(id)}`);
      // console.log(`file: ${JSON.stringify(file)}`);

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
        progCreatedById: fields.progCreatedById, // belum di ada function cek employee instructor apa bukan
        progStatus: fields.progStatus,
      };

      await this.serviceProgEntity.update(
        id,
        file ? { ...updateData, progImage: file.originalname } : updateData,
      );

      // if (fields.predItemLearning || fields.predDescription) {
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
      // }

      const result = await this.serviceProgEntity.findOne({
        where: { progEntityId: id },
        relations: ['programEntityDescription'],
      });

      return result;
    } catch (error) {
      return error.message;
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

  public async getAllCategory() {
    try {
      const category = await this.serviceCategoryProgram.find({});
      const employee = await this.serviceProgramInstructor.find({});
      const instructor = [];
      for (const emp of employee) {
        const user = await this.serviceUsers.find({
          where: { userEntityId: emp.empEntityId },
          relations: ['employee'],
        });
        instructor.push(...user);
      }

      return { category, instructor };
    } catch (error) {
      throw error.message;
    }
  }

  public async getAllInstructor() {
    try {
      const result = await this.serviceProgramInstructor.find({});
      return result;
    } catch (error) {
      throw error.message;
    }
  }
}
