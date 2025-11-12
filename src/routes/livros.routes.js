import express from "express";
import {
    ListarLivros,
    ObterLivros,
    PostarLivros,
    AtualizarLivros,
    DeletarLivros,
    ListarAvaliacoesDeLivros
} from "../controllers/livros.controllers.js";

const router = express.Router();


router.get("/", ListarLivros);
router.get("/:id", ObterLivros);
router.get("/:avaliacoes", ListarAvaliacoesDeLivros);
router.post("/", PostarLivros);
router.put("/:id", AtualizarLivros);
router.delete("/:id", DeletarLivros);

export default router;