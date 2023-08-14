import { MigrationInterface, QueryRunner } from "typeorm";

export class Data1691803378772 implements MigrationInterface {
    name = 'Data1691803378772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image_gallery" DROP CONSTRAINT "FK_87e721007172585d4ff4def8c9d"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" RENAME COLUMN "advertId" TO "advertsId"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" ADD CONSTRAINT "FK_a5c4bcc83d2e880671026235f7d" FOREIGN KEY ("advertsId") REFERENCES "adverts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image_gallery" DROP CONSTRAINT "FK_a5c4bcc83d2e880671026235f7d"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" RENAME COLUMN "advertsId" TO "advertId"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" ADD CONSTRAINT "FK_87e721007172585d4ff4def8c9d" FOREIGN KEY ("advertId") REFERENCES "adverts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
