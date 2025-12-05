import { Module } from '@nestjs/common';
import { JobSeekersService } from './job-seekers.service';
import { JobSeekersController } from './job-seekers.controller';
import { RelationalJobSeekerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? class DocumentJobSeekerPersistenceModule {}
  : RelationalJobSeekerPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [JobSeekersController],
  providers: [JobSeekersService],
  exports: [JobSeekersService, infrastructurePersistenceModule],
})
export class JobSeekersModule {}
