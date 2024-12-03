const express = require('express');
const { inserir, listarFilmes, buscarPorId, atualizar, deletar } = require('./crud');  // Importando as funções de CRUD de filmes

const app = express();
const port = 3000;

app.use(express.json());  // Para lidar com requisições JSON

// Endpoint para inserir um filme
app.post('/filmes', async (req, res) => {
  try {
    const filme = req.body;
    const filmeInserido = await inserir(filme);
    res.status(201).json(filmeInserido);  // Responde com o filme inserido
  } catch (error) {
    console.error("Erro ao inserir filme:", error);
    res.status(500).json({ message: "Erro ao inserir filme" });
  }
});

// Endpoint para listar todos os filmes
app.get('/filmes', async (req, res) => {
  try {
    const filmes = await listarFilmes();
    res.status(200).json(filmes);  // Responde com a lista de filmes
  } catch (error) {
    console.error("Erro ao listar filmes:", error);
    res.status(500).json({ message: "Erro ao listar filmes" });
  }
});

// Endpoint para buscar um filme por ID
app.get('/filmes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filme = await buscarPorId(id);
    if (!filme) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    res.status(200).json(filme);  // Responde com o filme encontrado
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    res.status(500).json({ message: "Erro ao buscar filme" });
  }
});

// Endpoint para atualizar um filme
app.put('/filmes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filme = req.body;
    const filmeAtualizado = await atualizar(id, filme);
    res.status(200).json(filmeAtualizado);  // Responde com o filme atualizado
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    res.status(500).json({ message: "Erro ao atualizar filme" });
  }
});

// Endpoint para deletar um filme
app.delete('/filmes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filmeDeletado = await deletar(id);
    if (!filmeDeletado) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    res.status(200).json(filmeDeletado);  // Responde com o filme deletado
  } catch (error) {
    console.error("Erro ao deletar filme:", error);
    res.status(500).json({ message: "Erro ao deletar filme" });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
