import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Cliente from "./Cliente";

@Entity("anuncios")
class Anuncio {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  titulo: string;

  @Column()
  nomeObjeto: string;

  @Column()
  categoria: string;

  @Column()
  estadoConservacao: string;
  /*
  @Column()
  fotos: ;
*/
  @Column()
  descricao: string;

  @Column()
  itemDesejado: string;

  @Column()
  valorEstimado: number;
}

export default Anuncio;
