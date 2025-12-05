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
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
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
import { Employer } from './domain/employer';
import { infinityPagination } from '../utils/infinity-pagination';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';

@ApiTags('Employers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'employers',
  version: '1',
})
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post()
  @Roles(RoleEnum.employer)
  @ApiCreatedResponse({
    type: Employer,
  })
  create(@Request() request, @Body() createEmployerDto: CreateEmployerDto) {
    return this.employersService.create(request.user.id, createEmployerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: InfinityPaginationResponse(Employer),
  })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<InfinityPaginationResponseDto<Employer>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.employersService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get('my-profile')
  @Roles(RoleEnum.employer)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: Employer,
  })
  findMyProfile(@Request() request): Promise<NullableType<Employer>> {
    return this.employersService.findByUserId(request.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Employer,
  })
  findOne(@Param('id') id: string): Promise<NullableType<Employer>> {
    return this.employersService.findById(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.employer)
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Employer,
  })
  update(
    @Param('id') id: string,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ): Promise<Employer | null> {
    return this.employersService.update(+id, updateEmployerDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.employer, RoleEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.employersService.remove(+id);
  }
}
