import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Anuncio from "./Anuncio";
import Cliente from "./Cliente";

@Entity("notificacoes")
class Notificacoes {
  @PrimaryGeneratedColumn("uuid")
  idNotificacao: string;

  @ManyToOne(() => Anuncio, (anuncio) => anuncio.notificacoesTroca)
  @JoinColumn()
  anuncio: Anuncio;

  @ManyToOne(() => Anuncio, (anuncio) => anuncio.notificacoesTroca)
  @JoinColumn()
  ofertaTroca: Anuncio;

  @ManyToOne(() => Cliente, (Cliente) => Cliente.notificacoesTrocaOfertante, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  ofertante: Cliente;

  @ManyToOne(() => Cliente, (Cliente) => Cliente.notificacoesTrocaAnunciante, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  anunciante: Cliente;

  @Column()
  texto: string;
}

export default Notificacoes;
