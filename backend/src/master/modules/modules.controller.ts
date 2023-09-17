import { Controller, Get, Param } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('master/modules')
export class ModulesController {
  constructor(private service: ModulesService) {}

  @Get()
  public async getAllModules() {
    return this.service.getAllModules();
  }

  @Get(':moduleName')
  public async getModules(@Param('moduleName') moduleName: string) {
    return this.service.getModules(moduleName);
  }
}
