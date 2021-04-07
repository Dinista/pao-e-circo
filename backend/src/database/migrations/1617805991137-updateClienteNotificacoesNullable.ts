import {MigrationInterface, QueryRunner} from "typeorm";

export class updateClienteNotificacoesNullable1617805991137 implements MigrationInterface {
    name = 'updateClienteNotificacoesNullable1617805991137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "notificacoes" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "clientes"."notificacoes" IS NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "numTrocas" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "clientes"."numTrocas" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "clientes"."numTrocas" IS NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "numTrocas" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "clientes"."notificacoes" IS NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "notificacoes" SET NOT NULL`);
    }

}
