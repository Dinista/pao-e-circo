import {MigrationInterface, QueryRunner} from "typeorm";

export class anuncio1617376022507 implements MigrationInterface {
    name = 'anuncio1617376022507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anuncios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "nomeObjeto" character varying NOT NULL, "categoria" character varying NOT NULL, "estadoConservacao" character varying NOT NULL, "foto1" character varying NOT NULL, "foto2" character varying NOT NULL, "foto3" character varying NOT NULL, "descricao" character varying NOT NULL, "itemDesejado" character varying NOT NULL, "valorEstimado" integer NOT NULL, "destaque" boolean NOT NULL, "destaqueExpira" TIMESTAMP NOT NULL, "clienteId" uuid, CONSTRAINT "PK_e38512a0cf3f4f9452fcdc082de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459"`);
        await queryRunner.query(`DROP TABLE "anuncios"`);
    }

}
