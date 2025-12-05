import { Injectable } from '@nestjs/common';
import { CreateJobSeekerDto } from './dto/create-job-seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';
import { JobSeekerRepository } from './infrastructure/persistence/job-seeker.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { JobSeeker } from './domain/job-seeker';

@Injectable()
export class JobSeekersService {
  constructor(private readonly jobSeekerRepository: JobSeekerRepository) {}

  create(userId: number, createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekerRepository.create({
      ...createJobSeekerDto,
      userId,
    } as JobSeeker);
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.jobSeekerRepository.findManyWithPagination({
      paginationOptions,
    });
  }

  findById(id: number) {
    return this.jobSeekerRepository.findById(id);
  }

  findByUserId(userId: number) {
    return this.jobSeekerRepository.findByUserId(userId);
  }

  update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    return this.jobSeekerRepository.update(id, updateJobSeekerDto);
  }

  remove(id: number) {
    return this.jobSeekerRepository.remove(id);
  }
}
