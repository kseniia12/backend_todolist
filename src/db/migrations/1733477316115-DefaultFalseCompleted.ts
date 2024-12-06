import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultFalseCompleted1733477316115 implements MigrationInterface {
  name = "DefaultFalseCompleted1733477316115";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "todo"
            ALTER COLUMN "completed"
            SET DEFAULT false
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "todo"
            ALTER COLUMN "completed" DROP DEFAULT
        `);
  }
}
