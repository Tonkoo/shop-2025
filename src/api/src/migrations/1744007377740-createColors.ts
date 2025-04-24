import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateColors1744007377740 implements MigrationInterface {
  name = 'CreateColors1744007377740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "colors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "hex" character varying NOT NULL, CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "color"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "id_color" integer NOT NULL `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "id_section" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_3170c1356eac3a3d11d9e0c5aa7" FOREIGN KEY ("id_color") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_3170c1356eac3a3d11d9e0c5aa7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "id_section" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id_color"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "color" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "colors"`);
  }
}
