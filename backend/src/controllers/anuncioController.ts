import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Anuncio from "../models/Anuncio";

class AnuncioController {
  async create(request: Request, response: Response) {
    const {
      titulo,
      nomeObjeto,
      categoria,
      estadoConservacao,
      /*fotos,*/ descricao,
      itemDesejado,
      valorEstimado,
    } = request.body;

    const anuncioRepository = getRepository(Anuncio);

    const anuncio = anuncioRepository.create({
      titulo,
      nomeObjeto,
      categoria,
      estadoConservacao,
      /*fotos,*/
      descricao,
      itemDesejado,
      valorEstimado,
    });

    await anuncioRepository.save(anuncio);

    return response.json(request.body);
  }

  async find(request: Request, response: Response) {
    const { anuncio } = request.body;

    const clienteRepository = getRepository(Anuncio);
    console.log(request.body);
    const cliente = await clienteRepository.find({ titulo: anuncio });
    console.log(cliente[0]);
    return response.json(cliente[0]);
  }
}

export default AnuncioController;
