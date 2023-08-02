import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableAddress1691006037733 implements MigrationInterface {
    name = 'AlterTableAddress1691006037733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f64adba7c1c162c1543d8fff2c"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "addressIdId" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_6f64adba7c1c162c1543d8fff2c" TO "UQ_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_1b05689f6b6456680d538c3d2ea" TO "UQ_6f64adba7c1c162c1543d8fff2c"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "address_id" TO "addressIdId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f64adba7c1c162c1543d8fff2c" FOREIGN KEY ("addressIdId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
