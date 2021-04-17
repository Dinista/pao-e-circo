import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import Cliente from "../models/Cliente";
import Notificacoes from "../models/NotificacaoTroca";

class NotificacoesTrocaController {
  async create(request: Request, response: Response) {
    const { ofertante, anunciante, anuncio, texto, ofertaTroca } = request.body;

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

  async findAllNotifications(request: Request, response: Response) {
    const { id } = request.body;
    const notificacoes = await getConnection()
      .getRepository(Notificacoes)
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
}

export default NotificacoesTrocaController;
