import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Propaganda from "../models/Propaganda";

class PropagandaController {
  async create(request: Request, response: Response) {
    const { imageName, empresaContratante, dataExpiracao } = request.body;
    const propagandaRepository = getRepository(Propaganda);

    const propaganda = propagandaRepository.create({
      imageName,
      empresaContratante,
      dataExpiracao,
    });

    await propagandaRepository.save(propaganda);

    return response.json("funfou se pa em");
  }

  async index(request: Request, response: Response) {
    const propagandas = await getRepository(Propaganda)
      .createQueryBuilder("propagandas")
      .getMany();

    return response.json({ propagandas: propagandas });
  }

  async delete(request: Request, response: Response) {
    const propagandaRepository = getRepository(Propaganda);

    const results = await propagandaRepository.delete(request.params.id);

    return response.send(results);
  }
}

export default PropagandaController;
