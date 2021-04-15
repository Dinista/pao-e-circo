import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Anuncio from "./Anuncio";
import Cliente from "./Cliente";

@Entity("notificacoes")
class Notificacoes {
  @PrimaryGeneratedColumn('uuid')
  idNotificacao: string;

  @ManyToOne(() => Anuncio, anuncio => anuncio.notificacoesTroca)
  @JoinColumn()
  anuncio: Anuncio;

  @ManyToOne(() => Cliente, Cliente => Cliente.notificacoesTrocaOfertante)
  @JoinColumn()
  ofertante: Cliente;

  @ManyToOne(() => Cliente, Cliente => Cliente.notificacoesTrocaAnunciante)
  @JoinColumn()
  anunciante: Cliente;
  
  @Column()
  texto: string;
}

export default Notificacoes;
