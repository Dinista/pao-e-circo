import {MigrationInterface, QueryRunner} from "typeorm";

export class seguidores1618165117028 implements MigrationInterface {
    name = 'seguidores1618165117028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "seguidoresId" uuid`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_7e6048aa3b57fc7bcfb607d8c06" FOREIGN KEY ("seguidoresId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_7e6048aa3b57fc7bcfb607d8c06"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "seguidoresId"`);
    }

}
