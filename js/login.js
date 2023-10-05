// Função para verificar o token de acesso e redirecionar
function verificarEredirecionar() {
  const accessTokenArmazenado = localStorage.getItem('accessToken');
  
  if (accessTokenArmazenado) {
    redirecionarParaPaginaInicial(); // Redireciona diretamente se o token estiver presente
  } else {
    cliente.requestAccessToken(); // Se não houver um token no localStorage, solicita o token
  }
}

// Função para redirecionar para a página inicial
function redirecionarParaPaginaInicial() {
  window.location.href = 'public/pagina_inicial.html';
}

// Função para obter informações do perfil do usuário
async function obterInformacoesDoPerfil(accessToken) {
  const endpointPerfil = 'https://www.googleapis.com/oauth2/v2/userinfo';

  try {
    const resposta = await fetch(endpointPerfil, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!resposta.ok) {
      throw new Error('Erro ao obter informações do perfil');
    }

    return await resposta.json();
  } catch (erro) {
    lidarComErroNoPerfil(erro);
  }
}

// Função para lidar com erros ao obter informações do perfil
function lidarComErroNoPerfil(erro) {
  localStorage.removeItem('accessToken');
  throw erro;
}

// Função para inicializar o cliente e redirecionar para a próxima página
const cliente = google.accounts.oauth2.initTokenClient({
  client_id: '333702500691-rb1g1hnlmi05pq1jf7ve0ab1cu55k1iu.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  callback: async (respostaToken) => {
    if (google.accounts.oauth2.hasGrantedAllScopes(respostaToken,
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email')) {
      console.log('Todos os escopos concedidos! Redirecionando para a próxima página...');
      const accessToken = respostaToken.access_token;
      localStorage.setItem('accessToken', accessToken);

      // Depois de obter as informações do perfil do usuário
      const dadosPerfil = await obterInformacoesDoPerfil(accessToken);

      // Salvar as informações do usuário no localStorage
      localStorage.setItem('user', JSON.stringify(dadosPerfil));

      redirecionarParaPaginaInicial();
    }
  },
});













// INPUT SELECT
// Seleciona o elemento <select>
const selectElement = document.getElementById('tipoUsuario');

// Seleciona o elemento <span> que deve ser mostrado/ocultado
const emailSpan = document.getElementById('emailAdequando');

selectElement.addEventListener('change', function modoDeEntrada() {
  // Verifica o valor da opção selecionada
  if (selectElement.value === 'aluno') {
    emailSpan.textContent = "@al.educacao.sp.gov.br";
  } else if (selectElement.value === 'professor') {
    emailSpan.textContent = "@professor.educacao.sp.gov.br";
  } else if (selectElement.value === 'manutencao') {
    // Remove o conteúdo, independentemente da opção anterior
    emailSpan.textContent = "";
  }
});

