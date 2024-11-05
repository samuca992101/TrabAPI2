const express = require('express');
const catalogo = require('./crud'); // Importe o arquivo CRUD
const app = express();
const port = 3000;

// Middleware para parsing de JSON
app.use(express.json()); // Deve estar aqui, antes das rotas

// Rota raiz
app.get('/', (req, res) => {
    res.send('API do Catálogo Funcionando!');
});

// Rota para adicionar um item
app.post('/catalogo', (req, res) => {
    const { titulo, genero, tipo } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!titulo || !genero || !tipo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    } else {
        const novoItem = catalogo.adicionarItemDeMidia(titulo, genero, tipo);
        return res.status(201).json({
            message: 'Item adicionado com sucesso!',
            item: novoItem // Inclui o novo item na resposta
        });
    }
});

// Rota para visualizar todos os itens
app.get('/catalogo', (req, res) => {
    const itens = catalogo.visualizarTodosOsItens();
    res.status(200).json(itens);
});

// Rota para atualizar um item por ID
app.put('/catalogo/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, genero, tipo } = req.body;
    const itemAtualizado = catalogo.atualizarItemDeMidia(parseInt(id), titulo, genero, tipo);
    if (itemAtualizado) {
        res.status(200).json(itemAtualizado);
    } else {
        res.status(404).json({ error: 'Item não encontrado.' });
    }
});

// Rota para excluir um item por ID
app.delete('/catalogo/:id', (req, res) => {
    const { id } = req.params;
    const itemRemovido = catalogo.excluirItemDeMidia(parseInt(id));
    if (itemRemovido) {
        res.status(200).json(itemRemovido);
    } else {
        res.status(404).json({ error: 'Item não encontrado.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
