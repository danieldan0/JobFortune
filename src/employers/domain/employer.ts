import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import databaseConfig from '../../database/config/database.config';
import { DatabaseConfig } from '../../database/config/database-config.type';

const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;

export class Employer {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Tech Corp Ltd.',
  })
  companyName: string;

  @ApiProperty({
    type: String,
    example: 'Leading technology company',
  })
  description: string | null;

  @ApiProperty({
    type: String,
    example: 'https://techcorp.com',
  })
  website: string | null;

  @ApiProperty({
    type: String,
    example: 'Kyiv, Ukraine',
  })
  location: string | null;

  @ApiProperty()
  user?: User;

  @ApiProperty()
  userId: number | string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
