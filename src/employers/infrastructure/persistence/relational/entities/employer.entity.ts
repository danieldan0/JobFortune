import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'employer',
})
export class EmployerEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: String })
  companyName: string;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  description: string | null;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  website: string | null;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  location: string | null;

  @ApiProperty({
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, {
    eager: false,
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
