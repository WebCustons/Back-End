import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1691603704398 implements MigrationInterface {
    name = 'UpdateUser1691603704398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "address_id" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea" TO "UQ_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_bafb08f60d7857f4670c172a6ea" TO "UQ_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "addressId" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
