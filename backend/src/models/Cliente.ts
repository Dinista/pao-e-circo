import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clientes")
class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @Column()
  nota: number;
}

export default Cliente;
