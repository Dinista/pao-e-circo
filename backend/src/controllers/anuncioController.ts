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
    const { titulo } = request.body;
    console.log(request.body);
    const anuncioRepository = getRepository(Anuncio);
    const anuncio = await anuncioRepository.find({ titulo : titulo });
    return response.json(anuncio[0]);
  }

  async find2(request: Request, response: Response) {
    const anuncioRepository = getRepository(Anuncio);
    const anuncio = await anuncioRepository.find({ titulo : request.params.id});
    console.log(request.params.id);
    console.log(anuncio[0]);
    return response.json(anuncio[0]);
  }
}

export default AnuncioController;
