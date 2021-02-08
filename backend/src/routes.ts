import express from "express";
import ClienteController from "./controllers/clienteController";

const routes = express.Router();

const clienteController = new ClienteController();

//clientes
routes.post("/clientes", clienteController.create);

export default routes;
