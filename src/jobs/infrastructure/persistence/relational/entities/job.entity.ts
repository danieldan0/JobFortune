import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { EmployerEntity } from '../../../../../employers/infrastructure/persistence/relational/entities/employer.entity';

@Entity({
  name: 'job',
})
export class JobEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: String })
  @Index()
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  requirements: string | null;

  @ApiProperty()
  @Column({ type: Number, nullable: true })
  salaryMin: number | null;

  @ApiProperty()
  @Column({ type: Number, nullable: true })
  salaryMax: number | null;

  @ApiProperty()
  @Column({ type: String, nullable: true, length: 10 })
  salaryCurrency: string | null;

  @ApiProperty()
  @Column({ type: String })
  @Index()
  location: string;

  @ApiProperty()
  @Column({
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
  })
  employmentType: string;

  @ApiProperty()
  @Column({
    type: String,
    enum: ['remote', 'on-site', 'hybrid'],
  })
  workMode: string;

  @ApiProperty()
  @Column({ type: Boolean, default: true })
  @Index()
  isActive: boolean;

  @ApiProperty({
    type: () => EmployerEntity,
  })
  @ManyToOne(() => EmployerEntity, {
    eager: false,
  })
  @JoinColumn({ name: 'employerId' })
  employer?: EmployerEntity;

  @ApiProperty()
  @Column()
  @Index()
  employerId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
