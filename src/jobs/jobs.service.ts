import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';
import { JobRepository } from './infrastructure/persistence/job.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Job } from './domain/job';

@Injectable()
export class JobsService {
    constructor(private readonly jobRepository: JobRepository) { }

    async create(employerId: number, createJobDto: CreateJobDto) {
        return this.jobRepository.create({
            ...createJobDto,
            employerId,
            isActive: true,
        } as Job);
    }

    async findManyWithPagination(
        paginationOptions: IPaginationOptions,
        filterOptions?: FilterJobDto,
    ) {
        return this.jobRepository.findManyWithPagination({
            paginationOptions,
            filterOptions,
        });
    }

    async findById(id: number) {
        const job = await this.jobRepository.findById(id);
        if (!job) {
            throw new NotFoundException('Job not found');
        }
        return job;
    }

    async update(id: number, updateJobDto: UpdateJobDto) {
        const job = await this.jobRepository.findById(id);
        if (!job) {
            throw new NotFoundException('Job not found');
        }
        return this.jobRepository.update(id, updateJobDto);
    }

    async remove(id: number) {
        const job = await this.jobRepository.findById(id);
        if (!job) {
            throw new NotFoundException('Job not found');
        }
        return this.jobRepository.remove(id);
    }
}
