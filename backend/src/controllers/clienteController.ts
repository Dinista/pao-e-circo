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

    const checkClienteExists = await clienteRepository.findOne({
      where: { email },
    });

    if (checkClienteExists) {
      return response.status(400).send({ Erro: "E-mail já cadastrado" });
    }

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

  async login(request: Request, response: Response) {
    const {
      id,
      senha,
    } = request.body;

    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.find({ id : id });
    const isRight = (cliente[0].senha == senha) ? true : false; 
    return response.json(isRight); 
  }

  async find(request: Request, response: Response) {
    const { name } = request.body;

    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.find({ name: name });
    return response.json(cliente[0]);
  }
}

export default ClienteController;
