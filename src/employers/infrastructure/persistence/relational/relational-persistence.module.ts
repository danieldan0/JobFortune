import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerEntity } from './entities/employer.entity';
import { EmployerRepository } from '../employer.repository';
import { EmployerRelationalRepository } from './repositories/employer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerEntity])],
  providers: [
    {
      provide: EmployerRepository,
      useClass: EmployerRelationalRepository,
    },
  ],
  exports: [EmployerRepository],
})
export class RelationalEmployerPersistenceModule {}
