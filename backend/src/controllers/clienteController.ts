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
    console.log(request.body);
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
    const { name } = request.body;

    const clienteRepository = getRepository(Cliente);
    console.log(request.body);
    const cliente = await clienteRepository.find({ name: name });
    console.log(cliente[0]);
    return response.json(cliente[0]);
  }
}

export default ClienteController;
