import {MigrationInterface, QueryRunner} from "typeorm";

export class manyToManySeguidores1618169360730 implements MigrationInterface {
    name = 'manyToManySeguidores1618169360730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_7e6048aa3b57fc7bcfb607d8c06"`);
        await queryRunner.query(`CREATE TABLE "anuncios_seguidores_clientes" ("anunciosId" uuid NOT NULL, "clientesId" uuid NOT NULL, CONSTRAINT "PK_5e2f55340238177155159ba965a" PRIMARY KEY ("anunciosId", "clientesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e023d50d5026611d343a2cece5" ON "anuncios_seguidores_clientes" ("anunciosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_682f2588da89ce94c3ca4f155b" ON "anuncios_seguidores_clientes" ("clientesId") `);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "seguidoresId"`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_e023d50d5026611d343a2cece5d" FOREIGN KEY ("anunciosId") REFERENCES "anuncios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" ADD CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_682f2588da89ce94c3ca4f155bb"`);
        await queryRunner.query(`ALTER TABLE "anuncios_seguidores_clientes" DROP CONSTRAINT "FK_e023d50d5026611d343a2cece5d"`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "seguidoresId" uuid`);
        await queryRunner.query(`DROP INDEX "IDX_682f2588da89ce94c3ca4f155b"`);
        await queryRunner.query(`DROP INDEX "IDX_e023d50d5026611d343a2cece5"`);
        await queryRunner.query(`DROP TABLE "anuncios_seguidores_clientes"`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_7e6048aa3b57fc7bcfb607d8c06" FOREIGN KEY ("seguidoresId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
