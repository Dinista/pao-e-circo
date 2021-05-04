import express from "express";
import ClienteController from "./controllers/clienteController";
import AnuncioController from "./controllers/anuncioController";
import PropagandaController from "./controllers/propagandaController";
import NotificacoesTrocaController from "./controllers/notificacoesTrocaController";
import DenunciaController from "./controllers/denunciaController";
import ComentarioController from "./controllers/comentarioController";
import trocaController from "./controllers/trocasController";

const routes = express.Router();

const clienteController = new ClienteController();
const propagandaController = new PropagandaController();
const anuncioController = new AnuncioController();
const notificacoesTrocaController = new NotificacoesTrocaController();
const denunciaController = new DenunciaController();
const comentarioController = new ComentarioController();
const TrocaController = new trocaController();

//clientes
routes.post("/clientes", clienteController.create);
routes.post("/clientess", clienteController.find);
routes.post("/findbynameusuario", clienteController.findbyname);
routes.post("/findclientebyid/:id", clienteController.findById);
routes.get("/perfil/:id", clienteController.findById);
routes.post("/login", clienteController.login);
routes.put("/perfilUpdateAvatar/:id", clienteController.UpdateAvatar);
routes.put("/perfilUpdateCapa/:id", clienteController.UpdateCapa);
routes.put("/perfilUpdateDados/:id", clienteController.UpdateDados);
routes.put("/perfilUpdateAdress/:id", clienteController.UpdateAdress);
routes.post("/createNota", clienteController.createNota);
routes.post("/findNota", clienteController.findNota);
routes.put("/updateNota", clienteController.UpdateNota);
routes.get("/findAllNotas/:id", clienteController.findAllNotas);
routes.delete("/clienteDelete/:id", clienteController.delete);
routes.get("/findByemail/:email", clienteController.findbyEmail);

//anuncios
routes.post("/anuncios", anuncioController.create);
routes.put("/editaranuncio/:id", anuncioController.editar);
routes.post("/anuncioss/:id", anuncioController.find);
routes.post("/anunciosall/:id", anuncioController.findAllByUserId);
routes.delete("/anuncios/:id", anuncioController.delete);
routes.put("/anunciodestaque/:id", anuncioController.destacar);
routes.post("/verificaseguidor/", anuncioController.verificaSeguidor);
routes.put("/seguir", anuncioController.seguir);
routes.put("/deixardeseguir", anuncioController.deixarDeSeguir);
routes.get("/findallanuncios", anuncioController.findAll);
routes.post("/findbyname", anuncioController.findByName);
routes.get("/findanuncionome/:id", anuncioController.findName);
routes.get("/findAllSeguindo/:id", anuncioController.findAllSeguindo);
routes.get("/findByCategoria/:categoria", anuncioController.findByCategoria);
routes.get("/findAllDestaques", anuncioController.findAllDestaques);
//denuncias
routes.post("/denunciar", denunciaController.create);
routes.delete("/deleteDenunciasByAnuncioId/:id", denunciaController.deleteDenunciasByAnuncioId);

//comentarios
routes.post("/comentar", comentarioController.create);
routes.post(
  "/encontrarcomentariosanuncio/:id",
  comentarioController.findCommentsByAnuncioId
);
routes.delete("/deleteCommentsByAnuncioId/:id", comentarioController.deleteCommentsByAnuncioId);

//propagandas
routes.post("/propaganda", propagandaController.create);
routes.get("/propaganda", propagandaController.index);
routes.delete("/propaganda/:id", propagandaController.delete);
routes.put("/propagandaempresa/:id", propagandaController.updateEmpresa);
routes.put("/propagandadata/:id", propagandaController.updateDataExpiracao);
routes.put("/propagandaimage/:id", propagandaController.updateImagem);

//notificações
routes.post("/notificacoes", notificacoesTrocaController.create);
routes.delete("/notificacoes/:id", notificacoesTrocaController.delete);
routes.get("/notificacoes", notificacoesTrocaController.findAllNotifications);
routes.delete("/notificacoesanuncios/:id", notificacoesTrocaController.deleteNotificacoesByAnuncioId);
routes.delete("/notificacoesanunciosofertados/:id", notificacoesTrocaController.deleteNotificacoesByAnuncioOfertadoId);
routes.post("/troca", TrocaController.createTroca);
routes.get("/findAllTrocas/:id", TrocaController.findAllTrocas);


export default routes;
