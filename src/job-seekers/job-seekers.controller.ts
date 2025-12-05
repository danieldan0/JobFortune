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
} from '@nestjs/common';
import { JobSeekersService } from './job-seekers.service';
import { CreateJobSeekerDto } from './dto/create-job-seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { JobSeeker } from './domain/job-seeker';
import { infinityPagination } from '../utils/infinity-pagination';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';

@ApiTags('Job Seekers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'job-seekers',
  version: '1',
})
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @Post()
  @Roles(RoleEnum.job_seeker)
  @ApiCreatedResponse({
    type: JobSeeker,
  })
  create(@Request() request, @Body() createJobSeekerDto: CreateJobSeekerDto) {
    return this.jobSeekersService.create(request.user.id, createJobSeekerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: InfinityPaginationResponse(JobSeeker),
  })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<InfinityPaginationResponseDto<JobSeeker>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.jobSeekersService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get('my-profile')
  @Roles(RoleEnum.job_seeker)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: JobSeeker,
  })
  findMyProfile(@Request() request): Promise<NullableType<JobSeeker>> {
    return this.jobSeekersService.findByUserId(request.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: JobSeeker,
  })
  findOne(@Param('id') id: string): Promise<NullableType<JobSeeker>> {
    return this.jobSeekersService.findById(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.job_seeker)
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: JobSeeker,
  })
  update(
    @Param('id') id: string,
    @Body() updateJobSeekerDto: UpdateJobSeekerDto,
  ): Promise<JobSeeker | null> {
    return this.jobSeekersService.update(+id, updateJobSeekerDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.job_seeker, RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.jobSeekersService.remove(+id);
  }
}
