import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Cliente from "./Cliente";
import Comentario from "./Comentario";
import Denuncia from "./Denuncia";
import NotificacaoTroca from "./NotificacaoTroca";

@Entity("anuncios")
class Anuncio {
  @PrimaryGeneratedColumn("uuid")
  id: string;
 
  @ManyToOne(() => Cliente, anuncios => Anuncio, {
    eager: true,
    onDelete: "CASCADE"
  }) 
  cliente: Cliente;

  @Column()
  titulo: string;

  @Column()
  nomeObjeto: string;

  @Column()
  categoria: string;

  @Column()
  estadoConservacao: string;

  @Column()
  foto1: string;

  @Column()
  foto2: string;
  
  @Column()
  foto3: string;

  @Column()
  descricao: string;

  @Column()
  itemDesejado: string;

  @Column()
  valorEstimado: number;

  @Column()
  destaque: boolean;

  @Column()
  destaqueExpira: string;

  @OneToMany(() => Denuncia, denuncia => denuncia.anuncio, {
    cascade: true
  })
  denuncias: Denuncia[];

  @OneToMany(() => Comentario, comentario => comentario.anuncio, {
    cascade: true
  })
  comentarios: Comentario[];

  @ManyToMany(() => Cliente, cliente => cliente.anunciosSeguidos)
  @JoinTable()
  seguidores: Cliente[];
  
  @OneToMany(() => NotificacaoTroca, notificacao => notificacao.anuncio, {
    nullable: true,
    cascade: true
  })
  notificacoesTroca: NotificacaoTroca[];

}

export default Anuncio;

