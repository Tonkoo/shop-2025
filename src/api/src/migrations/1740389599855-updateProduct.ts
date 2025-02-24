import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1740389599855 implements MigrationInterface {
    name = 'UpdateProduct1740389599855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "images" integer array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "images" text NOT NULL`);
    }

}
