import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateEmployerDto {
  @ApiProperty({ example: 'Tech Corp Ltd.' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'Leading technology company', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://techcorp.com', required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: 'Kyiv, Ukraine', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}
