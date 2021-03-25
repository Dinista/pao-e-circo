import Notificacoes from "../models/Notificacoes";
import { v4 as uuidv4 } from "uuid";

interface INotificacoesDTO {
  ofertanteId: string;
  anuncianteId: string;
  anuncioId: string;
  texto: string;
}

class ClienteRepository {
  private notificacoes: Notificacoes[] = [];

  public async save(Notificacoes: Notificacoes): Promise<Notificacoes> {
    const findIndex = this.notificacoes.findIndex(
      (findCliente) => findCliente.id === Notificacoes.id
    );

    this.notificacoes[findIndex] = Notificacoes;

    return Notificacoes;
  }

  public async create(clienteData: INotificacoesDTO): Promise<Notificacoes> {
    const notificacoes = new Notificacoes();

    Object.assign(
      notificacoes,
      {
        id: uuidv4(),
      },
      clienteData
    );
    this.notificacoes.push(notificacoes);

    return notificacoes;
  }
}

export default ClienteRepository;
