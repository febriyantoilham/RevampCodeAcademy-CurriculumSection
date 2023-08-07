import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramEntityDescription } from 'output/entities/ProgramEntityDescription';
import { Sections } from 'output/entities/Sections';
import { SectionDetail } from 'output/entities/SectionDetail';
import { SectionDetailMaterial } from 'output/entities/SectionDetailMaterial';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMulter } from 'src/multer/multer';
import { ProgramEntityService } from 'src/curriculum/program_entity/program_entity.services';
import { ProgramEntityController } from 'src/curriculum/program_entity/program_entity.controller';
import { SectionService } from 'src/curriculum/section/section.services';
import { SectionController } from 'src/curriculum/section/section.controller';
import { SectionDetailService } from 'src/curriculum/section_detail/sectionDetail.services';
import { SectionDetailController } from 'src/curriculum/section_detail/sectiondetail.controller';
import { Category } from 'output/entities/Category';
import { Employee } from 'output/entities/Employee';
import { Users } from 'output/entities/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      ProgramEntityDescription,
      Sections,
      SectionDetail,
      SectionDetailMaterial,
      Category,
      Employee,
      Users,
    ]),
    MulterModule.register(UploadMulter.MulterOption()),
  ],
  providers: [ProgramEntityService, SectionService, SectionDetailService],
  controllers: [
    ProgramEntityController,
    SectionController,
    SectionDetailController,
  ],
})
export class GlobalModule {}
