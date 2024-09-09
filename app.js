function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    let campoPesquisa = document.getElementById("campo-pesquisa").value

    // se campoPesquisa for uma string sem nada
    if (!campoPesquisa) {
        section.innerHTML = `<p class="nada">Nada foi encontrado. Você precisa digitar o nome de um Planeta</p>`
        return 
    }

    campoPesquisa = campoPesquisa.toLowerCase()

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";
    let titulo = ""; 
    let descricao = "";
    let tags = "";
    let imagem = "";

    // Itera sobre cada dado da lista de dados
    for (let dado of dados) {
        titulo = dado.titulo.toLowerCase()
        descricao = dado.descricao.toLowerCase()
        tags = dado.tags.toLowerCase()
        imagem = dado.tags.toLowerCase()
        // se titulo includes campoPesquisa
        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa) || imagem.includes(campoPesquisa)) {
            // cria um novo elemento
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href=${dado.link} target="_blank">Mais informações</a>
                <div class="planeta-container">
                <img src=${dado.imagem}>
                </div>
            </div>
        `;
        }
    }

    if (!resultados) {
        resultados = `<p class="nada">Nada foi encontrado</p>`
    }

    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}

function buscar() {
    // Pega o valor da entrada
    let data = document.getElementById('data').value;
  
    // Separa os componentes da data (considerando o formato Ano/Mes/Dia)
    let ano = data.substring(0, 2);
    let mes = data.substring(3, 5);
    let dia = data.substring(6, 8);
  
    // Converte para o formato desejado (AAMMdd)
    let novaData = dia + mes + ano;
  
    // Cria o link completo
    let link = 'https://apod.nasa.gov/apod/ap' + novaData + '.html';
  
    // Atualiza o link na página
    document.getElementById('link').href = link;
  }