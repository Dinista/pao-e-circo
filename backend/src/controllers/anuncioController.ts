import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Anuncio from "../models/Anuncio";

class AnuncioController {
    async create(request: Request, response: Response) {
        const { titulo, objeto, categoria, conservacao, fotos, descricao, desejados, valor } = request.body;

        const anuncioRepository = getRepository(Anuncio);

        const anuncio = anuncioRepository.create({
            titulo, 
            objeto, 
            categoria, 
            conservacao, 
            fotos, 
            descricao,
            desejados, 
            valor,
        });

        await anuncioRepository.save(anuncio);

        return response.json(request.body);
    }
}