import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
