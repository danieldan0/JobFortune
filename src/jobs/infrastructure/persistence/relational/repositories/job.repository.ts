import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { JobEntity } from '../entities/job.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Job } from '../../../../domain/job';
import { JobRepository } from '../../job.repository';
import { JobMapper } from '../mappers/job.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class JobRelationalRepository implements JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async create(data: Job): Promise<Job> {
    const persistenceModel = JobMapper.toPersistence(data);
    const newEntity = await this.jobRepository.save(
      this.jobRepository.create(persistenceModel),
    );
    return JobMapper.toDomain(newEntity);
  }

  async findById(id: Job['id']): Promise<NullableType<Job>> {
    const entity = await this.jobRepository.findOne({
      where: { id: Number(id) },
      relations: ['employer', 'employer.user'],
    });

    return entity ? JobMapper.toDomain(entity) : null;
  }

  async findManyWithPagination({
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
  }): Promise<Job[]> {
    const where: any = {};

    if (filterOptions?.location) {
      where.location = ILike(`%${filterOptions.location}%`);
    }
    if (filterOptions?.employmentType) {
      where.employmentType = filterOptions.employmentType;
    }
    if (filterOptions?.workMode) {
      where.workMode = filterOptions.workMode;
    }
    if (filterOptions?.isActive !== undefined) {
      where.isActive = filterOptions.isActive;
    }
    if (filterOptions?.employerId) {
      where.employerId = filterOptions.employerId;
    }

    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.employer', 'employer')
      .leftJoinAndSelect('employer.user', 'user');

    if (filterOptions?.search) {
      queryBuilder.where(
        '(job.title ILIKE :search OR job.description ILIKE :search)',
        { search: `%${filterOptions.search}%` },
      );
    }

    Object.keys(where).forEach((key) => {
      queryBuilder.andWhere(`job.${key} = :${key}`, { [key]: where[key] });
    });

    const entities = await queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .orderBy('job.createdAt', 'DESC')
      .getMany();

    return entities.map((entity) => JobMapper.toDomain(entity));
  }

  async update(id: Job['id'], payload: Partial<Job>): Promise<Job> {
    const entity = await this.jobRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Job not found');
    }

    const updatedEntity = await this.jobRepository.save(
      this.jobRepository.create(
        JobMapper.toPersistence({
          ...JobMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return JobMapper.toDomain(updatedEntity);
  }

  async remove(id: Job['id']): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
