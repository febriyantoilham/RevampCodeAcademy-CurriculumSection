import { Test, TestingModule } from '@nestjs/testing';
import { SectionDetailController } from './sectiondetail.controller';

describe('SectionDetailController', () => {
  let controller: SectionDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionDetailController],
    }).compile();

    controller = module.get<SectionDetailController>(SectionDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
