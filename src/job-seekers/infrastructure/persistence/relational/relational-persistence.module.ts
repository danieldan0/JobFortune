import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeekerEntity } from './entities/job-seeker.entity';
import { JobSeekerRepository } from '../job-seeker.repository';
import { JobSeekerRelationalRepository } from './repositories/job-seeker.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeekerEntity])],
  providers: [
    {
      provide: JobSeekerRepository,
      useClass: JobSeekerRelationalRepository,
    },
  ],
  exports: [JobSeekerRepository],
})
export class RelationalJobSeekerPersistenceModule {}
