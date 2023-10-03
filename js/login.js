function checkAndRedirect() {
  // Verifica se há um token de acesso no localStorage
  const storedAccessToken = localStorage.getItem('accessToken');

  if (storedAccessToken) {
    // Se houver um token no localStorage, redireciona diretamente para a página inicial do professor
    window.location.href = 'public/pagina_inicial.html';
  } else {
    // Se não houver um token no localStorage, solicita o token
    client.requestAccessToken();
  }
}

// Função para obter as informações do perfil do usuário
async function getProfileInformation(accessToken) {
  const profileEndpoint = 'https://www.googleapis.com/oauth2/v2/userinfo';

  try {
    // Faz uma requisição para obter as informações do perfil
    const response = await fetch(profileEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao obter informações do perfil');
    }

    return await response.json();
  } catch (error) {
    // Se ocorrer um erro, você pode remover o item do localStorage aqui
    localStorage.removeItem('accessToken');
    throw error; // Lança o erro novamente para que ele possa ser tratado em um nível superior, se necessário
  }
}

// Função para inicializar o cliente e redirecionar para a próxima página

const client = google.accounts.oauth2.initTokenClient({
client_id: '333702500691-rb1g1hnlmi05pq1jf7ve0ab1cu55k1iu.apps.googleusercontent.com',
scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
callback: (tokenResponse) => {
  // Verifica os escopos concedidos
  if (google.accounts.oauth2.hasGrantedAllScopes(tokenResponse,
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',)) {
    // Usuário concedeu todos os escopos necessários.
    console.log('Todos os escopos concedidos! Redirecionando para a próxima página...');

    // Armazena o token de acesso no localStorage
    const accessToken = tokenResponse.access_token;
    localStorage.setItem('accessToken', accessToken);

    // Redireciona para a próxima página
    window.location.href = 'public/pagina_inicial.html';
  }
},
});
















function acessar() {
  window.location.href = 'public/pagina_inicial.html';
}

// Seleciona o elemento <select>
const selectElement = document.getElementById('entrarComo');

// Seleciona o elemento <span> que deve ser mostrado/ocultado
const emailSpan = document.getElementById('emailAdequando');

// Adicione um ouvinte de evento ao elemento <select>
selectElement.addEventListener('change', function modoDeEntrada() {
  // Verifica o valor selecionado
  if (selectElement.value === 'aluno') {
    emailSpan.innerHTML = "@al.educacao.sp.gov.br";
  }

  if (selectElement.value === 'professor') {
    emailSpan.innerHTML = "@professor.educacao.sp.gov.br";
  }

  if (selectElement.value === 'dev') {
    emailSpan.innerHTML = " ";
  }
});
