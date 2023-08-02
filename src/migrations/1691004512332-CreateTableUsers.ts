import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1691004512332 implements MigrationInterface {
    name = 'CreateTableUsers1691004512332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "cpf" character varying(11) NOT NULL, "phone" integer NOT NULL, "birth_date" date NOT NULL, "description" text NOT NULL, "password" text NOT NULL, "type_user" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
