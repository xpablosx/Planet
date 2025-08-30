// Configuração da API da NASA
const NASA_API_KEY = 'DEMO_KEY'; // Para uso em produção, obtenha uma chave própria em https://api.nasa.gov/
const NASA_API_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Função para pesquisar planetas (versão atualizada)
function pesquisar() {
    const section = document.getElementById("resultados-pesquisa");
    const campoPesquisa = document.getElementById("campo-pesquisa").value.trim();

    // Validação de entrada
    if (!campoPesquisa) {
        section.innerHTML = `<p class="nada">Nada foi encontrado. Você precisa digitar o nome de um planeta ou uma característica.</p>`;
        return;
    }

    const campoPesquisaLower = campoPesquisa.toLowerCase();
    let resultados = "";
    let matchExato = null;

    // Busca nos dados dos planetas
    for (let dado of dados) {
        const titulo = dado.titulo.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        const tags = dado.tags.toLowerCase();

        // Match exato no título → guarda o planeta
        if (titulo === campoPesquisaLower) {
            matchExato = dado;
            break; // já achou o planeta certo, pode parar
        }

        // Match parcial → adiciona na lista
        if (titulo.includes(campoPesquisaLower) || 
            descricao.includes(campoPesquisaLower) || 
            tags.includes(campoPesquisaLower)) {
            
            resultados += criarItemResultado(dado);
        }
    }

    // Se achou um planeta com match exato, mostra só ele
    if (matchExato) {
        resultados = criarItemResultado(matchExato);
    }

    // Se não achou nada em nenhum dos casos
    if (!resultados) {
        resultados = `<p class="nada">Nenhum planeta encontrado para "${campoPesquisa}". Tente termos como "vermelho", "maior", "anéis" ou nomes de planetas.</p>`;
    }

    section.innerHTML = resultados;
    
    // Scroll suave para os resultados
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Função para criar HTML do item de resultado
function criarItemResultado(dado) {
    return `
        <div class="item-resultado">
            <h2>
                <a href="${dado.link}" target="_blank" rel="noopener">${dado.titulo}</a>
            </h2>
            <p class="descricao-meta">${dado.descricao}</p>
            <a href="${dado.link}" target="_blank" rel="noopener">Mais informações na NASA</a>
            <div class="planeta-container">
                <img src="${dado.imagem}" alt="Imagem do planeta ${dado.titulo}" loading="lazy">
            </div>
        </div>
    `;
}

// O restante do código da NASA e eventos permanece igual...

