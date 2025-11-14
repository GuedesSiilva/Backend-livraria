import { db } from "../config/db.js";

// ============================
// LISTAR RESERVAS
// ============================
export const listarReservas = async (req, res) => {
  try {
    const sql = `
    SELECT 
    u.id AS id_usuario,
    u.nome AS nome_usuario,
    l.id AS id_livro,
    l.titulo AS titulo_livro,
    l.autor AS autor_livro
    FROM reservas r
    JOIN usuarios u ON r.usuario_id = u.id
    JOIN livros l ON r.livro_id = l.id
    ORDER BY r.data_retirada DESC;
    `;

    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    res.status(500).json({ message: "Erro ao buscar as reservas" });
  }
};

// ============================
// CRIAR RESERVA
// ============================

export const criarReserva = async (req, res) => {
  try {
    const { usuario_id, livro_id, data_devolucao} = req.body;

    // validação simples
    if (!usuario_id || !livro_id || !data_devolucao) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos: usuario_id, livro_id e data de devolução" });
    }

    const data_retirada = new Date();

    await db.query(
      `INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao)
       VALUES (?, ?, ?, ?);`
      , [usuario_id, livro_id, data_retirada, data_devolucao]);

    await db.query(
      `UPDATE livros SET ativo = false WHERE id = ?;`
      , [livro_id]);

    res.status(201).json({ message: "Reserva efetuada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ message: "Erro ao criar reserva" });
  }
};

// ============================
// EXCLUIR RESERVA
// ============================

export async function DeletarReservas(req, res) {
    try {
        await db.execute("DELETE FROM reservas WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Reserva deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};