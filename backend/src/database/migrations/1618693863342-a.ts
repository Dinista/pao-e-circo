import {MigrationInterface, QueryRunner} from "typeorm";

export class a1618693863342 implements MigrationInterface {
    name = 'a1618693863342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "ofertaTrocaId" uuid`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_e5342d613a9d10ef170bd75601a" FOREIGN KEY ("ofertaTrocaId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_e5342d613a9d10ef170bd75601a"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "ofertaTrocaId"`);
    }

}
