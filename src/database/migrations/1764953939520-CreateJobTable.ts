import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobTable1764953939520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "requirements" text,
        "salaryMin" integer,
        "salaryMax" integer,
        "salaryCurrency" character varying(10),
        "location" character varying NOT NULL,
        "employmentType" character varying NOT NULL CHECK ("employmentType" IN ('full-time', 'part-time', 'contract', 'internship')),
        "workMode" character varying NOT NULL CHECK ("workMode" IN ('remote', 'on-site', 'hybrid')),
        "isActive" boolean NOT NULL DEFAULT true,
        "employerId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_job_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_job_employerId" FOREIGN KEY ("employerId") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_job_title" ON "job" ("title")`);
    await queryRunner.query(
      `CREATE INDEX "IDX_job_location" ON "job" ("location")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_job_isActive" ON "job" ("isActive")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_job_employerId" ON "job" ("employerId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_job_employerId"`);
    await queryRunner.query(`DROP INDEX "IDX_job_isActive"`);
    await queryRunner.query(`DROP INDEX "IDX_job_location"`);
    await queryRunner.query(`DROP INDEX "IDX_job_title"`);
    await queryRunner.query(`DROP TABLE "job"`);
  }
}
