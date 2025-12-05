import { Job } from '../../../../domain/job';
import { JobEntity } from '../entities/job.entity';
import { EmployerMapper } from '../../../../../employers/infrastructure/persistence/relational/mappers/employer.mapper';

export class JobMapper {
  static toDomain(raw: JobEntity): Job {
    const domainEntity = new Job();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    domainEntity.requirements = raw.requirements;
    domainEntity.salaryMin = raw.salaryMin;
    domainEntity.salaryMax = raw.salaryMax;
    domainEntity.salaryCurrency = raw.salaryCurrency;
    domainEntity.location = raw.location;
    domainEntity.employmentType = raw.employmentType;
    domainEntity.workMode = raw.workMode;
    domainEntity.isActive = raw.isActive;
    domainEntity.employerId = raw.employerId;
    if (raw.employer) {
      domainEntity.employer = EmployerMapper.toDomain(raw.employer);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Job): JobEntity {
    const persistenceEntity = new JobEntity();
    if (domainEntity.id) {
      persistenceEntity.id = Number(domainEntity.id);
    }
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.requirements = domainEntity.requirements;
    persistenceEntity.salaryMin = domainEntity.salaryMin;
    persistenceEntity.salaryMax = domainEntity.salaryMax;
    persistenceEntity.salaryCurrency = domainEntity.salaryCurrency;
    persistenceEntity.location = domainEntity.location;
    persistenceEntity.employmentType = domainEntity.employmentType;
    persistenceEntity.workMode = domainEntity.workMode;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.employerId = Number(domainEntity.employerId);
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
