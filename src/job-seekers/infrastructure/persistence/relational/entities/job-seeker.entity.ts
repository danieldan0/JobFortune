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
  name: 'job_seeker',
})
export class JobSeekerEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  bio: string | null;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  desiredPosition: string | null;

  @ApiProperty()
  @Column({ type: Number, nullable: true })
  yearsOfExperience: number | null;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  linkedinUrl: string | null;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  githubUrl: string | null;

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
