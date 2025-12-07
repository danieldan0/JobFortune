import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { RelationalJobPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { EmployersModule } from '../employers/employers.module';

@Module({
  imports: [RelationalJobPersistenceModule, EmployersModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService, RelationalJobPersistenceModule],
})
export class JobsModule {}
