const jwt = require("jsonwebtoken");

const SECRET = "segredo";

function gerarToken(usuario) {
  return jwt.sign({ usuario }, SECRET, { expiresIn: "1h" });
}

function autenticar(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const token = auth.split(" ")[1];
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ erro: "Token inválido" });
  }
}

module.exports = { gerarToken, autenticar };
