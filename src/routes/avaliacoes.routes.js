import express from "express";
import { listarAvaliacoes, criarAvaliacao ,  ListarAvaliacoesDeLivros} from "../controllers/avaliacoes.controllers.js";

const router = express.Router();

// Rota para listar todas as avaliações
router.get("/", listarAvaliacoes);

router.get("/media", ListarAvaliacoesDeLivros);

// Rota para criar uma nova avaliação
router.post("/", criarAvaliacao);


export default router;