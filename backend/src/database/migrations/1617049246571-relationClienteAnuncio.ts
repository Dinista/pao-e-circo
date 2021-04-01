import {MigrationInterface, QueryRunner} from "typeorm";

export class relationClienteAnuncio1617049246571 implements MigrationInterface {
    name = 'relationClienteAnuncio1617049246571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "clienteId" uuid`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "notificacoes"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "notificacoes" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "nota"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "nota" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "valorEstimado"`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "valorEstimado" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "valorEstimado"`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "valorEstimado" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "nota"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "nota" double precision`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "notificacoes"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "notificacoes" character varying`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "clienteId"`);
    }

}
