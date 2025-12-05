import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobSeekerTable1764942561222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_seeker" (
                "id" SERIAL NOT NULL,
                "bio" character varying,
                "desiredPosition" character varying,
                "yearsOfExperience" integer,
                "linkedinUrl" character varying,
                "githubUrl" character varying,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_job_seeker_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_job_seeker_userId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_job_seeker_userId" ON "job_seeker" ("userId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_job_seeker_userId"`);
    await queryRunner.query(`DROP TABLE "job_seeker"`);
  }
}
