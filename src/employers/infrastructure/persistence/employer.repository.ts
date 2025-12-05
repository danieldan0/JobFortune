import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Employer } from '../../domain/employer';

export abstract class EmployerRepository {
  abstract create(data: Employer): Promise<Employer>;

  abstract findById(id: Employer['id']): Promise<NullableType<Employer>>;

  abstract findByUserId(userId: number): Promise<NullableType<Employer>>;

  abstract findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Employer[]>;

  abstract update(
    id: Employer['id'],
    payload: Partial<Employer>,
  ): Promise<Employer>;

  abstract remove(id: Employer['id']): Promise<void>;
}
