import {MigrationInterface, QueryRunner} from "typeorm";

export class comentarioDate1618432405367 implements MigrationInterface {
    name = 'comentarioDate1618432405367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" DROP COLUMN "data"`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD "data" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" DROP COLUMN "data"`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD "data" character varying NOT NULL`);
    }

}
