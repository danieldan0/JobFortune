import { JobSeeker } from '../../../../domain/job-seeker';
import { JobSeekerEntity } from '../entities/job-seeker.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

export class JobSeekerMapper {
  static toDomain(raw: JobSeekerEntity): JobSeeker {
    const domainEntity = new JobSeeker();
    domainEntity.id = raw.id;
    domainEntity.bio = raw.bio;
    domainEntity.desiredPosition = raw.desiredPosition;
    domainEntity.yearsOfExperience = raw.yearsOfExperience;
    domainEntity.linkedinUrl = raw.linkedinUrl;
    domainEntity.githubUrl = raw.githubUrl;
    domainEntity.userId = raw.userId;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: JobSeeker): JobSeekerEntity {
    const persistenceEntity = new JobSeekerEntity();
    if (domainEntity.id) {
      persistenceEntity.id = Number(domainEntity.id);
    }
    persistenceEntity.bio = domainEntity.bio;
    persistenceEntity.desiredPosition = domainEntity.desiredPosition;
    persistenceEntity.yearsOfExperience = domainEntity.yearsOfExperience;
    persistenceEntity.linkedinUrl = domainEntity.linkedinUrl;
    persistenceEntity.githubUrl = domainEntity.githubUrl;
    persistenceEntity.userId = Number(domainEntity.userId);
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
