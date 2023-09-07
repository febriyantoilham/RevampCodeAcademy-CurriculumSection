import { Controller, Get } from '@nestjs/common';
import { JobTypeService } from './jobType.service';

@Controller('master/jobType')
export class JobTypeController {
  constructor(private Service: JobTypeService) {}

  @Get()
  public async getJobType() {
    return this.Service.getJobType();
  }
}
