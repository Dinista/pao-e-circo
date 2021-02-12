import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Anuncios")
class Anuncio {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  titulo: string;

  @Column()
  objeto: string;

  @Column()
  categoria: string;

  @Column()
  conservacao: string;

  @Column()
  fotos: FileList;

  @Column()
  descricao: string;

  @Column()
  desejados: string;

  @Column()
  valor: number;
}

export default Anuncio;
