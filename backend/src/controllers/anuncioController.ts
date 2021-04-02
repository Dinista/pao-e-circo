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
      foto1,
      foto2, 
      foto3,
      descricao,
      itemDesejado,
      valorEstimado,
      destaque,
      destaqueExpira,
    } = request.body;

    const anuncioRepository = getRepository(Anuncio);

    const anuncio = anuncioRepository.create({
      titulo,
      nomeObjeto,
      categoria,
      estadoConservacao,
      foto1,
      foto2,
      foto3,
      descricao,
      itemDesejado,
      valorEstimado,
      destaque,
      destaqueExpira,
    });

    await anuncioRepository.save(anuncio);

    return response.json(request.body);
  }

  async find(request: Request, response: Response) {
    const anuncioRepository = getRepository(Anuncio);
    console.log(request.params.id);
    const anuncio = await anuncioRepository.find({ id : request.params.id});
    console.log(anuncio[0]);
    return response.json(anuncio[0]);
  }

  async delete(request: Request, response: Response) {
    const anuncioRepository = getRepository(Anuncio);

    const results = await anuncioRepository.delete(request.params.id);

    return response.send(results);
  }

  async destacar(request: Request, response: Response) {
    const { dataExpiracao } = request.body;
    const anuncioRepository = getRepository(Anuncio);

    const resultado = await anuncioRepository
      .createQueryBuilder()
      .update(Anuncio)
      .set({ destaqueExpira: dataExpiracao })
      .where("id = :id", { id: request.params.id })
      .execute();
      return response.send( { resultado: resultado });
    }
}
export default AnuncioController;
