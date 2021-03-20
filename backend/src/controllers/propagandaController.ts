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
    const propagandaRepository = getRepository(Propaganda);

    const propagandas = await getRepository(Propaganda)
      .createQueryBuilder("propagandas")
      .getMany();

    return response.json({ propagandas: propagandas });
  }
}

export default PropagandaController;
