import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAdverts1691006935246 implements MigrationInterface {
    name = 'CreateTableAdverts1691006935246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adverts" ("id" SERIAL NOT NULL, "brand" text NOT NULL, "model" text NOT NULL, "year" integer NOT NULL, "fuel" text NOT NULL, "mileage" integer NOT NULL, "color" text NOT NULL, "table_fipe" integer NOT NULL, "price" integer NOT NULL, "description" text NOT NULL, "cover_image" text NOT NULL, "published" boolean NOT NULL, "user_id" integer, CONSTRAINT "PK_36876931b51109a932d0bf3b40a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_98153415de7e9b3024220e02ee1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_98153415de7e9b3024220e02ee1"`);
        await queryRunner.query(`DROP TABLE "adverts"`);
    }

}
