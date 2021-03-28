import Cliente from "../models/Cliente";
import { v4 as uuidv4 } from "uuid";

interface ICreateClienteDTO {
  name: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  email: string;
  senha: string;
  dataNasc: string;
}

class ClienteRepository {
  private clientes: Cliente[] = [];

  public async save(Cliente: Cliente): Promise<Cliente> {
    const findIndex = this.clientes.findIndex(
      (findCliente) => findCliente.id === Cliente.id
    );

    this.clientes[findIndex] = Cliente;

    return Cliente;
  }

  public async findById(id: string): Promise<Cliente | undefined> {
    const findCliente = this.clientes.find((Cliente) => Cliente.id === id);

    return findCliente;
  }
  public async findByEmail(email: string): Promise<Cliente | undefined> {
    const findCliente = this.clientes.find(
      (cliente) => cliente.email === email
    );

    return findCliente;
  }

  public findByName(name: string) {
    const findCliente = this.clientes.find((cliente) => cliente.name === name);
    return findCliente?.name;
  }

  public async create(clienteData: ICreateClienteDTO): Promise<Cliente> {
    const cliente = new Cliente();

    const checkUserExists = await this.findByEmail(clienteData.email);
    if (checkUserExists) throw new Error("usuário já existe");

    Object.assign(
      cliente,
      {
        id: uuidv4(),
      },
      clienteData
    );
    this.clientes.push(cliente);

    return cliente;
  }
}

export default ClienteRepository;
