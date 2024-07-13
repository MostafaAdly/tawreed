import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserPhone1720857459978 implements MigrationInterface {
    name = 'AddedUserPhone1720857459978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "metadata" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "metadata" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
