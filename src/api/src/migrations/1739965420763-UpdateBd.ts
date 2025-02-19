import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBd1739965420763 implements MigrationInterface {
    name = 'UpdateBd1739965420763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "get_Products" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "get_Sections" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "get_Sections"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "get_Products"`);
    }

}
