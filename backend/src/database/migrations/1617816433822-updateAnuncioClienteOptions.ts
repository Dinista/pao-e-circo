import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAnuncioClienteOptions1617816433822 implements MigrationInterface {
    name = 'updateAnuncioClienteOptions1617816433822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459"`);
        await queryRunner.query(`ALTER TABLE "anuncios" ALTER COLUMN "clienteId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "anuncios"."clienteId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anuncios" DROP CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459"`);
        await queryRunner.query(`COMMENT ON COLUMN "anuncios"."clienteId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ALTER COLUMN "clienteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "anuncios" ADD CONSTRAINT "FK_681d9806ed91e6f0bb7f4a9e459" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
