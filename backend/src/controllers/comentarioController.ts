import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Comentario from "../models/Comentario";

class ComentarioController {
  async create(request: Request, response: Response) {
    
    const {
      anuncio,
      idComentador,
      texto,
      data
    } = request.body;

    const comentarioRepository = getRepository(Comentario);

    const comentario = comentarioRepository.create({
      anuncio,
      idComentador,
      texto,
      data
    });
    await comentarioRepository.save(comentario);

    return response.json(request.body);
  }

  async find(request: Request, response: Response) {
    const comentarioRepository = getRepository(Comentario);
    
    const comentario = await comentarioRepository.find({ idComentario : request.params.id});
    
    return response.json(comentario[0]);
  }
  /*
  async findAllByUserId(request: Request, response: Response) {
    const anuncio = await getConnection()
    .getRepository(Anuncio)
    .createQueryBuilder("anuncio")
    .leftJoinAndSelect("anuncio.cliente", "cliente")
    .where("cliente.id = :idCliente", {idCliente : request.params.id})
    .getMany();   
    return response.json(anuncio);
  }
  */
  async delete(request: Request, response: Response) {
    const comentarioRepository = getRepository(Comentario);

    const results = await comentarioRepository.delete(request.params.id);

    return response.send(results);
  }
}

export default ComentarioController;