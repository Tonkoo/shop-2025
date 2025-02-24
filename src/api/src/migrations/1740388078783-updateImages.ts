import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImages1740388078783 implements MigrationInterface {
    name = 'UpdateImages1740388078783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "images" integer array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d786803983b83d795ac411d3669"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "images" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d786803983b83d795ac411d3669" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
