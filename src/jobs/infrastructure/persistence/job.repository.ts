import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Job } from '../../domain/job';

export abstract class JobRepository {
  abstract create(data: Job): Promise<Job>;

  abstract findById(id: Job['id']): Promise<NullableType<Job>>;

  abstract findManyWithPagination({
    paginationOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    filterOptions?: {
      location?: string;
      employmentType?: string;
      workMode?: string;
      isActive?: boolean;
      employerId?: number;
      search?: string;
    };
  }): Promise<Job[]>;

  abstract update(id: Job['id'], payload: Partial<Job>): Promise<Job>;

  abstract remove(id: Job['id']): Promise<void>;
}
