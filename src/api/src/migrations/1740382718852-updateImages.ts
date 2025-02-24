import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImages1740382718852 implements MigrationInterface {
    name = 'UpdateImages1740382718852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "images" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "FK_e25e6a6ab17bc951e0bfaaceb08" FOREIGN KEY ("images") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "FK_e25e6a6ab17bc951e0bfaaceb08"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "images" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
