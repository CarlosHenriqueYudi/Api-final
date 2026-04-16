const db = require("./database");

db.serialize(() => {
  db.run("DELETE FROM livros");
  db.run("DELETE FROM autores");
  db.run("DELETE FROM sqlite_sequence WHERE name='livros'");
  db.run("DELETE FROM sqlite_sequence WHERE name='autores'");

  db.run("INSERT INTO autores (nome) VALUES ('Machado de Assis')");
  db.run("INSERT INTO autores (nome) VALUES ('George Orwell')");
  db.run("INSERT INTO autores (nome) VALUES ('J.R.R. Tolkien')");
  db.run("INSERT INTO autores (nome) VALUES ('Stephen King')");
  db.run("INSERT INTO autores (nome) VALUES ('J.K. Rowling')");
  db.run("INSERT INTO autores (nome) VALUES ('Fiódor Dostoiévski')");
  db.run("INSERT INTO autores (nome) VALUES ('Jane Austen')");

  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Dom Casmurro', 1, 1899)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Memórias Póstumas de Brás Cubas', 1, 1881)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Quincas Borba', 1, 1891)");

  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('1984', 2, 1949)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('A Revolução dos Bichos', 2, 1945)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Homenagem à Catalunha', 2, 1938)");

  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('O Hobbit', 3, 1937)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('O Senhor dos Anéis', 3, 1954)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('O Silmarillion', 3, 1977)");

  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('It', 4, 1986)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('O Iluminado', 4, 1977)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Carrie', 4, 1974)");

  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Harry Potter e a Pedra Filosofal', 5, 1997)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Harry Potter e a Câmara Secreta', 5, 1998)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Harry Potter e o Prisioneiro de Azkaban', 5, 1999)");

  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Crime e Castigo', 6, 1866)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Os Irmãos Karamazov', 6, 1880)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('O Idiota', 6, 1869)");

  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Orgulho e Preconceito', 7, 1813)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Razão e Sensibilidade', 7, 1811)");
  db.run("INSERT INTO livros (titulo, autor_id, ano) VALUES ('Emma', 7, 1815)");
});

console.log("Banco populado com livros reais (20+)");

