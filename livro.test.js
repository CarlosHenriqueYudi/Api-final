const request = require("supertest");
const app = require("./server");
const db = require("./database");

let token;
let livroId;

describe("API Livros", () => {

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ usuario: "admin" });

    token = res.body.token;
  });

  it("GET /api/livros", async () => {
    const res = await request(app).get("/api/livros");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/livros", async () => {
    const res = await request(app)
      .post("/api/livros")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Livro Teste",
        autor_id: 1,
        ano: 2024
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");

    livroId = res.body.id;
  });

  it("GET /api/livros/:id", async () => {
    const res = await request(app).get(`/api/livros/${livroId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("GET /api/livros/999", async () => {
    const res = await request(app).get("/api/livros/999");
    expect(res.statusCode).toBe(404);
  });

  it("PUT /api/livros/:id", async () => {
    const res = await request(app)
      .put(`/api/livros/${livroId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Livro Atualizado",
        autor_id: 1,
        ano: 2025
      });

    expect(res.statusCode).toBe(200);
  });

  it("PUT /api/livros/999", async () => {
    const res = await request(app)
      .put("/api/livros/999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Teste",
        autor_id: 1,
        ano: 2025
      });

    expect(res.statusCode).toBe(404);
  });

  it("POST /api/livros inválido", async () => {
    const res = await request(app)
      .post("/api/livros")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "",
        autor_id: null,
        ano: "abc"
      });

    expect(res.statusCode).toBe(400);
  });

  it("DELETE /api/livros/:id", async () => {
    const res = await request(app)
      .delete(`/api/livros/${livroId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});

afterAll((done) => {
  db.close(done);
});
