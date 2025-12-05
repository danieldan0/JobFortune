import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsEnum,
    Min,
    MaxLength,
} from 'class-validator';

export class CreateJobDto {
    @ApiProperty({ example: 'Senior Full-Stack Developer' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;

    @ApiProperty({
        example: 'We are looking for an experienced developer...',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        example: 'TypeScript, React, Node.js, NestJS',
        required: false,
    })
    @IsOptional()
    @IsString()
    requirements?: string;

    @ApiProperty({ example: 5000, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    salaryMin?: number;

    @ApiProperty({ example: 8000, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    salaryMax?: number;

    @ApiProperty({ example: 'USD', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    salaryCurrency?: string;

    @ApiProperty({ example: 'Kyiv, Ukraine' })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({
        example: 'full-time',
        enum: ['full-time', 'part-time', 'contract', 'internship'],
    })
    @IsNotEmpty()
    @IsEnum(['full-time', 'part-time', 'contract', 'internship'])
    employmentType: string;

    @ApiProperty({
        example: 'remote',
        enum: ['remote', 'on-site', 'hybrid'],
    })
    @IsNotEmpty()
    @IsEnum(['remote', 'on-site', 'hybrid'])
    workMode: string;
}
