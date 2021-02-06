import express, { request, response } from "express";
import cors from "cors";
import "./database/connection";
import routes from "./routes";
import { getRepository } from "typeorm";
import Cliente from "./database/models/Cliente";
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.post("/clientes", async (request, response) => {
  const { name, endereco, cidade, email, senha, nota } = request.body;

  const clientesRepository = getRepository(Cliente);

  const cliente = clientesRepository.create({
    name,
    endereco,
    cidade,
    email,
    senha,
    nota,
  });

  await clientesRepository.save(cliente);

  return response.json(request.body);
});

app.get("/teste", (request, response) => {
  return response.json("coé");
});

app.listen(3333);
