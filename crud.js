// crud.js
const catalogo = {
    itensDeMidia: [],
    idAtual: 1,

    // CRIAR
    adicionarItemDeMidia(titulo, genero, tipo) {
        const novoItem = {
            id: this.idAtual++,
            titulo: titulo,
            genero: genero,
            tipo: tipo // 'filme' ou 'serie'
        };
        this.itensDeMidia.push(novoItem);
        console.log(`Item adicionado: ${novoItem.titulo}`);
    },

    // LER (Visualizar todos)
    visualizarTodosOsItens() {
        return this.itensDeMidia;
    },

    // ATUALIZAR
    atualizarItemDeMidia(id, novoTitulo, novoGenero, novoTipo) {
        const item = this.itensDeMidia.find(midia => midia.id === id);
        if (item) {
            item.titulo = novoTitulo || item.titulo;
            item.genero = novoGenero || item.genero;
            item.tipo = novoTipo || item.tipo;
            console.log(`Item atualizado: ${item.titulo}`);
        } else {
            console.log(`Item com ID ${id} não encontrado.`);
        }
    },

    // EXCLUIR
    excluirItemDeMidia(id) {
        const indice = this.itensDeMidia.findIndex(midia => midia.id === id);
        if (indice !== -1) {
            const itemRemovido = this.itensDeMidia.splice(indice, 1);
            console.log(`Item removido: ${itemRemovido[0].titulo}`);
        } else {
            console.log(`Item com ID ${id} não encontrado.`);
        }
    }
};

module.exports = catalogo; // Certifique-se de que esta linha está correta
