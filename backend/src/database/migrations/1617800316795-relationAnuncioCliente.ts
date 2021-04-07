import {MigrationInterface, QueryRunner} from "typeorm";

export class relationAnuncioCliente1617800316795 implements MigrationInterface {
    name = 'relationAnuncioCliente1617800316795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "clienteId" uuid`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "clienteId"`);
    }

}
