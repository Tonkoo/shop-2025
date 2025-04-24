import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSortingOptions1745486963695 implements MigrationInterface {
    name = 'CreateSortingOptions1745486963695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sorting_options" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "order" character varying NOT NULL, "default" boolean NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_86785c87ad2e1df7889ce72e83c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sorting_options"`);
    }

}
