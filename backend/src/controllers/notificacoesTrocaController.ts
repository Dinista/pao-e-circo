import { Request, Response } from "express";
import Notificacoes from "../models/NotificacaoTroca";
import { getConnection, getRepository } from "typeorm";
import Cliente from "../models/Cliente";
import NotificacaoTroca from "../models/NotificacaoTroca";

class NotificacoesTrocaController {
  async create(request: Request, response: Response) {
    const { ofertante, anunciante, anuncio, texto, ofertaTroca } = request.body;

    console.log(request.body);

    const notificacoesRepository = getRepository(Notificacoes);

    const notificacao = notificacoesRepository.create({
      anunciante,
      ofertante,
      anuncio,
      ofertaTroca,
      texto,
    });

    await notificacoesRepository.save(notificacao);

    return response.json({ notificacao: notificacao });
  }

  async delete(request: Request, response: Response) {
    const notificacoesRepository = getRepository(Notificacoes);

    const results = await notificacoesRepository.delete(request.params.id);

    return response.json("tá deletado fião");
  }

  async findAllNotifications(request: Request, response: Response) {
    const { id } = request.body;
    const notificacoes = await getConnection()
      .getRepository(Cliente)
      .createQueryBuilder("notificacoes")
      .leftJoinAndSelect(
        "notificacoes.notificacoesTrocaAnunciante",
        "anunciante"
      )
      .where("anunciante.id = :idCliente", {
        idAnuncio: id,
      })
      .getMany();
    return response.json(notificacoes);
  }

  async find(request: Request, response: Response) {
    const { name } = request.body;

    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.find({ name: name });
    return response.json(cliente[0]);
  }

  
  async deleteNotificacoesByAnuncioOfertadoId(request: Request, response: Response) {
    const notificacaoTrocaRepository = getRepository(NotificacaoTroca);

    const notificacoesTroca = await getConnection()
    .getRepository(NotificacaoTroca)
    .createQueryBuilder("notificacaoTroca")
    .where("notificacaoTroca.ofertaTroca = :idAnuncio", {
      idAnuncio: request.params.id,
    })
    .getMany();

    console.log("Foram encontrados " + notificacoesTroca.length + " oferta de trocas vindo desse ID");

    for(let notificacao of notificacoesTroca){
      await notificacaoTrocaRepository.delete(notificacao.idNotificacao);
    }
    return response;
  }

  async deleteNotificacoesByAnuncioId(request: Request, response: Response) {
    const notificacaoTrocaRepository = getRepository(NotificacaoTroca);

    const notificacoesTroca = await getConnection()
    .getRepository(NotificacaoTroca)
    .createQueryBuilder("notificacaoTroca")
    .where("notificacaoTroca.anuncio = :idAnuncio", {
      idAnuncio: request.params.id,
    })
    .getMany();
    
    console.log("ESSE ANUNCIO RECEBEU " + notificacoesTroca.length + " OFERTAS!");

    for(let notificacao of notificacoesTroca){
      await notificacaoTrocaRepository.delete(notificacao.idNotificacao);
    }
    return response;
  }
}

export default NotificacoesTrocaController;
