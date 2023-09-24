const textoCitacao = document.querySelector(".textoCitacao"),
  tempoCitacao = document.getElementById("proximaCitacao"),
  nomeAutor = document.querySelector(".nomeAutor"),
  botaoFala = document.querySelector(".botaoFala"),
  botaoCopia = document.querySelector(".botaoCopia"),
  botaoTwitter = document.querySelector(".twitter"),
  synth = speechSynthesis;

let tempoAteProximaCitacao = 0; // Variável para armazenar o tempo restante até a próxima citação

async function buscarCitacaoAleatoria() {
  return fetch("https://api.quotable.io/random")
    .then((resposta) => resposta.json())
    .then((resultado) => {
      let citacao = resultado.content;

      // Traduza a citação para o português
      return fetch(
        `https://api.mymemory.translated.net/get?q=${citacao}&langpair=en-GB|pt-BR`
      )
        .then((res) => res.json())
        .then((dados) => {
          resultado.content = dados.responseData.translatedText;
          return resultado;
        });
    });
}

function exibirCitacao(citacao) {
  textoCitacao.innerText = `"${citacao.content}"`;
  nomeAutor.innerText = citacao.author;
}

function salvarCitacaoNoLocalStorage(citacao) {
  const hoje = new Date().toLocaleDateString();
  localStorage.setItem("citacao", JSON.stringify({ citacao, data: hoje }));
}

function carregarCitacaoDoLocalStorage() {
  const citacaoArmazenada = localStorage.getItem("citacao");
  if (citacaoArmazenada) {
    const { citacao, data } = JSON.parse(citacaoArmazenada);
    const hoje = new Date().toLocaleDateString();
    if (hoje === data) {
      exibirCitacao(citacao);
      atualizarTempoAteProximaCitacao();
    } else {
      buscarEExibirCitacao();
    }
  } else {
    buscarEExibirCitacao();
  }
}

function buscarEExibirCitacao() {
  buscarCitacaoAleatoria().then((citacao) => {
    exibirCitacao(citacao);
    salvarCitacaoNoLocalStorage(citacao);
    atualizarTempoAteProximaCitacao();
  });
}

function atualizarTempoAteProximaCitacao() {
  const dataProximaCitacao = new Date();
  dataProximaCitacao.setDate(dataProximaCitacao.getDate() + 1); // Adicionar 1 dia
  dataProximaCitacao.setHours(0, 0, 0, 0); // Definir hora para 00:00:00
  tempoAteProximaCitacao = dataProximaCitacao - new Date();

  // Exibir o tempo restante
  exibirTempoAteProximaCitacao();
}

function exibirTempoAteProximaCitacao() {
  const horas = Math.floor((tempoAteProximaCitacao % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((tempoAteProximaCitacao % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tempoAteProximaCitacao % (1000 * 60)) / 1000);

  tempoCitacao.innerText = `Próxima Citação: ${horas}h ${minutos}m ${segundos}s`;
}

function atualizarTempoReal() {
  tempoAteProximaCitacao -= 1000; // Subtrai 1 segundo do tempo restante
  if (tempoAteProximaCitacao <= 0) {
    buscarEExibirCitacao(); // Busca e exibe uma nova citação quando o tempo se esgota
  } else {
    exibirTempoAteProximaCitacao(); // Atualiza o tempo restante no elemento HTML
  }
}

botaoCopia.addEventListener("click", () => {
  navigator.clipboard.writeText(textoCitacao.innerText);
});

botaoTwitter.addEventListener("click", () => {
  let urlTweet = `https://twitter.com/intent/tweet?text=${textoCitacao.innerText}`;
  window.open(urlTweet, "_blank");
});

// Chame carregarCitacaoDoLocalStorage ao carregar a página para exibir a citação do dia e o tempo até a próxima citação.
carregarCitacaoDoLocalStorage();

// Inicialize a atualização em tempo real do tempo restante a cada segundo (1000 ms)
setInterval(atualizarTempoReal, 1000);
