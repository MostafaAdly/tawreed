import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedAge1719977581769 implements MigrationInterface {
    name = 'RemovedAge1719977581769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashed_password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "metadata" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashed_password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

}
