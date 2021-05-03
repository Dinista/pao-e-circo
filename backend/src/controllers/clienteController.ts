import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import Cliente from "../models/Cliente";
import ClienteNotas from "../models/ClienteNota";
import Denuncia from "../models/Denuncia";
import Trocas from "../models/Trocas";

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

    var crypto = require("crypto");

    const clienteRepository = getRepository(Cliente);

    const checkClienteExists = await clienteRepository.findOne({
      where: { email },
    });

    if (checkClienteExists) {
      return response.status(400).json({ Erro: "E-mail já cadastrado!" });
    }

    const passwaordHash = crypto
      .createHash("sha256")
      .update(senha)
      .digest("hex");

    const cliente = clienteRepository.create({
      name,
      cpf,
      dataNasc,
      estado,
      endereco,
      cidade,
      email,
      senha, //passwaordHash,
    });
    await clienteRepository.save(cliente);

    return response.json("funfou se pa em");
  }

  async findbyEmail(request: Request, response: Response) {
    const clienteRepository = getRepository(Cliente);
    const email = request.params.email;
    const checkClienteExists = await clienteRepository.findOne({
      where: { email },
    });

    if(checkClienteExists){
      return response.json({ passou: "E-mail cadastrado!" });
    }else{
      return response.json({erro: "E-mail não existe!"})
    }
  }


  async findbyname(request: Request, response: Response) {
    const { name } = request.body;
    const entityManager = getManager();
    const someQuery = await entityManager.query(
      `
      SELECT id, name, endereco, cpf, cidade, estado, "dataNasc", email, senha, nota, "numTrocas"
      FROM 	clientes where LOWER(name) like LOWER('` +
      `%${name}%` +
      `')
  `
    );
    return response.json(someQuery);
  }

  async login(request: Request, response: Response) {
    const { name, senha } = request.body;
    var crypto = require("crypto");

    const clienteRepository = getRepository(Cliente);
    try {
      //const senhaHash = crypto.createHash("sha256").update(senha).digest("hex");
      const cliente = await clienteRepository.find({ email: name });
      const isRight = cliente[0].senha == senha ? true : false;
      return response.json({ logou: isRight, cliente });
    } catch (err) {
      console.log("erro login back-end: " + err);

      return response.json({ logou: false });
    }
  }

  async find(request: Request, response: Response) {
    const { name } = request.body;

    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.find({ name: name });
    return response.json(cliente[0]);
  }

  async findById(request: Request, response: Response) {
    try {
      const clienteRepository = getRepository(Cliente);
      const cliente = await clienteRepository.find({ id: request.params.id });
      if (cliente.length == 0) {
        return response.json({ error: "Não existe" })
      }
      return response.json(cliente);
    } catch {
      return response.json({ error: "Não existe" })
    }
  }

  async UpdateAvatar(request: Request, response: Response) {
    const {
      avatar
    } = request.body
    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.createQueryBuilder()
      .update(Cliente).set({ avatar: avatar })
      .where("id = :id", { id: request.params.id })
      .execute();

    return response.send({ resultado: cliente });
  }

  async UpdateCapa(request: Request, response: Response) {
    const {
      capa
    } = request.body
    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.createQueryBuilder()
      .update(Cliente).set({ capa: capa })
      .where("id = :id", { id: request.params.id })
      .execute();

    return response.send({ resultado: cliente });
  }

  async UpdateDados(request: Request, response: Response) {
    const { name, email, senha } = request.body
    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.createQueryBuilder()
      .update(Cliente).set({ name: name, email: email, senha: senha })
      .where("id = :id", { id: request.params.id })
      .execute();

    return response.send({ resultado: cliente });
  }

  async UpdateAdress(request: Request, response: Response) {
    const { endereco, estado, cidade } = request.body
    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.createQueryBuilder()
      .update(Cliente).set({ endereco: endereco, estado: estado, cidade: cidade })
      .where("id = :id", { id: request.params.id })
      .execute();

    return response.send({ resultado: cliente });
  }

  async createNota(request: Request, response: Response) {
    const { idClienteReceiver, nota, idClienteGiver } = request.body
    const clienteNotasRepository = getRepository(ClienteNotas);
    const clienteNota = clienteNotasRepository.create({
      idClienteReceiver,
      nota,
      idClienteGiver
    });
    await clienteNotasRepository.save(clienteNota);

    return response.json("funfou se pa em");
  }


  async findNota(request: Request, response: Response) {
    const { idClienteReceiver, idClienteGiver } = request.body
    const clienteNotasRepository = getRepository(ClienteNotas);
    try {
      const nota = await clienteNotasRepository.find(
        {
          idClienteReceiver: idClienteReceiver,
          idClienteGiver: idClienteGiver
        });
      return response.send(nota);
    } catch {
      return response.status(404).json({ Erro: "Nota não encontrada" });
    }
  }


  async findAllNotas(request: Request, response: Response) {
    //const { idClienteReceiver} = request.body
    const clienteNotasRepository = getRepository(ClienteNotas);
    try {
      const nota = await clienteNotasRepository.find(
        { idClienteReceiver: request.params.id });
      return response.send(nota);
    } catch {
      return response.status(404).json({ error: "Notas não encontrada" });
    }
  }

  async UpdateNota(request: Request, response: Response) {
    const { idClienteReceiver, nota, idClienteGiver } = request.body
    const clienteRepository = getRepository(ClienteNotas);
    const clienteNota = await clienteRepository.createQueryBuilder()
      .update(ClienteNotas).set({ nota: nota })
      .where("idClienteReceiver  = :idClienteReceiver", { idClienteReceiver: idClienteReceiver })
      .andWhere("idClienteGiver = :idClienteGiver", { idClienteGiver: idClienteGiver })
      .execute();
    return response.send({ resultado: "it Worked!" });
  }

  async delete(request: Request, response: Response) {
    const NotasRepository = getRepository(ClienteNotas);
    const DenunciasRepository = getRepository(Denuncia);
    const TrocasRepository = getRepository(Trocas);
    const clienteRepository = getRepository(Cliente);

    //exluindo todas as notas
    const notas = await NotasRepository.find({ where: [{ idClienteGiver: request.params.id }, { idClienteReceiver: request.params.id }] });
    
    if (notas.length > 0) {
      for (let nota of notas) {
        await NotasRepository.delete(nota.idNota);
      }
    }

    //exluindo denuncias
    
    const denuncias = await DenunciasRepository.find({ idDenunciante: request.params.id });

    if (denuncias.length > 0) {
      for (let denuncia of denuncias) {
        await DenunciasRepository.delete(denuncia.idDenuncia);
      }
    }

    //exluindo trocas
    
    const trocas = await TrocasRepository.find({ where: [{ idCliente1: request.params.id }, { idCliente2: request.params.id }] });

    if (trocas.length > 0) {
      for (let troca of trocas) {
        await TrocasRepository.delete(troca.idTroca);
      }
    }

    //excluindo clientes e dependentes
    const results = await clienteRepository.delete(request.params.id);
    return response.send(results);
  }
}

export default ClienteController;
