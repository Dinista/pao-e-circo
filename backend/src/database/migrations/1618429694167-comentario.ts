import {MigrationInterface, QueryRunner} from "typeorm";

export class comentario1618429694167 implements MigrationInterface {
    name = 'comentario1618429694167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comentarios" ("idComentario" uuid NOT NULL DEFAULT uuid_generate_v4(), "idComentador" character varying NOT NULL, "texto" character varying NOT NULL, "anuncioId" uuid, CONSTRAINT "PK_c493140f6d088faaae5f76d9f4b" PRIMARY KEY ("idComentario"))`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "notificacoes"`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD CONSTRAINT "FK_511523b8b5c0d09bdbb0a07b816" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" DROP CONSTRAINT "FK_511523b8b5c0d09bdbb0a07b816"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "notificacoes" text`);
        await queryRunner.query(`DROP TABLE "comentarios"`);
    }

}
