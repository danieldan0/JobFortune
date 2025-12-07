import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  Query,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { EmployersService } from '../employers/employers.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { Job } from './domain/job';
import { infinityPagination } from '../utils/infinity-pagination';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';

@ApiTags('Jobs')
@Controller({
  path: 'jobs',
  version: '1',
})
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly employersService: EmployersService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.employer)
  @ApiCreatedResponse({
    type: Job,
  })
  async create(@Request() request, @Body() createJobDto: CreateJobDto) {
    // Find employer profile by userId
    const employer = await this.employersService.findByUserId(request.user.id);

    if (!employer) {
      throw new NotFoundException(
        'Employer profile not found. Please create your employer profile first.',
      );
    }

    return this.jobsService.create(Number(employer.id), createJobDto);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: InfinityPaginationResponse(Job),
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiQuery({ name: 'employmentType', required: false, type: String })
  @ApiQuery({ name: 'workMode', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiQuery({ name: 'employerId', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() filterDto: FilterJobDto,
  ): Promise<InfinityPaginationResponseDto<Job>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.jobsService.findManyWithPagination(
        {
          page,
          limit,
        },
        filterDto,
      ),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Job,
  })
  findOne(@Param('id') id: string): Promise<NullableType<Job>> {
    return this.jobsService.findById(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.employer, RoleEnum.admin)
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Job,
  })
  async update(
    @Request() request,
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job | null> {
    const job = await this.jobsService.findById(+id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // For non-admin users, verify they own the job through their employer profile
    if (request.user.role?.id !== RoleEnum.admin) {
      const employer = await this.employersService.findByUserId(
        request.user.id,
      );

      if (!employer || job.employerId !== Number(employer.id)) {
        throw new ForbiddenException('You can only update your own jobs');
      }
    }

    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.employer, RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async remove(@Request() request, @Param('id') id: string): Promise<void> {
    const job = await this.jobsService.findById(+id);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // For non-admin users, verify they own the job through their employer profile
    if (request.user.role?.id !== RoleEnum.admin) {
      const employer = await this.employersService.findByUserId(
        request.user.id,
      );

      if (!employer || job.employerId !== Number(employer.id)) {
        throw new ForbiddenException('You can only delete your own jobs');
      }
    }

    return this.jobsService.remove(+id);
  }
}
