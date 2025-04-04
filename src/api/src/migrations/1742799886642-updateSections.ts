import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSections1742799886642 implements MigrationInterface {
  name = 'UpdateSections1742799886642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sections" ADD COLUMN "level" integer; `,
    );
    await queryRunner.query(
      `ALTER TABLE "sections" ALTER COLUMN "level" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sections" DROP COLUMN "level" integer; `,
    );
    await queryRunner.query(
      `ALTER TABLE "sections" ALTER COLUMN "level" DROP NOT NULL`,
    );
  }
}
