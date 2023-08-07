import { Test, TestingModule } from '@nestjs/testing';
import { SectionDetailService } from './sectiondetail.services';

describe('SectionDetailService', () => {
  let service: SectionDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionDetailService],
    }).compile();
    service = module.get<SectionDetailService>(SectionDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
