import {MigrationInterface, QueryRunner} from "typeorm";

export class denuncias1618152606338 implements MigrationInterface {
    name = 'denuncias1618152606338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "denuncias" ("idDenuncia" uuid NOT NULL DEFAULT uuid_generate_v4(), "idDenunciante" character varying NOT NULL, "categoria" character varying NOT NULL, "comentario" character varying NOT NULL, "anuncioId" uuid, CONSTRAINT "PK_e9114abcf005192660ddca67a13" PRIMARY KEY ("idDenuncia"))`);
        await queryRunner.query(`ALTER TABLE "denuncias" ADD CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "denuncias" DROP CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1"`);
        await queryRunner.query(`DROP TABLE "denuncias"`);
    }

}
