import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1720858699162 implements MigrationInterface {
    name = 'Init1720858699162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "hashed_password" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying(11) NOT NULL, "metadata" jsonb NOT NULL DEFAULT '{}', "role" character varying, "type" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON "user" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_31ef2b4d30675d0c15056b7f6e"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
