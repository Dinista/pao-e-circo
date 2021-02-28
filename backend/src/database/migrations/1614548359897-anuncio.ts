import { MigrationInterface, QueryRunner, Table } from "typeorm";

/*
    1. criar tabelas
    2. yarn typeorm migration:run 
    ? 2.1 yarn typeorm migration:revert
    3. verificar se foi criada a tabela no postgres
    4. fazer a funcao create no anuncioController
    5. mandar uma requisição pelo insomnia pra ver se salva no banco 
*/
 
export class anuncio1614548359897 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
              new Table({
                name: "anuncios",
                columns: [
                  {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                  },
                  {
                    name: "titulo",
                    type: "varchar",
                  },
                  {
                    name: "nomeObjeto",
                    type: "varchar",
                  },
                  {
                    name: "categoria",
                    type: "varchar",
                  },
                  {
                    name: "estadoConservacao",
                    type: "varchar",
                  },
                  {
                    name: "descricao",
                    type: "varchar",
                  },
                  {
                    name: "itemDesejado",
                    type: "varchar",
                  },
                  {
                    name: "valorEstimado",
                    type: "float",
                  },
                ],
              })
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("anuncios");
    }

}
