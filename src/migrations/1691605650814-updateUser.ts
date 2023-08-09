import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1691605650814 implements MigrationInterface {
    name = 'UpdateUser1691605650814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image_gallery" DROP CONSTRAINT "FK_6bab2502fcd913888d0371cedfa"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1b312f76a59a3f87897b57ea539"`);
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_98153415de7e9b3024220e02ee1"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" RENAME COLUMN "advert_id" TO "advertId"`);
        await queryRunner.query(`ALTER TABLE "adverts" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "advert_id"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "advertId" integer`);
        await queryRunner.query(`ALTER TABLE "image_gallery" ADD CONSTRAINT "FK_87e721007172585d4ff4def8c9d" FOREIGN KEY ("advertId") REFERENCES "adverts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c870c44a72a624e88130b663fc2" FOREIGN KEY ("advertId") REFERENCES "adverts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c870c44a72a624e88130b663fc2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" DROP CONSTRAINT "FK_87e721007172585d4ff4def8c9d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "advertId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "advert_id" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "adverts" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "image_gallery" RENAME COLUMN "advertId" TO "advert_id"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_98153415de7e9b3024220e02ee1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1b312f76a59a3f87897b57ea539" FOREIGN KEY ("advert_id") REFERENCES "adverts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image_gallery" ADD CONSTRAINT "FK_6bab2502fcd913888d0371cedfa" FOREIGN KEY ("advert_id") REFERENCES "adverts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
