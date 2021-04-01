import {MigrationInterface, QueryRunner} from "typeorm";

export class anuncioLinksFotos1617300821894 implements MigrationInterface {
    name = 'anuncioLinksFotos1617300821894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "imageData1"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "imageData2"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "imageData3"`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "foto1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "foto2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "foto3" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "foto3"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "foto2"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "foto1"`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "imageData3" bytea NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "imageData2" bytea NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "imageData1" bytea NOT NULL`);
    }

}
