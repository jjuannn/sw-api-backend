import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1718906723676 implements MigrationInterface {
  name = 'CreateUserTable1718906723676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'REGULAR', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user" (id, email, role, password, created_at) VALUES (1, 'admin@example.com', 'ADMIN', '$2b$10$pDUcAEeRnYsBoLDxeimZhu6dvPVxWd9RLol2wRJI5nDKcmVAyrMkm', now())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DELETE FROM "user" WHERE email = 'admin@example.com'`,
    );
  }
}
