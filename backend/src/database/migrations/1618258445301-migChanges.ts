import {MigrationInterface, QueryRunner} from "typeorm";

export class migChanges1618258445301 implements MigrationInterface {
    name = 'migChanges1618258445301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "denuncias" ("idDenuncia" uuid NOT NULL DEFAULT uuid_generate_v4(), "idDenunciante" character varying NOT NULL, "categoria" character varying NOT NULL, "comentario" character varying NOT NULL, "anuncioId" uuid, CONSTRAINT "PK_e9114abcf005192660ddca67a13" PRIMARY KEY ("idDenuncia"))`);
        await queryRunner.query(`CREATE TABLE "anuncios_seguidores_clientes" ("anunciosId" uuid NOT NULL, "clientesId" uuid NOT NULL, CONSTRAINT "PK_5e2f55340238177155159ba965a" PRIMARY KEY ("anunciosId", "clientesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e023d50d5026611d343a2cece5" ON "anuncios_seguidores_clientes" ("anunciosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_682f2588da89ce94c3ca4f155b" ON "anuncios_seguidores_clientes" ("clientesId") `);
        await queryRunner.query(`ALTER TABLE "notificacoes" ADD "anuncianteId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "denuncias" ADD CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_e023d50d5026611d343a2cece5d" FOREIGN KEY ("anunciosId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb"`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_e023d50d5026611d343a2cece5d"`);
        await queryRunner.query(`ALTER TABLE "denuncias" DROP CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1"`);
        await queryRunner.query(`ALTER TABLE "notificacoes" DROP COLUMN "anuncianteId"`);
        await queryRunner.query(`DROP INDEX "IDX_682f2588da89ce94c3ca4f155b"`);
        await queryRunner.query(`DROP INDEX "IDX_e023d50d5026611d343a2cece5"`);
        await queryRunner.query(`DROP TABLE "anuncios_seguidores_clientes"`);
        await queryRunner.query(`DROP TABLE "denuncias"`);
    }

}
