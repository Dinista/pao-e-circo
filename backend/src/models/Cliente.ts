import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Anuncio from "./Anuncio";
import Notificacoes from "./Notificacoes";

@Entity("clientes")
class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @OneToMany(() => Anuncio, cliente => Cliente)
  anuncios: Anuncio[];

  @Column()
  name: string;

  @Column()
  endereco: string;

  @Column()
  cpf: string;

  @Column("simple-array", {
    nullable: true
  })
  notificacoes: string;

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

  @Column( {
    nullable: true
  })
  nota: number;

  @Column({
    nullable: true
  })
  numTrocas: number;
}

export default Cliente;
