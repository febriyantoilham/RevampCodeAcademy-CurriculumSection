import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramEntityDescription } from 'output/entities/ProgramEntityDescription';
import { Sections } from 'output/entities/Sections';
import { SectionDetail } from 'output/entities/SectionDetail';
import { SectionDetailMaterial } from 'output/entities/SectionDetailMaterial';

@Injectable()
export class SectionService {
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
  ) {}

  /*
    Create data Program Entity
    Include table:
      sections,
  */
  public async create(progEntityId: number, fields: any) {
    try {
      // Check if the program entity exists
      const programCheck = await this.serviceProgEntity.findOne({
        where: { progEntityId: progEntityId },
      });

      if (!programCheck) {
        // Return an error with a descriptive message
        return {
          success: false,
          error: `Program with ID ${progEntityId} not found!`,
        };
      }

      // Insert into the Sections table
      const sectionItem = await this.serviceSec.save({
        sectProgEntityId: progEntityId,
        sectTitle: fields.sectTitle,
        sectDescription: fields.sectDescription,
      });

      const result = await this.serviceSec.findOne({
        where: {
          sectId: sectionItem.sectId,
          sectProgEntityId: progEntityId,
        },
      });

      return { success: true, result: result };
    } catch (error) {
      // Handle errors and return a detailed error message
      console.error(`Error creating section: ${error.message}`);
      return {
        success: false,
        error: `Error creating section: ${error.message}`,
      };
    }
  }

  public async findAll(progEntityId: number) {
    try {
      // Check if the program entity exists
      const programCheck = await this.serviceProgEntity.findOne({
        where: { progEntityId: progEntityId },
      });

      if (!programCheck) {
        // Return an error with a descriptive message
        console.error(`Program with ID ${progEntityId} not found!`);
        return {
          success: false,
          error: `Program with ID ${progEntityId} not found!`,
        };
      }

      const result = await this.serviceSec.find({
        where: { sectProgEntityId: progEntityId },
        relations: {
          sectionDetails: { sectionDetailMaterials: true },
        },
        order: { sectId: 'ASC' },
      });

      return result;
    } catch (error) {
      // Handle errors and return a detailed error message
      console.error(`Error finding section: ${error.message}`);
      return {
        success: false,
        error: `Error finding section: ${error.message}`,
      };
    }
  }

  public async findOne(sectId: number) {
    try {
      // Get Section
      const section = await this.serviceSec.findOne({
        where: { sectId: sectId },
        relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
      });

      if (!section) {
        return {
          success: false,
          error: `Section with ID ${sectId} not found!`,
        };
      }

      return section;
    } catch (error) {
      // Handle errors and return a detailed error message
      console.error(`Error finding section: ${error.message}`);
      return {
        success: false,
        error: `Error finding section: ${error.message}`,
      };
    }
  }

  public async update(sectId: number, sectProgEntityId: number, fields: any) {
    try {
      // Check Program
      const programCheck = await this.serviceProgEntity.findOne({
        where: { progEntityId: sectProgEntityId },
      });

      if (!programCheck) {
        return {
          success: false,
          error: `Program with ID ${sectProgEntityId} not found!`,
        };
      }

      // Check Section
      const sectionCheck = await this.serviceSec.findOne({
        where: { sectId: sectId, sectProgEntityId: sectProgEntityId },
      });

      if (!sectionCheck) {
        return {
          success: false,
          error: `Section with ID ${sectId} not found!`,
        };
      }

      // Update Section
      await this.serviceSec.update(
        { sectId: sectId, sectProgEntityId: sectProgEntityId },
        {
          sectTitle: fields.sectTitle,
          sectDescription: fields.sectDescription,
        },
      );

      // Get Updated Section
      const section = await this.serviceSec.findOne({
        where: { sectId: sectId, sectProgEntityId: sectProgEntityId },
      });
      return section;
    } catch (error) {
      // Handle errors and return a detailed error message
      console.error(`Error updating section: ${error.message}`);
      return {
        success: false,
        error: `Error updating section: ${error.message}`,
      };
    }
  }

  public async Delete(sectId: number, sectProgEntityId: number) {
    try {
      // Check Program
      const programCheck = await this.serviceProgEntity.findOne({
        where: { progEntityId: sectProgEntityId },
      });

      if (!programCheck) {
        return {
          success: false,
          error: `Program with ID ${sectProgEntityId} not found!`,
        };
      }

      // Check Section
      const section = await this.serviceSec.findOne({
        where: { sectId: sectId, sectProgEntityId: sectProgEntityId },
      });

      if (!section) {
        return {
          success: false,
          error: `Section with ID ${sectId} not found!`,
        };
      }

      // Check Section Details
      const sectionDetails = await this.serviceSecDet.find({
        where: { secdSectid: sectId },
      });

      // Delete Section Details if found
      if (sectionDetails.length > 0) {
        for (const sectionDetail of sectionDetails) {
          // Check Section Detail Materials
          const sectionDetailMaterials = await this.serviceSecDetMat.find({
            where: { sedmSecdid: sectionDetail.secdId },
          });

          // Delete if found
          if (sectionDetailMaterials.length > 0) {
            for (const sectionDetailMaterial of sectionDetailMaterials) {
              await this.serviceSecDetMat.delete({
                sedmId: sectionDetailMaterial.sedmId,
              });
            }
          }

          await this.serviceSecDet.delete({
            secdId: sectionDetail.secdId,
          });
        }
      }

      const result = await this.serviceSec.delete({
        sectId: sectId,
        sectProgEntityId: sectProgEntityId,
      });

      return result;
    } catch (error) {
      // Handle errors and return a detailed error message
      console.error(`Error deleting section: ${error.message}`);
      return {
        success: false,
        error: `Error deleting section: ${error.message}`,
      };
    }
  }
}
