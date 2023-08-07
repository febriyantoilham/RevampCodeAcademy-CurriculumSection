import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramEntityDescription } from 'output/entities/ProgramEntityDescription';
import { Sections } from 'output/entities/Sections';
import { SectionDetail } from 'output/entities/SectionDetail';
import { SectionDetailMaterial } from 'output/entities/SectionDetailMaterial';

@Injectable()
export class SectionDetailService {
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
  public async create(
    file: any,
    sectId: number,
    sectProgEntityId: number,
    fields: any,
  ) {
    try {
      // Insert ke Table Sections Detail
      const section_item = await this.serviceSec.findOne({
        where: {
          sectId: sectId,
          sectProgEntityId: sectProgEntityId,
        },
      });

      if (section_item) {
        const secd = await this.serviceSecDet.save({
          secdSectid: sectId,
          secdTitle: fields.secdTitle,
          secdPreview: 1,
          secdMinute: fields.secdMinute,
        });

        await this.serviceSecDetMat.save({
          sedmSecdid: secd.secdId,
          sedmFiletype: fields.sedmFiletype,
          sedmFilename: file.originalname,
        });
      } else {
        return { success: false, error: 'Record not found' };
      }

      const result = await this.serviceSec.findOne({
        where: {
          sectId: sectId,
          sectProgEntityId: sectProgEntityId,
        },
        relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async findOne(sectId: number, sectProgEntityId: number) {
    const section = await this.serviceSec.findOne({
      where: { sectId: sectId, sectProgEntityId: sectProgEntityId },
      relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
    });

    return section;
  }
}
