import { Request, Response } from "express";
import NotificacaoTroca from "../models/NotificacaoTroca";
import { getRepository } from "typeorm";
import Cliente from "../models/Cliente";

class NotificacoesTrocaController {
  async create(request: Request, response: Response) {
    const { ofertante, anunciante, anuncio, texto } = request.body;

    const notificacoesRepository = getRepository(NotificacaoTroca);

    const notificacao = notificacoesRepository.create({
      anunciante,
      ofertante,
      anuncio,
      texto
    })

    await notificacoesRepository.save(notificacao);
  }

  async find(request: Request, response: Response) {
    const { name } = request.body;

    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.find({ name: name });
    return response.json(cliente[0]);
  }
}

export default NotificacoesTrocaController;
