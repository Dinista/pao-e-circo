import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Anuncio from "./Anuncio";
import NotificacaoTroca from "./NotificacaoTroca";

@Entity("clientes")
class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Anuncio, (cliente) => Cliente)
  anuncios: Anuncio[];

  @Column()
  name: string;

  @Column()
  endereco: string;

  @Column()
  cpf: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  dataNasc: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  capa: string;

  @Column({
    type: "timestamp",
    default: "now()"
  })
  data: Date;

  @Column({
    nullable: true,
  })
  nota: number;

  @Column({
    nullable: true,
  })
  numTrocas: number;

  @ManyToMany(() => Anuncio, (anuncio) => anuncio.seguidores)
  anunciosSeguidos: Anuncio[];

  @OneToMany(() => NotificacaoTroca, notificacao => notificacao.anunciante, {
    nullable: true
  })
  notificacoesTrocaAnunciante: NotificacaoTroca[];

  @OneToMany(() => NotificacaoTroca, notificacao => notificacao.ofertante, {
    nullable: true
  })
  notificacoesTrocaOfertante: NotificacaoTroca[];
  
}

//
export default Cliente;
