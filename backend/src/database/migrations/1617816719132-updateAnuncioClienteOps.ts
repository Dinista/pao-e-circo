import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAnuncioClienteOps1617816719132 implements MigrationInterface {
    name = 'updateAnuncioClienteOps1617816719132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459"`);
        await queryRunner.query(`ALTER TABLE "anuncios" DROP COLUMN "clienteId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" ADD "clienteId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

}
