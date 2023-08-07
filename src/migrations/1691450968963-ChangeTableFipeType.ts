import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTableFipeType1691450968963 implements MigrationInterface {
    name = 'ChangeTableFipeType1691450968963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "table_fipe"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "table_fipe" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP COLUMN "table_fipe"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD "table_fipe" integer NOT NULL`);
    }

}
