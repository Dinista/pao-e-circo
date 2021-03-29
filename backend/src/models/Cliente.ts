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
  
  @OneToMany(() => Anuncio, anuncio => anuncio.cliente)
  anuncios: Anuncio[];

  @Column()
  name: string;

  @Column()
  endereco: string;

  @Column()
  cpf: string;

  @Column("simple-array")
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

  @Column()
  nota: number;
}

export default Cliente;
