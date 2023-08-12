import { Test, TestingModule } from '@nestjs/testing';
import { describe } from 'node:test';
import { BusinessEntityService } from './business_entity.services';

describe('BusinessEntityService', () => {
  let service: BusinessEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessEntityService],
    }).compile();
    service = module.get<BusinessEntityService>(BusinessEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
