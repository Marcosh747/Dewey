// Função para verificar o token de acesso e redirecionar
function checkAndRedirect() {
  const storedAccessToken = localStorage.getItem('accessToken');
  
  if (storedAccessToken) {
    redirectToHomePage();
  } else {
    client.requestAccessToken();
  }
}

// Função para redirecionar para a página inicial
function redirectToHomePage() {
  window.location.href = 'public/pagina_inicial.html';
}

// Função para obter informações do perfil do usuário
async function getProfileInformation(accessToken) {
  const profileEndpoint = 'https://www.googleapis.com/oauth2/v2/userinfo';

  try {
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
    handleProfileError(error);
  }
}

// Função para lidar com erros ao obter informações do perfil
function handleProfileError(error) {
  localStorage.removeItem('accessToken');
  throw error;
}

// Função para inicializar o cliente e redirecionar para a próxima página
const client = google.accounts.oauth2.initTokenClient({
  client_id: '333702500691-rb1g1hnlmi05pq1jf7ve0ab1cu55k1iu.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  callback: async (tokenResponse) => {
    if (google.accounts.oauth2.hasGrantedAllScopes(tokenResponse,
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email')) {
      console.log('Todos os escopos concedidos! Redirecionando para a próxima página...');
      const accessToken = tokenResponse.access_token;
      localStorage.setItem('accessToken', accessToken);

      // Depois de obter as informações do perfil do usuário
      const profileData = await getProfileInformation(accessToken);

      // Salvar as informações do usuário no localStorage
      localStorage.setItem('user', JSON.stringify(profileData));

      redirectToHomePage();
    }
  },
});
















function acessar() {
  window.location.href = 'public/pagina_inicial.html';
}

// Seleciona o elemento <select>
const selectElement = document.getElementById('tipoUsuario');

// Seleciona o elemento <span> que deve ser mostrado/ocultado
const emailSpan = document.getElementById('emailAdequando');

// Adicione um ouvinte de evento ao elemento <select>
selectElement.addEventListener('change', function modoDeEntrada() {
  // Verifica o valor botao-selecionado
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
