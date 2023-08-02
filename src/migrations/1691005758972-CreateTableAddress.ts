import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAddress1691005758972 implements MigrationInterface {
    name = 'CreateTableAddress1691005758972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" integer NOT NULL, "state" text NOT NULL, "city" text NOT NULL, "road" text NOT NULL, "number" integer NOT NULL, "complement" text NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressIdId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_6f64adba7c1c162c1543d8fff2c" UNIQUE ("addressIdId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f64adba7c1c162c1543d8fff2c" FOREIGN KEY ("addressIdId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f64adba7c1c162c1543d8fff2c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_6f64adba7c1c162c1543d8fff2c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressIdId"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
