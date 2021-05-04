import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import Anuncio from "../models/Anuncio";
import Comentario from "../models/Comentario";
class ComentarioController {
  async create(request: Request, response: Response) {
    const { anuncio, comentador, texto, data } = request.body;

    const comentarioRepository = getRepository(Comentario);

    const comentario = comentarioRepository.create({
      anuncio,
      comentador,
      texto,
      data,
    });
    await comentarioRepository.save(comentario);

    return response.json(request.body);
  }

  async find(request: Request, response: Response) {
    const comentarioRepository = getRepository(Comentario);

    const comentario = await comentarioRepository.find({
      idComentario: request.params.id,
    });

    return response.json(comentario[0]);
  }

  async findCommentsByAnuncioId(request: Request, response: Response) {
    const anuncio = await getConnection()
      .getRepository(Anuncio)
      .createQueryBuilder("anuncio")
      .leftJoinAndSelect("anuncio.comentarios", "comentario")
      .where("comentario.anuncio = :idAnuncio", {idAnuncio: request.params.id,})
      .leftJoinAndSelect("comentario.comentador", "comentador")
      .getMany();
    return response.json(anuncio);
  }

  async delete(request: Request, response: Response) {
    const comentarioRepository = getRepository(Comentario);

    const results = await comentarioRepository.delete(request.params.id);

    return response.send(results);
  }

  async deleteCommentsByAnuncioId(request: Request, response: Response) {
    const comentarioRepository = getRepository(Comentario);

    const comentarios = await getConnection()
    .getRepository(Comentario)
    .createQueryBuilder("comentario")
    .where("comentario.anuncio = :idAnuncio", {
      idAnuncio: request.params.id,
    })
    .getMany();
    
    for(let comentario of comentarios){
      await comentarioRepository.delete(comentario.idComentario);
    }
    return response;
  }
}

export default ComentarioController;
