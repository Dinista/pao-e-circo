import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class notificacoes1616638175520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notificacoes",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "ofertanteId",
            type: "varchar",
          },
          {
            name: "anuncianteId",
            type: "varchar",
          },

          {
            name: "anuncioId",
            type: "varchar",
          },
          {
            name: "texto",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notificacoes");
  }
}
