import { Request, Response } from "express";
import Notificacoes from "../models/NotificacaoTroca";
import { getConnection, getRepository } from "typeorm";
import Cliente from "../models/Cliente";

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
}

export default NotificacoesTrocaController;
