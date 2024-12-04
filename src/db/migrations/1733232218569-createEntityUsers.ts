import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntityUsers1733232218569 implements MigrationInterface {
  name = "createEntityUsers1733232218569";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "fullName" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "dob" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
