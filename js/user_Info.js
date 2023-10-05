
// // INFORMAÇÕES DO USUARIO

function recuperarInformacoesDoLocalStorage() {
  // Recupera o objeto de usuário do localStorage
  const userString = localStorage.getItem('user');

  // Verifica se o objeto de usuário está disponível
  if (userString) {
    const user = JSON.parse(userString);

    // Verifica se as informações necessárias estão presentes no objeto de usuário
    if (user && user.picture && user.name && user.given_name && user.email) {
      // Obtendo todos os elementos com a classe 'picture'
      const pictureElements = document.getElementsByClassName('picture');

      // Atribuindo a URL da imagem (user.picture) a todos os elementos com a classe 'picture'
      for (const imgElement of pictureElements) {
        imgElement.src = user.picture;
      }

      // Obtendo todos os elementos com a classe 'nome-completo'
      const nomeInteiroElements = document.getElementsByClassName('nome-completo');

      // Atribuindo o valor do nome completo (user.name) a todos os elementos com a classe 'nome-completo'
      for (const element of nomeInteiroElements) {
        element.textContent = user.name;
      }

      // Obtendo todos os elementos com a classe 'primeiro_nome'
      const primeiroNomeElements = document.getElementsByClassName('primeiro_nome');

      // Atribuindo o valor do primeiro nome (user.given_name) a todos os elementos com a classe 'primeiro_nome'
      for (const element of primeiroNomeElements) {
        element.textContent = user.given_name;

        // Verificar se o elemento é um <input> e, se for, definir o atributo 'placeholder'
        if (element.tagName.toLowerCase() === 'input') {
          element.placeholder = 'Olá, ' + user.given_name + '!';
        }
      }

      // Obtendo todos os elementos com a classe 'email'
      const emailElements = document.getElementsByClassName('email');

      // Atribuindo o valor do email (user.email) a todos os elementos com a classe 'email'
      for (const element of emailElements) {
        element.textContent = user.email;
      }
    } else {
      console.error('Dados de usuário incompletos no localStorage.');
    }
  } else {
    console.error('Objeto de usuário não encontrado no localStorage.');
  }
}

recuperarInformacoesDoLocalStorage();

