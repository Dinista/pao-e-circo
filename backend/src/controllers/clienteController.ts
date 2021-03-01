import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Cliente from "../models/Cliente";

class ClienteController {
  async create(request: Request, response: Response) {
    const {
      name,
      cpf,
      endereco,
      cidade,
      estado,
      email,
      senha,
      dataNasc,
    } = request.body;

    const clienteRepository = getRepository(Cliente);

    const cliente = clienteRepository.create({
      name,
      cpf,
      dataNasc,
      estado,
      endereco,
      cidade,
      email,
      senha,
    });

    await clienteRepository.save(cliente);

    return response.json("funfou se pa em");
  }

  async find(request: Request, response: Response) {
    const data = request.body;

    const clienteRepository = getRepository(Cliente);

    const cliente = await clienteRepository.find({ name: data.name });

    return response.json(cliente);
  }
}

export default ClienteController;
