import {MigrationInterface, QueryRunner} from "typeorm";

export class manyToManySeguidoresBidirectional1618171524349 implements MigrationInterface {
    name = 'manyToManySeguidoresBidirectional1618171524349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "denuncias" DROP CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1"`);
        await queryRunner.query(`ALTER TABLE "denuncias" DROP COLUMN "anuncioId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "denuncias" ADD "anuncioId" uuid`);
        await queryRunner.query(`ALTER TABLE "denuncias" ADD CONSTRAINT "FK_9d14281cc316d3f5df52fb302d1" FOREIGN KEY ("anuncioId") REFERENCES "anuncios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
