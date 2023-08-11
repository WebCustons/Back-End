import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAdverts1691759510859 implements MigrationInterface {
    name = 'UpdateAdverts1691759510859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_7aaf688aeb2cd041e6089275a12"`);
        await queryRunner.query(`ALTER TABLE "adverts" RENAME COLUMN "usersId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adverts" DROP CONSTRAINT "FK_80a023b502ad7957fb8d470e4e2"`);
        await queryRunner.query(`ALTER TABLE "adverts" RENAME COLUMN "userId" TO "usersId"`);
        await queryRunner.query(`ALTER TABLE "adverts" ADD CONSTRAINT "FK_7aaf688aeb2cd041e6089275a12" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
