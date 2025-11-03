import express from "express";
import db from "../db/connect.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM conteudos_libras";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados de Libras:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { titulo, descricao, video_url } = req.body;
  const sql = "INSERT INTO conteudos_libras (titulo, descricao, video_url) VALUES (?, ?, ?)";
  db.query(sql, [titulo, descricao, video_url], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar conteúdo:", err);
      return res.status(500).json({ error: "Erro ao adicionar conteúdo" });
    }
    res.status(201).json({ message: "Conteúdo adicionado com sucesso!" });
  });
});

export default router;
