import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Denuncia from "../models/Denuncia";


class DenunciaController {
  async create(request: Request, response: Response) {
    
    const {
      categoria,
      comentario,
      idDenunciante,
      anuncio
    } = request.body;

    const denunciaRepository = getRepository(Denuncia);

    const denuncia = denunciaRepository.create({
      categoria,
      comentario,
      idDenunciante,
      anuncio
    });
    await denunciaRepository.save(denuncia);

    return response.json(request.body);
  }

  async find(request: Request, response: Response) {
    const denunciaRepository = getRepository(Denuncia);
    
    const denuncia = await denunciaRepository.find({ idDenuncia : request.params.id});
    
    return response.json(denuncia[0]);
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
    const denunciaRepository = getRepository(Denuncia);

    const results = await denunciaRepository.delete(request.params.id);

    return response.send(results);
  }
}

export default DenunciaController;