import express from "express";
import {
  ListarUsuarios,
  ObterUsuarios,
  CriarUsuario,
  AtualizarUsuarios,
  DeletarUsuarios
} from "../controllers/usuario.controllers.js";

const router = express.Router();


router.get("/usuarios", ListarUsuarios);
router.get("/usuarios/:id", ObterUsuarios);
router.post("/usuarios", CriarUsuario);
router.put("/usuarios/:id", AtualizarUsuarios);
router.delete("/usuarios/:id", DeletarUsuarios);