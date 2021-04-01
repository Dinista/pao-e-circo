import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notificacoes")
class Notificacoes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  ofertanteId: string;

  @Column()
  anuncianteId: string;

  @Column()
  anuncioId: string;

  @Column()
  texto: string;
}

export default Notificacoes;
