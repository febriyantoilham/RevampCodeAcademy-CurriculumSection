import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramEntityDescription } from 'output/entities/ProgramEntityDescription';
import { Sections } from 'output/entities/Sections';
import { SectionDetail } from 'output/entities/SectionDetail';
import { SectionDetailMaterial } from 'output/entities/SectionDetailMaterial';
import * as fs from 'fs';
import * as path from 'path';

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

  public async create(file: any, fields: any) {
    try {
      // Insert ke Table Sections Detail
      const section_item = await this.serviceSec.findOne({
        where: {
          sectId: fields.sectId,
          sectProgEntityId: fields.sectProgEntityId,
        },
      });

      if (section_item) {
        const secd = await this.serviceSecDet.save({
          secdSectid: section_item.sectId,
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
          sectId: section_item.sectId,
          sectProgEntityId: section_item.sectProgEntityId,
        },
        relations: ['sectionDetails', 'sectionDetails.sectionDetailMaterials'],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async findAll(secdSectid: number) {
    try {
      const subsection = await this.serviceSecDet.findOne({
        where: { secdSectid: secdSectid },
        relations: ['sectionDetailMaterials'],
      });

      if (subsection) {
        return { subsection };
      } else {
        return { success: false, error: 'Record not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async findOne(secdId: number) {
    try {
      const subsection = await this.serviceSecDet.findOne({
        where: { secdId: secdId },
        relations: ['sectionDetailMaterials'],
      });

      if (subsection) {
        return { subsection };
      } else {
        return { success: false, error: 'Record not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async update(secdId: number, file: any, fields: any) {
    const subSectionValue = {
      secdTitle: fields.secdTitle,
      secdPreview: 1,
      secdMinute: fields.secdMinute,
    };

    const subSectionMaterialVal = {
      sedmFiletype: fields.sedmFiletype,
    };

    try {
      const subsection = await this.serviceSecDet.findOne({
        where: { secdId: secdId },
        relations: ['sectionDetailMaterials'],
      });

      if (subsection) {
        const materials = await this.serviceSecDetMat.find({
          where: { sedmSecdid: subsection.secdId },
        });
        try {
          for (const material of materials) {
            await this.serviceSecDetMat.update(
              material.sedmId,
              file
                ? { ...subSectionMaterialVal, sedmFilename: file.originalname }
                : subSectionMaterialVal,
            );
          }
        } catch (error) {
          return { success: false, error: error.message };
        }

        await this.serviceSecDet.update(subsection.secdId, subSectionValue);

        const result = await this.serviceSecDet.findOne({
          where: { secdId: secdId },
          relations: ['sectionDetailMaterials'],
        });
        return { result };
      } else {
        return { success: false, error: 'Record not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async deleteOne(secdId: number) {
    try {
      const subsection = await this.serviceSecDet.findOne({
        where: { secdId: secdId },
        relations: ['sectionDetailMaterials'],
      });

      if (subsection) {
        const material = await this.serviceSecDetMat.find({
          where: { sedmSecdid: subsection.secdId },
        });
        try {
          await this.serviceSecDetMat.remove(material);
        } catch (error) {
          return { success: false, error: error.message };
        }
        await this.serviceSecDet.remove(subsection);
        return { success: true };
      } else {
        return { success: false, error: 'Record not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async deleteBulk(fields: any) {
    for (const secdId of fields) {
      try {
        const subsection = await this.serviceSecDet.findOne({
          where: { secdId: secdId },
          relations: ['sectionDetailMaterials'],
        });
        if (subsection) {
          const material = await this.serviceSecDetMat.find({
            where: { sedmSecdid: subsection.secdId },
          });
          try {
            await this.serviceSecDetMat.remove(material);
          } catch (error) {
            return { success: false, error: error.message };
          }
          await this.serviceSecDet.remove(subsection);
        } else {
          return { success: false, error: 'Record not found' };
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    return { success: true };
  }

  public async getFile(fileName: any, res: any) {
    const filePath = path.join(process.cwd(), 'uploads', fileName);
    try {
      const file = fs.readFileSync(filePath);
      const fileExtension = path.extname(fileName).toLowerCase();
      let contentType = `application/octet-stream`;

      if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
        contentType = 'image/jpeg';
      } else if (fileExtension === '.png') {
        contentType = 'image/png';
      } else if (fileExtension === '.mp4') {
        contentType = 'video/mp4';
      } else if (fileExtension === '.avi') {
        contentType = 'video/avi';
      } else if (fileExtension === '.mov') {
        contentType = 'video/mov';
      }

      res.setHeader('Content-Type', contentType);
      res.end(file);
    } catch (error) {
      res.status(404).end();
    }
  }
}
