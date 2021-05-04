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

@Entity("clientesNotas")
class ClienteNotas {
    @PrimaryGeneratedColumn("uuid")
    idNota: string;

    @Column()
    idClienteReceiver: string;

    @Column({ nullable: true, type: "float" })
    nota: number;

    @Column()
    idClienteGiver: string;
}
//
export default ClienteNotas;