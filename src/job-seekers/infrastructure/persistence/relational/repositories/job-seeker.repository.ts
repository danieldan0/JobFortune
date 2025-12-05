import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobSeekerEntity } from '../entities/job-seeker.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { JobSeeker } from '../../../../domain/job-seeker';
import { JobSeekerRepository } from '../../job-seeker.repository';
import { JobSeekerMapper } from '../mappers/job-seeker.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class JobSeekerRelationalRepository implements JobSeekerRepository {
  constructor(
    @InjectRepository(JobSeekerEntity)
    private readonly jobSeekerRepository: Repository<JobSeekerEntity>,
  ) {}

  async create(data: JobSeeker): Promise<JobSeeker> {
    const persistenceModel = JobSeekerMapper.toPersistence(data);
    const newEntity = await this.jobSeekerRepository.save(
      this.jobSeekerRepository.create(persistenceModel),
    );
    return JobSeekerMapper.toDomain(newEntity);
  }

  async findById(id: JobSeeker['id']): Promise<NullableType<JobSeeker>> {
    const entity = await this.jobSeekerRepository.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });

    return entity ? JobSeekerMapper.toDomain(entity) : null;
  }

  async findByUserId(userId: number): Promise<NullableType<JobSeeker>> {
    const entity = await this.jobSeekerRepository.findOne({
      where: { userId },
      relations: ['user'],
    });

    return entity ? JobSeekerMapper.toDomain(entity) : null;
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<JobSeeker[]> {
    const entities = await this.jobSeekerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['user'],
    });

    return entities.map((entity) => JobSeekerMapper.toDomain(entity));
  }

  async update(
    id: JobSeeker['id'],
    payload: Partial<JobSeeker>,
  ): Promise<JobSeeker> {
    const entity = await this.jobSeekerRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Job Seeker not found');
    }

    const updatedEntity = await this.jobSeekerRepository.save(
      this.jobSeekerRepository.create(
        JobSeekerMapper.toPersistence({
          ...JobSeekerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return JobSeekerMapper.toDomain(updatedEntity);
  }

  async remove(id: JobSeeker['id']): Promise<void> {
    await this.jobSeekerRepository.delete(id);
  }
}
