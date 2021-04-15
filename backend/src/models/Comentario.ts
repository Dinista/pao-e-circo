import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Anuncio from "./Anuncio";

@Entity("comentarios")
class Comentario {
  @PrimaryGeneratedColumn("uuid")
  idComentario: string;
 
  @ManyToOne(() => Anuncio, anuncio => anuncio.comentarios, {
    eager: true
  }) 
  anuncio: Anuncio;

  @Column()
  idComentador: string;

  @Column()
  texto: string;

  @Column()
  data: Date;
}

export default Comentario;