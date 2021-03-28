import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Cliente from "../models/Cliente";
import Notificacoes from "../models/Notificacoes";

class NotificacoesController {
  async create(request: Request, response: Response) {
    const { ofertanteId, anuncianteId, anuncioId, texto } = request.body;

    const clienteRepository = getRepository(Cliente);
    const notificacoesRepository = getRepository(Notificacoes);

    const notificacao = notificacoesRepository.create({
      ofertanteId,
      anuncianteId,
      anuncioId,
      texto,
    });
    await notificacoesRepository.save(notificacao);

    await clienteRepository
      .createQueryBuilder()
      .update(Cliente)
      .set({ notificacoes: notificacao.id })
      .where("id = :id", { id: anuncianteId })
      .execute();

    return response.json("funfou se pa em");
  }

  async find(request: Request, response: Response) {
    const { name } = request.body;

    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.find({ name: name });
    return response.json(cliente[0]);
  }
}

export default NotificacoesController;
