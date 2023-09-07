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
import { BusinessEntityController } from 'src/users/bussiness_entity/business_entity.controller';
import { BusinessEntityService } from 'src/users/bussiness_entity/business_entity.services';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { UsersService } from 'src/users/users/users.service';
import { UsersController } from 'src/users/users/users.controller';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersPhones } from 'output/entities/UsersPhones';
import { UsersRoles } from 'output/entities/UsersRoles';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Roles } from 'output/entities/Roles';
import { LocalGuard } from 'src/users/auth/local/local.guard';
import { JwtGuard } from 'src/users/auth/jwt/jwt.guard';
import { UsersAddress } from 'output/entities/UsersAddress';
import { UserEmailsService } from 'src/users/userEmails/userEmails.service';
import { UserEmailsController } from 'src/users/userEmails/userEmails.controller';
import { UserPhonesService } from 'src/users/userPhones/userPhones.service';
import { UserPhonesController } from 'src/users/userPhones/userPhones.controller';
import { UserAddressService } from 'src/users/userAddress/userAddress.service';
import { Address } from 'output/entities/Address';
import { AddressType } from 'output/entities/AddressType';
import { UserAddressController } from 'src/users/userAddress/userAddress.controller';
import { AddressTypeService } from 'src/master/addressType/addressType.service';
import { AddressTypeController } from 'src/master/addressType/addressType.controller';
import { CityService } from 'src/master/city/city.service';
import { CityController } from 'src/master/city/city.controller';
import { City } from 'output/entities/City';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UserEducationService } from 'src/users/userEducation/userEducation.service';
import { UserEdicationController } from 'src/users/userEducation/userEducation.controller';
import { UsersExperiences } from 'output/entities/UsersExperiences';
import { UserExperiencesService } from 'src/users/userExperiences/userExperiences.service';
import { UserExperiencesController } from 'src/users/userExperiences/userExperiences.controller';
import { JobType } from 'output/entities/JobType';
import { JobTypeService } from 'src/master/jobType/jobType.service';
import { JobTypeController } from 'src/master/jobType/jobType.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      ProgramEntityDescription,
      Sections,
      SectionDetail,
      SectionDetailMaterial,
      Category,
      // Users
      BusinessEntity,
      Users,
      UsersEmail,
      UsersPhones,
      UsersRoles,
      UsersAddress,
      UsersEducation,
      UsersExperiences,
      Roles,
      // HR
      Employee,
      //Master
      Address,
      AddressType,
      City,
      JobType,
    ]),
    MulterModule.register(UploadMulter.MulterOption()),
    PassportModule,
    JwtModule.register({
      secret: 'admin',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [
    ProgramEntityService,
    SectionService,
    SectionDetailService,
    // Users
    BusinessEntityService,
    UsersService,
    UserEmailsService,
    UserPhonesService,
    UserAddressService,
    UserEducationService,
    UserExperiencesService,
    LocalGuard,
    JwtGuard,
    // Master
    AddressTypeService,
    CityService,
    JobTypeService,
  ],
  controllers: [
    ProgramEntityController,
    SectionController,
    SectionDetailController,
    // Users
    BusinessEntityController,
    UsersController,
    UserEmailsController,
    UserPhonesController,
    UserAddressController,
    UserEdicationController,
    UserExperiencesController,
    // Master
    AddressTypeController,
    CityController,
    JobTypeController,
  ],
  exports: [UsersService],
})
export class GlobalModule {}
