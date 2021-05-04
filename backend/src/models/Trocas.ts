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

@Entity("trocas")
class Trocas {
    @PrimaryGeneratedColumn("uuid")
    idTroca: string;

    @Column()
    idCliente1: string;

    @Column()
    idAnuncioCliente1: string;

    @Column()
    idCliente2: string;
    
    @Column()
    idAnuncioCliente2: string;

    @Column({
        type: "timestamp",
        default: "now()"
      })
      data: Date;
}
//
export default Trocas;