import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployerTable1764942410927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employer" (
                "id" SERIAL NOT NULL,
                "companyName" character varying NOT NULL,
                "description" character varying,
                "website" character varying,
                "location" character varying,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_employer_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_employer_userId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_employer_userId" ON "employer" ("userId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_employer_userId"`);
    await queryRunner.query(`DROP TABLE "employer"`);
  }
}
