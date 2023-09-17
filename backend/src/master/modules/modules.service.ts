import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from 'output/entities/Modules';
import { Repository } from 'typeorm';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private modulesService: Repository<Modules>,
  ) {}

  public async getAllModules() {
    try {
      const result = await this.modulesService.find({});

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  public async getModules(moduleName: string) {
    try {
      const result = await this.modulesService.findOne({
        where: { moduleName: moduleName },
      });

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
