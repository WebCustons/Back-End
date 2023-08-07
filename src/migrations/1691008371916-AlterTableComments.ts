import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableComments1691008371916 implements MigrationInterface {
    name = 'AlterTableComments1691008371916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "created_" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "created_at" TO "created_"`);
    }

}
