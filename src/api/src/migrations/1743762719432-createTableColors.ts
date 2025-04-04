import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableColors1743762719432 implements MigrationInterface {
    name = 'CreateTableColors1743762719432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "products_colors_id_fk"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "hex"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "hex" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id_color" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id_section" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" ALTER COLUMN "level" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3170c1356eac3a3d11d9e0c5aa7" FOREIGN KEY ("id_color") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3170c1356eac3a3d11d9e0c5aa7"`);
        await queryRunner.query(`ALTER TABLE "sections" ALTER COLUMN "level" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id_section" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id_color" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "hex"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "hex" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "products_colors_id_fk" FOREIGN KEY ("id_color") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
