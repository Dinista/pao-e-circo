import express from "express";
import ClienteController from "./controllers/clienteController";
import AnuncioController from "./controllers/anuncioController";

const routes = express.Router();

const clienteController = new ClienteController();

const anuncioController = new AnuncioController();

//clientes
routes.post("/clientes", clienteController.create);
routes.post("/clientess", clienteController.find);

routes.post("/anuncios", anuncioController.create);
routes.get("/anuncios", anuncioController.find);

export default routes;
