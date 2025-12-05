import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { JobSeeker } from '../../domain/job-seeker';

export abstract class JobSeekerRepository {
  abstract create(data: JobSeeker): Promise<JobSeeker>;

  abstract findById(id: JobSeeker['id']): Promise<NullableType<JobSeeker>>;

  abstract findByUserId(userId: number): Promise<NullableType<JobSeeker>>;

  abstract findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<JobSeeker[]>;

  abstract update(
    id: JobSeeker['id'],
    payload: Partial<JobSeeker>,
  ): Promise<JobSeeker>;

  abstract remove(id: JobSeeker['id']): Promise<void>;
}
