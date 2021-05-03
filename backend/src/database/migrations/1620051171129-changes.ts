import {MigrationInterface, QueryRunner} from "typeorm";

export class changes1620051171129 implements MigrationInterface {
    name = 'changes1620051171129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notificacoes" ("idNotificacao" uuid NOT NULL DEFAULT uuid_generate_v4(), "texto" character varying NOT NULL, "anuncioId" uuid, "ofertaTrocaId" uuid, "ofertanteId" uuid, "anuncianteId" uuid, CONSTRAINT "PK_26e93d32ef169d3481c8700f506" PRIMARY KEY ("idNotificacao"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "endereco" character varying NOT NULL, "cpf" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, "dataNasc" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "avatar" character varying, "capa" character varying, "data" TIMESTAMP NOT NULL DEFAULT 'now()', "nota" integer, "numTrocas" integer, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comentarios" ("idComentario" uuid NOT NULL DEFAULT uuid_generate_v4(), "texto" character varying NOT NULL, "data" TIMESTAMP NOT NULL, "anuncioId" uuid, "comentadorId" uuid, CONSTRAINT "PK_c493140f6d088faaae5f76d9f4b" PRIMARY KEY ("idComentario"))`);
        await queryRunner.query(`CREATE TABLE "denuncias" ("idDenuncia" uuid NOT NULL DEFAULT uuid_generate_v4(), "idDenunciante" character varying NOT NULL, "categoria" character varying NOT NULL, "comentario" character varying NOT NULL, "anuncioId" uuid, CONSTRAINT "PK_e9114abcf005192660ddca67a13" PRIMARY KEY ("idDenuncia"))`);
        await queryRunner.query(`CREATE TABLE "anuncios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "nomeObjeto" character varying NOT NULL, "categoria" character varying NOT NULL, "estadoConservacao" character varying NOT NULL, "foto1" character varying NOT NULL, "foto2" character varying NOT NULL, "foto3" character varying NOT NULL, "descricao" character varying NOT NULL, "itemDesejado" character varying NOT NULL, "valorEstimado" integer NOT NULL, "destaque" boolean NOT NULL, "destaqueExpira" character varying NOT NULL, "clienteId" uuid, CONSTRAINT "PK_e38512a0cf3f4f9452fcdc082de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientesNotas" ("idNota" uuid NOT NULL DEFAULT uuid_generate_v4(), "idClienteReceiver" character varying NOT NULL, "nota" double precision, "idClienteGiver" character varying NOT NULL, CONSTRAINT "PK_5179ab7868046416041dd534a96" PRIMARY KEY ("idNota"))`);
        await queryRunner.query(`CREATE TABLE "propagandas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageName" character varying NOT NULL, "empresaContratante" character varying NOT NULL, "dataExpiracao" character varying NOT NULL, CONSTRAINT "PK_8e28cac3c5a2f4088a7f91fb5dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trocas" ("idTroca" uuid NOT NULL DEFAULT uuid_generate_v4(), "idCliente1" character varying NOT NULL, "idAnuncioCliente1" character varying NOT NULL, "idCliente2" character varying NOT NULL, "idAnuncioCliente2" character varying NOT NULL, "data" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_9c9165d962d3890fbea033b9fef" PRIMARY KEY ("idTroca"))`);
        await queryRunner.query(`CREATE TABLE "anuncios_seguidores_clientes" ("anunciosId" uuid NOT NULL, "clientesId" uuid NOT NULL, CONSTRAINT "PK_5e2f55340238177155159ba965a" PRIMARY KEY ("anunciosId", "clientesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e023d50d5026611d343a2cece5" ON "anuncios_seguidores_clientes" ("anunciosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_682f2588da89ce94c3ca4f155b" ON "anuncios_seguidores_clientes" ("clientesId") `);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_c19bd7f1f5f8c198f168bf52ae1" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_e5342d613a9d10ef170bd75601a" FOREIGN KEY ("ofertaTrocaId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_358d88a509e4958a4aa9814a679" FOREIGN KEY ("ofertanteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD CONSTRAINT "FK_33f2eef97072bceff8c37c9a2e7" FOREIGN KEY ("anuncianteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD CONSTRAINT "FK_511523b8b5c0d09bdbb0a07b816" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD CONSTRAINT "FK_3bb3acf53c566878bac450f7f59" FOREIGN KEY ("comentadorId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "denuncias" ADD CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_e023d50d5026611d343a2cece5d" FOREIGN KEY ("anunciosId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb"`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_e023d50d5026611d343a2cece5d"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459"`);
        await queryRunner.query(`ALTER TABLE "denuncias" DROP CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1"`);
        await queryRunner.query(`ALTER TABLE "comentarios" DROP CONSTRAINT "FK_3bb3acf53c566878bac450f7f59"`);
        await queryRunner.query(`ALTER TABLE "comentarios" DROP CONSTRAINT "FK_511523b8b5c0d09bdbb0a07b816"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_33f2eef97072bceff8c37c9a2e7"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_358d88a509e4958a4aa9814a679"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_e5342d613a9d10ef170bd75601a"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP CONSTRAINT "FK_c19bd7f1f5f8c198f168bf52ae1"`);
        await queryRunner.query(`DROP INDEX "IDX_682f2588da89ce94c3ca4f155b"`);
        await queryRunner.query(`DROP INDEX "IDX_e023d50d5026611d343a2cece5"`);
        await queryRunner.query(`DROP TABLE "anuncios_seguidores_clientes"`);
        await queryRunner.query(`DROP TABLE "trocas"`);
        await queryRunner.query(`DROP TABLE "propagandas"`);
        await queryRunner.query(`DROP TABLE "clientesNotas"`);
        await queryRunner.query(`DROP TABLE "anuncios"`);
        await queryRunner.query(`DROP TABLE "denuncias"`);
        await queryRunner.query(`DROP TABLE "comentarios"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "notificacoes"`);
    }

}
