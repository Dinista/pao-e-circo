import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Anuncio from "../models/Anuncio";

class AnuncioController {
    async create(request: Request, response: Response) {
        const { titulo, nomeObjeto, categoria, estadoConservacao, /*fotos,*/ descricao, itemDesejado, valorEstimado } = request.body;

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
        console.log(anuncio);
        await anuncioRepository.save(anuncio);

        return response.json(request.body);
    }

    async find(request: Request, response: Response) {
        const { data } = request.body;
    
        const anuncioRepository = getRepository(Anuncio);
    
        const anuncio = await anuncioRepository.findOneOrFail(data);
    
        return response.json(anuncio);
    }
}

export default AnuncioController;
