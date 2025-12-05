import { Employer } from '../../../../domain/employer';
import { EmployerEntity } from '../entities/employer.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

export class EmployerMapper {
  static toDomain(raw: EmployerEntity): Employer {
    const domainEntity = new Employer();
    domainEntity.id = raw.id;
    domainEntity.companyName = raw.companyName;
    domainEntity.description = raw.description;
    domainEntity.website = raw.website;
    domainEntity.location = raw.location;
    domainEntity.userId = raw.userId;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Employer): EmployerEntity {
    const persistenceEntity = new EmployerEntity();
    if (domainEntity.id) {
      persistenceEntity.id = Number(domainEntity.id);
    }
    persistenceEntity.companyName = domainEntity.companyName;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.website = domainEntity.website;
    persistenceEntity.location = domainEntity.location;
    persistenceEntity.userId = Number(domainEntity.userId);
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
