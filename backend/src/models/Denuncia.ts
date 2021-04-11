import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Anuncio from "./Anuncio";

@Entity("denuncias")
class Denuncia {
  @PrimaryGeneratedColumn("uuid")
  idDenuncia: string;
 
  @ManyToOne(() => Anuncio, anuncio => anuncio.denuncias, {
    eager: true
  }) 
  anuncio: Anuncio;

  @Column()
  idDenunciante: string;

  @Column()
  categoria: string;

  @Column()
  comentario: string;
}

export default Denuncia;
