import {MigrationInterface, QueryRunner} from "typeorm";

export class updateClienteNotaNullable1617806120297 implements MigrationInterface {
    name = 'updateClienteNotaNullable1617806120297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "nota" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "clientes"."nota" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "clientes"."nota" IS NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ALTER COLUMN "nota" SET NOT NULL`);
    }

}
