import Cliente from "../models/Cliente";
import Anuncio from "../models/Anuncio";
import { v4 as uuidv4 } from "uuid";

interface ICreateAnuncioDTO {
  titulo: string;
  cliente: string;
  nomeObjeto: string;
  categoria: string;
  estadoConservacao: string;
  foto1: string;
  foto2: string;
  foto3: string;
  descricao: string;
  itemDesejado: string;
  valorEstimado: number;
  destaque: boolean;
  destaqueExpira: string; 
}

class AnuncioRepository {
  private anuncios: Anuncio[] = [];

  public async save(Anuncio: Anuncio): Promise<Anuncio> {
    const findIndex = this.anuncios.findIndex(
      (findAnuncio) => findAnuncio.id === Anuncio.id
    );

    this.anuncios[findIndex] = Anuncio;

    return Anuncio;
  }

  public async findById(id: string): Promise<Anuncio | undefined> {
    const findAnuncio = this.anuncios.find((Anuncio) => Anuncio.id === id);

    return findAnuncio;
  }

  public findByObject(nameObject: string) {
    const findAnuncio = this.anuncios.find((anuncio) => anuncio.nomeObjeto === nameObject);
    return findAnuncio?.nomeObjeto;
  }

  public async create(anuncioData: ICreateAnuncioDTO): Promise<Anuncio> {
    const anuncio = new Anuncio();

    Object.assign(
      anuncio,
      {
        id: uuidv4(),
      },
      anuncioData
    );
    this.anuncios.push(anuncio);

    return anuncio;
  }
}

export default AnuncioRepository;