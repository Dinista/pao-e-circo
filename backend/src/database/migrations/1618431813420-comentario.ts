import {MigrationInterface, QueryRunner} from "typeorm";

export class comentario1618431813420 implements MigrationInterface {
    name = 'comentario1618431813420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" ADD "data" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" DROP COLUMN "data"`);
    }

}
