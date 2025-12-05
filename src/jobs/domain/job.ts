import { ApiProperty } from '@nestjs/swagger';
import { Employer } from '../../employers/domain/employer';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';

const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;

export class Job {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Senior Full-Stack Developer',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'We are looking for an experienced developer...',
  })
  description: string;

  @ApiProperty({
    type: String,
    example: 'TypeScript, React, Node.js, NestJS',
    required: false,
  })
  requirements: string | null;

  @ApiProperty({
    type: Number,
    example: 5000,
    required: false,
  })
  salaryMin: number | null;

  @ApiProperty({
    type: Number,
    example: 8000,
    required: false,
  })
  salaryMax: number | null;

  @ApiProperty({
    type: String,
    example: 'USD',
    required: false,
  })
  salaryCurrency: string | null;

  @ApiProperty({
    type: String,
    example: 'Kyiv, Ukraine',
  })
  location: string;

  @ApiProperty({
    type: String,
    example: 'full-time',
    enum: ['full-time', 'part-time', 'contract', 'internship'],
  })
  employmentType: string;

  @ApiProperty({
    type: String,
    example: 'remote',
    enum: ['remote', 'on-site', 'hybrid'],
  })
  workMode: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;

  @ApiProperty()
  employer?: Employer;

  @ApiProperty()
  employerId: number | string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
