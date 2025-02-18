import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProject1739807474231 implements MigrationInterface {
  name = 'InitProject1739807474231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "images" text NOT NULL, "price" integer NOT NULL, "color" character varying NOT NULL, "description" character varying NOT NULL, "show_on_main" boolean NOT NULL DEFAULT false, "main_slider" boolean NOT NULL DEFAULT true, "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_at" TIMESTAMP NOT NULL DEFAULT now(), "id_section" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "images" text NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "id_parent" integer NOT NULL, CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`,
    );
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "sections"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "admins"`);
  }
}
