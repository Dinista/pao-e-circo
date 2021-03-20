import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("propagandas")
class Propaganda {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imageName: string;

  @Column()
  empresaContratante: string;

  @Column()
  dataExpiracao: string;
}

export default Propaganda;
