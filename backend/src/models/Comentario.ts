import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, JoinTable } from "typeorm";
import Anuncio from "./Anuncio";
import Cliente from "./Cliente";

@Entity("comentarios")
class Comentario {
  @PrimaryGeneratedColumn("uuid")
  idComentario: string;
 
  @ManyToOne(() => Anuncio, anuncio => anuncio.comentarios)
  @JoinColumn()
  anuncio: Anuncio;

  @ManyToOne(type => Cliente, {
    eager: true,
    nullable: true
  })
  comentador: Cliente;

  @Column()
  texto: string;

  @Column()
  data: Date;
}

export default Comentario;