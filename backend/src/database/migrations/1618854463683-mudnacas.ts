import {MigrationInterface, QueryRunner} from "typeorm";

export class mudnacas1618854463683 implements MigrationInterface {
    name = 'mudnacas1618854463683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comentarios" ("idComentario" uuid NOT NULL DEFAULT uuid_generate_v4(), "texto" character varying NOT NULL, "data" TIMESTAMP NOT NULL, "anuncioId" uuid, "comentadorId" uuid, CONSTRAINT "PK_c493140f6d088faaae5f76d9f4b" PRIMARY KEY ("idComentario"))`);
        await queryRunner.query(`CREATE TABLE "denuncias" ("idDenuncia" uuid NOT NULL DEFAULT uuid_generate_v4(), "idDenunciante" character varying NOT NULL, "categoria" character varying NOT NULL, "comentario" character varying NOT NULL, "anuncioId" uuid, CONSTRAINT "PK_e9114abcf005192660ddca67a13" PRIMARY KEY ("idDenuncia"))`);
        await queryRunner.query(`CREATE TABLE "anuncios_seguidores_clientes" ("anunciosId" uuid NOT NULL, "clientesId" uuid NOT NULL, CONSTRAINT "PK_5e2f55340238177155159ba965a" PRIMARY KEY ("anunciosId", "clientesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e023d50d5026611d343a2cece5" ON "anuncios_seguidores_clientes" ("anunciosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_682f2588da89ce94c3ca4f155b" ON "anuncios_seguidores_clientes" ("clientesId") `);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "PK_1161e00a97df46d9d3c5eed6545"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "notificacoes"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "idNotificacao" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "PK_26e93d32ef169d3481c8700f506" PRIMARY KEY ("idNotificacao")`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "ofertaTrocaId" uuid`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "anuncioId"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "anuncioId" uuid`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "ofertanteId"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "ofertanteId" uuid`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "anuncianteId"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "anuncianteId" uuid`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_c19bd7f1f5f8c198f168bf52ae1" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_e5342d613a9d10ef170bd75601a" FOREIGN KEY ("ofertaTrocaId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_358d88a509e4958a4aa9814a679" FOREIGN KEY ("ofertanteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_33f2eef97072bceff8c37c9a2e7" FOREIGN KEY ("anuncianteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD CONSTRAINT "FK_511523b8b5c0d09bdbb0a07b816" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD CONSTRAINT "FK_3bb3acf53c566878bac450f7f59" FOREIGN KEY ("comentadorId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "denuncias" ADD CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_e023d50d5026611d343a2cece5d" FOREIGN KEY ("anunciosId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb"`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_e023d50d5026611d343a2cece5d"`);
        await queryRunner.query(`ALTER TABLE "denuncias" DROP CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1"`);
        await queryRunner.query(`ALTER TABLE "comentarios" DROP CONSTRAINT "FK_3bb3acf53c566878bac450f7f59"`);
        await queryRunner.query(`ALTER TABLE "comentarios" DROP CONSTRAINT "FK_511523b8b5c0d09bdbb0a07b816"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_33f2eef97072bceff8c37c9a2e7"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_358d88a509e4958a4aa9814a679"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_e5342d613a9d10ef170bd75601a"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_c19bd7f1f5f8c198f168bf52ae1"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "anuncianteId"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "anuncianteId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "ofertanteId"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "ofertanteId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "anuncioId"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "anuncioId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "ofertaTrocaId"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "PK_26e93d32ef169d3481c8700f506"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "idNotificacao"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "notificacoes" text`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "PK_1161e00a97df46d9d3c5eed6545" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP INDEX "IDX_682f2588da89ce94c3ca4f155b"`);
        await queryRunner.query(`DROP INDEX "IDX_e023d50d5026611d343a2cece5"`);
        await queryRunner.query(`DROP TABLE "anuncios_seguidores_clientes"`);
        await queryRunner.query(`DROP TABLE "denuncias"`);
        await queryRunner.query(`DROP TABLE "comentarios"`);
    }

}
