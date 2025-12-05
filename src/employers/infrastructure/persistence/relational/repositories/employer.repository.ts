import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployerEntity } from '../entities/employer.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Employer } from '../../../../domain/employer';
import { EmployerRepository } from '../../employer.repository';
import { EmployerMapper } from '../mappers/employer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class EmployerRelationalRepository implements EmployerRepository {
  constructor(
    @InjectRepository(EmployerEntity)
    private readonly employerRepository: Repository<EmployerEntity>,
  ) {}

  async create(data: Employer): Promise<Employer> {
    const persistenceModel = EmployerMapper.toPersistence(data);
    const newEntity = await this.employerRepository.save(
      this.employerRepository.create(persistenceModel),
    );
    return EmployerMapper.toDomain(newEntity);
  }

  async findById(id: Employer['id']): Promise<NullableType<Employer>> {
    const entity = await this.employerRepository.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });

    return entity ? EmployerMapper.toDomain(entity) : null;
  }

  async findByUserId(userId: number): Promise<NullableType<Employer>> {
    const entity = await this.employerRepository.findOne({
      where: { userId },
      relations: ['user'],
    });

    return entity ? EmployerMapper.toDomain(entity) : null;
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Employer[]> {
    const entities = await this.employerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['user'],
    });

    return entities.map((entity) => EmployerMapper.toDomain(entity));
  }

  async update(
    id: Employer['id'],
    payload: Partial<Employer>,
  ): Promise<Employer> {
    const entity = await this.employerRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Employer not found');
    }

    const updatedEntity = await this.employerRepository.save(
      this.employerRepository.create(
        EmployerMapper.toPersistence({
          ...EmployerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EmployerMapper.toDomain(updatedEntity);
  }

  async remove(id: Employer['id']): Promise<void> {
    await this.employerRepository.delete(id);
  }
}
