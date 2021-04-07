import {MigrationInterface, QueryRunner} from "typeorm";

export class updateClienteNumTrocas1617802212702 implements MigrationInterface {
    name = 'updateClienteNumTrocas1617802212702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" ADD "numTrocas" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "numTrocas"`);
    }

}
