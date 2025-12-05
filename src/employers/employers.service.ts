import { Injectable } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerRepository } from './infrastructure/persistence/employer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Employer } from './domain/employer';

@Injectable()
export class EmployersService {
  constructor(private readonly employerRepository: EmployerRepository) {}

  create(userId: number, createEmployerDto: CreateEmployerDto) {
    return this.employerRepository.create({
      ...createEmployerDto,
      userId,
    } as Employer);
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.employerRepository.findManyWithPagination({
      paginationOptions,
    });
  }

  findById(id: number) {
    return this.employerRepository.findById(id);
  }

  findByUserId(userId: number) {
    return this.employerRepository.findByUserId(userId);
  }

  update(id: number, updateEmployerDto: UpdateEmployerDto) {
    return this.employerRepository.update(id, updateEmployerDto);
  }

  remove(id: number) {
    return this.employerRepository.remove(id);
  }
}
