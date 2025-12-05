import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';

const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;

export class JobSeeker {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Software Engineer with 5 years of experience',
  })
  bio: string | null;

  @ApiProperty({
    type: String,
    example: 'Software Developer',
  })
  desiredPosition: string | null;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  yearsOfExperience: number | null;

  @ApiProperty({
    type: String,
    example: 'https://linkedin.com/in/johndoe',
  })
  linkedinUrl: string | null;

  @ApiProperty({
    type: String,
    example: 'https://github.com/johndoe',
  })
  githubUrl: string | null;

  @ApiProperty()
  user?: User;

  @ApiProperty()
  userId: number | string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
