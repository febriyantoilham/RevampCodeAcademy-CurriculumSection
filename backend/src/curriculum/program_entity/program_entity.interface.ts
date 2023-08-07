import { ProgramEntity } from 'output/entities/ProgramEntity';

export class ProgramEntityInterface {
  data: ProgramEntity[];
  page: number;
  limit: number;
  totalCount: number;
}
