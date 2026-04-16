const express = require("express");
const router = express.Router();
const db = require("./database");
const { gerarToken, autenticar } = require("./auth");

router.get("/livros", (req, res) => {
  let { titulo, autor_id, ano, sort, order, page = 1, limit = 5 } = req.query;

  let query = "SELECT * FROM livros WHERE 1=1";
  let params = [];

  if (titulo) {
    query += " AND titulo LIKE ?";
    params.push(`%${titulo}%`);
  }

  if (autor_id) {
    query += " AND autor_id = ?";
    params.push(autor_id);
  }

  if (ano) {
    query += " AND ano = ?";
    params.push(ano);
  }

  if (sort) {
    const ordem = order === "desc" ? "DESC" : "ASC";
    query += ` ORDER BY ${sort} ${ordem}`;
  }

  const offset = (page - 1) * limit;
  query += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({
      pagina: parseInt(page),
      limite: parseInt(limit),
      total: rows.length,
      dados: rows
    });
  });
});

router.get("/livros", (req, res) => {
  db.all("SELECT * FROM livros", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

router.get("/livros-com-autores", (req, res) => {
  const query = `
    SELECT livros.id, livros.titulo, autores.nome as autor, livros.ano
    FROM livros
    JOIN autores ON livros.autor_id = autores.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

router.get("/livros/:id", (req, res) => {
  db.get("SELECT * FROM livros WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(row);
  });
});

router.post("/livros", autenticar, (req, res) => {
  const { titulo, autor_id, ano } = req.body;

  if (!titulo || !autor_id || typeof ano !== "number") {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  db.run(
    "INSERT INTO livros (titulo, autor_id, ano) VALUES (?, ?, ?)",
    [titulo, autor_id, ano],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });

      res.status(201).json({
        id: this.lastID,
        titulo,
        autor_id,
        ano
      });
    }
  );
});

router.put("/livros/:id", autenticar, (req, res) => {
  const { titulo, autor_id, ano } = req.body;

  db.run(
    "UPDATE livros SET titulo=?, autor_id=?, ano=? WHERE id=?",
    [titulo, autor_id, ano, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) {
        return res.status(404).json({ erro: "Livro não encontrado" });
      }
      res.json({ id: req.params.id, titulo, autor_id, ano });
    }
  );
});

router.delete("/livros/:id", autenticar, (req, res) => {
  db.run("DELETE FROM livros WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }
    res.json({ mensagem: "Livro removido" });
  });
});

module.exports = router;
