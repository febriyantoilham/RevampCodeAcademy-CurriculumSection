import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobType } from 'output/entities/JobType';
import { Repository } from 'typeorm';

@Injectable()
export class JobTypeService {
  constructor(
    @InjectRepository(JobType)
    private serviceJobType: Repository<JobType>,
  ) {}

  public async getJobType() {
    try {
      const result = await this.serviceJobType.find();

      return { success: true, result: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
