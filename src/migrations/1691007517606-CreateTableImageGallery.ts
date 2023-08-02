import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableImageGallery1691007517606 implements MigrationInterface {
    name = 'CreateTableImageGallery1691007517606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image_gallery" ("id" SERIAL NOT NULL, "image" text NOT NULL, "advert_id" integer, CONSTRAINT "PK_278b7928303c6293cf98ed65172" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image_gallery" ADD CONSTRAINT "FK_6bab2502fcd913888d0371cedfa" FOREIGN KEY ("advert_id") REFERENCES "adverts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image_gallery" DROP CONSTRAINT "FK_6bab2502fcd913888d0371cedfa"`);
        await queryRunner.query(`DROP TABLE "image_gallery"`);
    }

}
