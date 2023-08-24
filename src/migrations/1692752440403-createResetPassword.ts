import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResetPassword1692752440403 implements MigrationInterface {
    name = 'CreateResetPassword1692752440403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token"`);
    }

}
