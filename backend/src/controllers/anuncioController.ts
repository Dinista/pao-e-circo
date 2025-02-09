import { Request, Response } from "express";
import { getConnection, getManager, getRepository } from "typeorm";
import Anuncio from "../../src/models/Anuncio";

class AnuncioController {
  async create(request: Request, response: Response) {
    const {
      titulo,
      cliente,
      nomeObjeto,
      categoria,
      estadoConservacao,
      foto1,
      foto2,
      foto3,
      descricao,
      itemDesejado,
      valorEstimado,
      destaque,
      destaqueExpira,
    } = request.body;

    const anuncioRepository = getRepository(Anuncio);

    const anuncio = anuncioRepository.create({
      titulo,
      cliente,
      nomeObjeto,
      categoria,
      estadoConservacao,
      foto1,
      foto2,
      foto3,
      descricao,
      itemDesejado,
      valorEstimado,
      destaque,
      destaqueExpira,
    });

    await anuncioRepository.save(anuncio);

    return response.json(request.body);
  }

  async editar(request: Request, response: Response) {
    const {
      titulo,
      cliente,
      nomeObjeto,
      categoria,
      estadoConservacao,
      foto1,
      foto2,
      foto3,
      descricao,
      itemDesejado,
      valorEstimado,
      destaque,
      destaqueExpira,
    } = request.body;

    const anuncioRepository = getRepository(Anuncio);

    const resultado = await anuncioRepository
      .createQueryBuilder()
      .update(Anuncio)
      .set(request.body)
      .where("id = :id", { id: request.params.id })
      .execute();

    return response.send({ resultado: resultado });
  }

  async find(request: Request, response: Response) {
    const anuncioRepository = getRepository(Anuncio);

    const anuncio = await anuncioRepository.find({ id: request.params.id });

    return response.json(anuncio[0]);
  }

  async findName(request: Request, response: Response) {
    const anuncioRepository = getRepository(Anuncio);

    const anuncio = await anuncioRepository.find({ id: request.params.id });

    return response.json(anuncio[0].nomeObjeto);
  }

  async findByName(request: Request, response: Response) {
    const { anuncio } = request.body;
    console.log(anuncio);
    const entityManager = getManager();
    const someQuery = await entityManager.query(
      `
  SELECT id, titulo, foto1, descricao, "itemDesejado", "valorEstimado", "clienteId"
	FROM anuncios where titulo = '` +
      anuncio +
      `'
  `
    );
    console.log(someQuery);
    return response.json(someQuery);
  }

  async findAll(request: Request, response: Response) {
    const anuncioRepository = getRepository(Anuncio);
    const anuncios = await anuncioRepository.find({
      select: [
        "id",
        "foto1",
        "titulo",
        "descricao",
        "valorEstimado",
        "cliente",
      ],
    });
    return response.json({ anuncios: anuncios });
  }

  async findAllDestaques(request: Request, response: Response) {
    const anuncio = await getConnection()
      .getRepository(Anuncio)
      .createQueryBuilder("anuncio")
      .where("destaque = true")
      .getMany()
    return response.json(anuncio);
  }
  

  async findAllByUserId(request: Request, response: Response) {
    const anuncio = await getConnection()
      .getRepository(Anuncio)
      .createQueryBuilder("anuncio")
      .leftJoinAndSelect("anuncio.cliente", "cliente")
      .where("cliente.id = :idCliente", { idCliente: request.params.id })
      .getMany();
    return response.json(anuncio);
  }
  
  async findByCategoria(request: Request, response: Response) {
    try {
      const anuncioRepository = getRepository(Anuncio);
      const anuncio = await anuncioRepository.find({ categoria: request.params.categoria });
      if (anuncio.length == 0) {
        return response.json("Nenhum resultado obtido")
      }
      return response.json(anuncio);
    } catch {
      return response.json("Nenhum resultado obtido")
    }
  }

  async delete(request: Request, response: Response) {
    const anuncioRepository = getRepository(Anuncio);
    console.log("cheguei")
    const results = await anuncioRepository.delete(request.params.id);

    return response.send(results);
  }

  async destacar(request: Request, response: Response) {
    const { plano } = request.body;
    const anuncioRepository = getRepository(Anuncio);

    const time = new Date();
    time.setDate(time.getDate() + plano); // Adiciona X dias, de acordo com a escolha do usuario

    var dataExpiracao = time.toDateString();

    const resultado = await anuncioRepository
      .createQueryBuilder()
      .update(Anuncio)
      .set({ destaqueExpira: dataExpiracao, destaque: true })
      .where("id = :id", { id: request.params.id })
      .execute();

    return response.send({ resultado: resultado });
  }

  async verificaSeguidor(request: Request, response: Response) {
    const { idCliente, idAnuncio } = request.body;

    const anuncioRepository = getRepository(Anuncio);

    const segue = await anuncioRepository
      .createQueryBuilder("anuncio")
      .leftJoinAndSelect("anuncio.seguidores", "seguidor")
      .where("seguidor.id  = :idCliente1", { idCliente1: idCliente })
      .andWhere("anuncio.id = :idAnuncio1", { idAnuncio1: idAnuncio })
      .getMany();

    return response.send(segue);
  }

  async findAllSeguindo(request: Request, response: Response) {
    try {
      const anuncio = await getConnection()
        .getRepository(Anuncio)
        .createQueryBuilder("anuncio")
        .leftJoinAndSelect("anuncio.seguidores", "seguidor")
        .where("seguidor.id = :idCliente", { idCliente: request.params.id })
        .getMany();
      return response.json(anuncio);
    }catch(e){
      return response.json({});
    }
  }


  async seguir(request: Request, response: Response) {
    const { idCliente, idAnuncio } = request.body;

    await getConnection()
      .createQueryBuilder()
      .relation(Anuncio, "seguidores")
      .of(idAnuncio)
      .add(idCliente);

    return 1;
  }

  async deixarDeSeguir(request: Request, response: Response) {
    const { idCliente, idAnuncio } = request.body;

    await getConnection()
      .createQueryBuilder()
      .relation(Anuncio, "seguidores")
      .of(idAnuncio)
      .remove(idCliente);

    return 1;
  }
}

export default AnuncioController;
