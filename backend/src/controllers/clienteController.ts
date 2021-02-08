import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Cliente from "../models/Cliente";

class ClienteController {
  async create(request: Request, response: Response) {
    const { name, cpf, endereco, cidade, email, senha, nota } = request.body;

    const clienteRepository = getRepository(Cliente);

    const cliente = clienteRepository.create({
      name,
      cpf,
      endereco,
      cidade,
      email,
      senha,
      nota,
    });

    await clienteRepository.save(cliente);

    return response.json(request.body);
  }
}

export default ClienteController;
