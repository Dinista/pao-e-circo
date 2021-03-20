import express from "express";
import ClienteController from "./controllers/clienteController";
import AnuncioController from "./controllers/anuncioController";
import PropagandaController from "./controllers/propagandaController";

const routes = express.Router();

const clienteController = new ClienteController();
const propagandaController = new PropagandaController();
const anuncioController = new AnuncioController();

//clientes
routes.post("/clientes", clienteController.create);
routes.post("/clientess", clienteController.find);

//anuncios
routes.post("/anuncios", anuncioController.create);
routes.get("/anuncios", anuncioController.find);

//propagandas
routes.post("/propaganda", propagandaController.create);
routes.get("/propaganda", propagandaController.index);

export default routes;
