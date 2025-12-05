import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { RelationalEmployerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? class DocumentEmployerPersistenceModule {}
  : RelationalEmployerPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService, infrastructurePersistenceModule],
})
export class EmployersModule {}
