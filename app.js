

console.log("Mercurio");





function ver() {
    // Pega o valor da entrada
    let data = document.getElementById('data').value;

    const regexData = /^\d{2}\/\d{2}\/\d{2}$/;

if (!regexData.test(data)) {
alert("Por favor, insira uma data válida no formato dd/mm/aa (ex: 25/12/24).");
return; // Interrompe a função se a data for inválida
}
  
    // Separa os componentes da data (considerando o formato Ano/Mes/Dia)
    let ano = data.substring(0, 2);
    let mes = data.substring(3, 5);
    let dia = data.substring(6, 8);
  
    // Converte para o formato desejado (AAMMdd)
    let novaData = dia + mes + ano;
  
    // Cria o link completo
    let link = 'https://apod.nasa.gov/apod/ap' + novaData + '.html';
  
    // Atualiza o link na página
    window.location.href = link
  }