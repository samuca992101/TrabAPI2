// crud.test.js
const catalogo = require('./crud'); // Ajuste o caminho se necessário

describe('Testes do CRUD do Catálogo', () => {
    beforeEach(() => {
        // Redefinir o estado do catálogo antes de cada teste
        catalogo.itensDeMidia = [];
        catalogo.idAtual = 1; // Resetar o ID atual se necessário
    });
    // CENÁRIO DE SUCESSO
    test('deve adicionar um item ao catálogo', () => {
        catalogo.adicionarItemDeMidia('A Origem', 'Ficção Científica', 'filme');
        expect(catalogo.itensDeMidia.length).toBe(1);
        expect(catalogo.itensDeMidia[0].titulo).toBe('A Origem');
    });
    // CENÁRIO DE EXCEÇÃO
    test('Quando inserir um filme sem gênero, não deve retornar e não insere na lista', () => {
        // Criado o cenário para o filme inserido sem gênero
        const filmeInseridoErrado = {
            id: 1,
            titulo: "A Origem",
            tipo: 'filme'
        };

        // Inserindo o filme sem gênero
        const filmeInserido = catalogo.adicionarItemDeMidia("A Origem", "filme");

        // O filme não deve retornar
        expect(filmeInserido).toEqual(undefined);

        // Não deve inserir na lista o filme errado
        expect(catalogo.itensDeMidia).not.toContainEqual(filmeInseridoErrado);
    });
    test('deve visualizar todos os itens', () => {
        catalogo.adicionarItemDeMidia('Breaking Bad', 'Crime', 'serie');
        catalogo.adicionarItemDeMidia('Lost','Suspense','serie')
        const itens = catalogo.visualizarTodosOsItens();
        expect(itens.length).toBe(2); // Alterado para 1, já que estamos resetando o estado
    });

    test('deve atualizar um item por ID', () => {
        catalogo.adicionarItemDeMidia('A Origem', 'Ficção Científica', 'filme');
        catalogo.atualizarItemDeMidia(1, 'A Origem Atualizado', 'Ação', 'filme');
        expect(catalogo.itensDeMidia[0].titulo).toBe('A Origem Atualizado');
        expect(catalogo.itensDeMidia[0].genero).toBe('Ação');
    });

    test('deve excluir um item por ID', () => {
        catalogo.adicionarItemDeMidia('A Origem', 'Ficção Científica', 'filme');
        catalogo.adicionarItemDeMidia('Breaking Bad', 'Crime', 'serie');
        catalogo.excluirItemDeMidia(1); // Tente excluir o primeiro item
        expect(catalogo.itensDeMidia.length).toBe(1); // Deve restar 1 item
    });

    test('não deve excluir um item inexistente', () => {
        catalogo.adicionarItemDeMidia('A Origem', 'Ficção Científica', 'filme');
        catalogo.excluirItemDeMidia(99); // ID inexistente
        expect(catalogo.itensDeMidia.length).toBe(1); // A contagem deve permanecer 1
    });

    test('não deve atualizar um item inexistente', () => {
        catalogo.adicionarItemDeMidia('A Origem', 'Ficção Científica', 'filme');
        catalogo.atualizarItemDeMidia(99, 'Título Inexistente', 'Gênero', 'Tipo'); // ID inexistente
        expect(catalogo.itensDeMidia[0].titulo).toBe('A Origem'); // O título deve permanecer o mesmo
    });
});
