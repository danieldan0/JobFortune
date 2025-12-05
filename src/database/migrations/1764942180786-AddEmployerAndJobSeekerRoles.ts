import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmployerAndJobSeekerRoles1764942180786
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "role" ("id", "name") VALUES (3, 'employer'), (4, 'job_seeker')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "role" WHERE "id" IN (3, 4)`);
  }
}
