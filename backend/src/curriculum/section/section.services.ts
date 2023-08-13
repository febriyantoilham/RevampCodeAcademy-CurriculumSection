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
  public async create(sectProgEntityId: number, fields: any) {
    try {
      // Insert ke Table Sections
      const section_item = await this.serviceSec.save({
        sectProgEntityId: sectProgEntityId,
        sectTitle: fields.sectTitle,
        sectDescription: fields.sectDescription,
      });

      const result = await this.serviceSec.findOne({
        where: {
          sectId: section_item.sectId,
          sectProgEntityId: sectProgEntityId,
        },
        relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async findAll(sectProgEntityId: number) {
    const section = await this.serviceSec.find({
      where: { sectProgEntityId: sectProgEntityId },
      relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
    });

    return section;
  }

  public async findOne(sectId: number) {
    const section = await this.serviceSec.find({
      where: { sectId: sectId },
      relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
    });

    return section;
  }

  public async update(sectId: number, sectProgEntityId: number, fields: any) {
    try {
      await this.serviceSec.update(
        { sectId: sectId, sectProgEntityId: sectProgEntityId },
        {
          sectTitle: fields.sectTitle,
          sectDescription: fields.sectDescription,
        },
      );

      const section = await this.serviceSec.findOne({
        where: { sectId: sectId, sectProgEntityId: sectProgEntityId },
      });
      return section;
    } catch (error) {
      return error.message;
    }
  }

  public async Delete(sectId: number, sectProgEntityId: number) {
    try {
      const data = await this.serviceSec.findOne({
        where: { sectId: sectId, sectProgEntityId: sectProgEntityId },
      });
      if (data) {
        await this.serviceSec.remove(data);
        return { success: true };
      } else {
        return { success: false, error: 'Record not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
