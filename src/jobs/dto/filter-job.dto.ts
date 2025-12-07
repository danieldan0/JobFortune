import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FilterJobDto {
  @ApiProperty({ required: false, example: 'Kyiv' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    required: false,
    example: 'full-time',
    enum: ['full-time', 'part-time', 'contract', 'internship'],
  })
  @IsOptional()
  @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
  employmentType?: string;

  @ApiProperty({
    required: false,
    example: 'remote',
    enum: ['remote', 'on-site', 'hybrid'],
  })
  @IsOptional()
  @IsEnum(['remote', 'on-site', 'hybrid'])
  workMode?: string;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  employerId?: number;

  @ApiProperty({ required: false, example: 'developer' })
  @IsOptional()
  @IsString()
  search?: string;
}
