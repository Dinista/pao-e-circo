import {MigrationInterface, QueryRunner} from "typeorm";

export class migChanges1618615654124 implements MigrationInterface {
    name = 'migChanges1618615654124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "ofertaTrocaId" uuid`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_e5342d613a9d10ef170bd75601a" FOREIGN KEY ("ofertaTrocaId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_e5342d613a9d10ef170bd75601a"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "ofertaTrocaId"`);
    }

}
