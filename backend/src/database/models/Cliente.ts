import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clientes")
export default class Cliente {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  nota: number;
}
