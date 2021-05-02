import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import Trocas from "../models/Trocas";

class trocaController{
    
    async createTroca(request: Request, response: Response) {
        const { idCliente1, idAnuncioCliente1, idCliente2, idAnuncioCliente2} = request.body
        const TrocasRepository = getRepository(Trocas);
        const TrocasCria = TrocasRepository.create({
            idCliente1,
            idAnuncioCliente1,
            idCliente2,
            idAnuncioCliente2
        });
        await TrocasRepository.save(TrocasCria);
    
        return response.json("funfou se pa em");
      }

      async findAllTrocas(request: Request, response: Response) {
        const TrocasRepository = getRepository(Trocas);
        try {
          const trocas = await TrocasRepository.find( {where : [{ idCliente2: request.params.id }, { idCliente1: request.params.id }]});
          return response.send(trocas);
        } catch {
          return response.status(404).json({ error: "Nenhuma troca encontrada" });
        }
      }

}

export default trocaController;
