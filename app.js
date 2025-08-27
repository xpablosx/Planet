// Configuração da API da NASA
const NASA_API_KEY = 'DEMO_KEY'; // Para uso em produção, obtenha uma chave própria em https://api.nasa.gov/
const NASA_API_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Função para pesquisar planetas
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

    // Busca nos dados dos planetas
    for (let dado of dados) {
        const titulo = dado.titulo.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        const tags = dado.tags.toLowerCase();

        if (titulo.includes(campoPesquisaLower) || 
            descricao.includes(campoPesquisaLower) || 
            tags.includes(campoPesquisaLower)) {
            
            resultados += criarItemResultado(dado);
        }
    }

    // Exibe resultados ou mensagem de não encontrado
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

// Função para limpar a pesquisa
function limparPesquisa() {
    const campoPesquisa = document.getElementById("campo-pesquisa");
    const section = document.getElementById("resultados-pesquisa");
    
    campoPesquisa.value = "";
    section.innerHTML = "";
    campoPesquisa.focus();
}

// Função para buscar foto da NASA
async function buscarFotoNASA() {
    const dataInput = document.getElementById("data-nascimento");
    const resultContainer = document.getElementById("nasa-result");
    
    if (!dataInput.value) {
        resultContainer.innerHTML = `
            <div class="error-message">
                Por favor, selecione uma data para buscar a foto astronômica.
            </div>
        `;
        return;
    }

    const dataSelecionada = new Date(dataInput.value + 'T00:00:00');
    const dataMinima = new Date('1995-06-16');
    const dataMaxima = new Date();
    
    // Validação de data
    if (dataSelecionada < dataMinima) {
        resultContainer.innerHTML = `
            <div class="error-message">
                A data deve ser posterior a 16 de junho de 1995, quando começou o arquivo APOD da NASA.
            </div>
        `;
        return;
    }
    
    if (dataSelecionada > dataMaxima) {
        resultContainer.innerHTML = `
            <div class="error-message">
                Não é possível buscar fotos de datas futuras.
            </div>
        `;
        return;
    }

    // Exibe loading
    resultContainer.innerHTML = `
        <div class="nasa-photo-container">
            <p>🚀 Buscando sua foto astronômica...</p>
        </div>
    `;

    try {
        const dataFormatada = formatarDataParaAPI(dataSelecionada);
        const response = await fetch(`${NASA_API_BASE_URL}?api_key=${NASA_API_KEY}&date=${dataFormatada}`);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const data = await response.json();
        exibirFotoNASA(data, dataSelecionada);
        
    } catch (error) {
        console.error('Erro ao buscar foto da NASA:', error);
        resultContainer.innerHTML = `
            <div class="error-message">
                Erro ao buscar a foto astronômica. Tente novamente mais tarde.
                <br><small>Detalhes: ${error.message}</small>
            </div>
        `;
    }
}

// Função para formatar data para a API da NASA (YYYY-MM-DD)
function formatarDataParaAPI(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Função para exibir a foto da NASA
function exibirFotoNASA(data, dataSelecionada) {
    const resultContainer = document.getElementById("nasa-result");
    const dataFormatada = dataSelecionada.toLocaleDateString('pt-BR');
    
    let conteudoHTML = `
        <div class="nasa-photo-container">
            <h3>${data.title}</h3>
            <p class="photo-date">📅 Foto do dia ${dataFormatada}</p>
    `;
    
    // Verifica se é imagem ou vídeo
    if (data.media_type === 'image') {
        conteudoHTML += `
            <img src="${data.url}" alt="${data.title}" loading="lazy">
        `;
    } else if (data.media_type === 'video') {
        conteudoHTML += `
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <iframe src="${data.url}" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                        frameborder="0" 
                        allowfullscreen>
                </iframe>
            </div>
        `;
    }
    
    conteudoHTML += `
            <p><strong>Explicação:</strong> ${data.explanation}</p>
    `;
    
    // Adiciona informações de copyright se disponível
    if (data.copyright) {
        conteudoHTML += `<p><small><strong>Créditos:</strong> ${data.copyright}</small></p>`;
    }
    
    conteudoHTML += `
            <p><small>Fonte: <a href="https://apod.nasa.gov/" target="_blank" rel="noopener">NASA Astronomy Picture of the Day</a></small></p>
        </div>
    `;
    
    resultContainer.innerHTML = conteudoHTML;
    
    // Scroll suave para o resultado
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Event listeners para melhor UX
document.addEventListener('DOMContentLoaded', function() {
    const campoPesquisa = document.getElementById("campo-pesquisa");
    const dataInput = document.getElementById("data-nascimento");
    
    // Pesquisa ao pressionar Enter
    campoPesquisa.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            pesquisar();
        }
    });
    
    // Busca foto da NASA ao pressionar Enter
    dataInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarFotoNASA();
        }
    });
    
    // Define data máxima como hoje
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('max', hoje);
});

// Função para mostrar dica sobre a API Key (para desenvolvimento)
function mostrarDicaAPIKey() {
    console.log(`
    🚀 DICA PARA DESENVOLVEDORES:
    
    Este site usa a DEMO_KEY da NASA que tem limitações:
    - 30 requisições por hora por IP
    - 50 requisições por dia por IP
    
    Para uso em produção, obtenha sua própria chave gratuita em:
    https://api.nasa.gov/
    
    Depois substitua a variável NASA_API_KEY no código.
    `);
}

// Mostra a dica no console
mostrarDicaAPIKey();

