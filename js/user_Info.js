
// INFORMAÇÕES DO USUARIO

// Função para obter as informações do perfil do usuário
async function getProfileInformation(accessToken) {
  const profileEndpoint = 'https://www.googleapis.com/oauth2/v2/userinfo';

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
}

// Recupera o token de acesso do localStorage
const accessToken = localStorage.getItem('accessToken');

// Verifica se o token de acesso está disponível
if (accessToken) {

  // Se estiver disponível, obtém as informações do perfil do usuário
  getProfileInformation(accessToken)
    .then((profileData) => {
      // Obtendo todos os elementos com a classe 'picture'
      const pictureElements = document.getElementsByClassName('picture');

      // Atribuindo a URL da imagem (profileData.picture) a todos os elementos com a classe 'picture'
      for (const imgElement of pictureElements) {
        imgElement.src = profileData.picture;
      }

      // Obtendo todos os elementos com a classe 'nome_inteiro'
      const nomeInteiroElements = document.getElementsByClassName('nome_inteiro');

      // Atribuindo o valor do nome completo (profileData.name) a todos os elementos com a classe 'nome_inteiro'
      for (const element of nomeInteiroElements) {
        element.textContent = profileData.name;
      }

      // Obtendo todos os elementos com a classe 'primeiro_nome'
      const primeiroNomeElements = document.getElementsByClassName('primeiro_nome');

      // Atribuindo o valor do primeiro nome (profileData.given_name) a todos os elementos com a classe 'primeiro_nome'
      for (const element of primeiroNomeElements) {
        element.textContent = profileData.given_name;

        // Verificar se o elemento é um <input> e, se for, definir o atributo 'placeholder'
        if (element.tagName.toLowerCase() === 'input') {
          element.placeholder = 'Olá, ' + profileData.given_name + '!';
        }
      }

      // Obtendo todos os elementos com a classe 'email'
      const emailElements = document.getElementsByClassName('email');

      // Atribuindo o valor do email (profileData.email) a todos os elementos com a classe 'email'
      for (const element of emailElements) {
        element.textContent = profileData.email;
      }
    })
    .catch((error) => {
      console.error('Erro ao obter informações do perfil:', error);
      localStorage.clear(accessToken);
      // if (window.location.pathname !== "/") {
      //   alert("Por favor, Reconectar novamente")
      //   window.location.href = '/';

      // }
    });
} else {
  console.log('Token de acesso não encontrado. O usuário deve conceder permissões primeiro.');
  // if (window.location.pathname !== "/") {

  //   window.location.href = '/';

  // }
}
