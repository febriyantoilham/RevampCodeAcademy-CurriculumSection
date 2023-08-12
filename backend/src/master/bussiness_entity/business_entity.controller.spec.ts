import { Test, TestingModule } from '@nestjs/testing';
import { BusinessEntityController } from './business_entity.controller';

describe('BusinessEntityController', () => {
  let controller: BusinessEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessEntityController],
    }).compile();
    controller = module.get<BusinessEntityController>(BusinessEntityController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
