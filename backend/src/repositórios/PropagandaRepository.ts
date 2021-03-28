import Propaganda from "../models/Propaganda";
import { v4 as uuidv4 } from "uuid";

interface ICreatePropagandaDTO {
  imageName: string;
  empresaContratante: string;
  dataExpiracao: string;
  id?: string;
}

class PropagandaRepository {
  private propagandas: Propaganda[] = [];

  public async save(propaganda: Propaganda): Promise<Propaganda> {
    const findIndex = this.propagandas.findIndex(
      (findPropaganda) => findPropaganda.id === propaganda.id
    );

    this.propagandas[findIndex] = propaganda;

    return propaganda;
  }

  public async findById(id: string): Promise<Propaganda | undefined> {
    const findPropaganda = this.propagandas.find(
      (Propaganda) => Propaganda.id === id
    );

    return findPropaganda;
  }

  public async findByImagem(image: string): Promise<Propaganda | undefined> {
    const findPropaganda = this.propagandas.find(
      (propaganda) => propaganda.imageName === image
    );

    return findPropaganda;
  }

  public findAll() {
    const findPropagandas = this.propagandas;

    return findPropagandas;
  }

  public updateEmpresa(id: string, empresaContratante: string) {
    const propaganda = this.propagandas.findIndex((obj) => obj.id == id);
    this.propagandas[propaganda].empresaContratante = empresaContratante;
    return this.propagandas[propaganda].empresaContratante;
  }

  public updateImagem(id: string, image: string) {
    const propaganda = this.propagandas.findIndex((obj) => obj.id == id);
    this.propagandas[propaganda].imageName = image;
    return this.propagandas[propaganda].imageName;
  }

  public updateData(id: string, dataExpiracao: string) {
    const propaganda = this.propagandas.findIndex((obj) => obj.id == id);
    this.propagandas[propaganda].dataExpiracao = dataExpiracao;
    return this.propagandas[propaganda].dataExpiracao;
  }

  public async create(
    propagandaData: ICreatePropagandaDTO
  ): Promise<Propaganda> {
    const propaganda = new Propaganda();

    const checkUserExists = await this.findByImagem(propagandaData.imageName);
    if (checkUserExists) throw new Error("Propaganda já existe");

    Object.assign(
      propaganda,
      {
        id: uuidv4(),
      },
      propagandaData
    );
    this.propagandas.push(propaganda);

    return propaganda;
  }
}

export default PropagandaRepository;
