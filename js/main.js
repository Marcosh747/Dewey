
// MENU LATERAL FLUTUANTE
function menu_lateral() {
  const aside = document.getElementById("container-menuFlutuante");
  toggleElementVisibility(aside);
}
// PERFIL FLUTUANTE
function perfil() {
  const perfil = document.getElementById("conteiner_perfil");
  toggleElementVisibility(perfil);
}



// FUNDO TRANSPARENTE
function toggleElementVisibility(element) {
  const computedStyle = window.getComputedStyle(element);
  const fundo = document.querySelector('.fundoTransparente');

  if (computedStyle.display === "none") {
    element.style.display = "block";
    fundo.style.display = 'flex';
  } else {
    element.style.display = "";
    fundo.style.display = 'none';
  }

  fundo.addEventListener('click', () => {
    element.style.display = "";
    fundo.style.display = 'none';
  });
}


// SAIR DA CONTA
function logout() {
  localStorage.removeItem('darkMode');
  window.location.href = '/'
}

// PAGINA ALBUM
function acessar_album() {
  window.location.href = '/public/album.html';
}

// PAGINA INICIAL
function acessar_pagina_inicial() {
  window.location.href = '/public/pagina_inicial.html';
}


// Função para rolar suavemente até o topo da página
// Define a função scrollToTop fora do escopo DOMContentLoaded
function scrollToTop(duration) {
  const scrollStep = -window.scrollY / (duration / 15);
  const scrollInterval = setInterval(function () {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

document.addEventListener("DOMContentLoaded", function () {
  // Mostra ou esconde o botão de "Voltar ao Topo" com base no scroll da página
  window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("backToTop").style.display = "flex";
    } else {
      document.getElementById("backToTop").style.display = "none";
    }
  };

  // Função para rolar suavemente até o topo da página
  document.getElementById("backToTop").addEventListener("click", function () {
    scrollToTop(500); // 500ms para a rolagem suave
  });
});

// CONTEINER CENTRAL 
const modal = document.querySelector(".modal-false");

function toggleModalExpand() {
  if (!modal.classList.contains("modal-expand")) {
    modal.classList.add("modal-expand");
  } else {
    modal.classList.remove("modal-expand");
  }
}




// POP-UP
function createPopup(title, content) {
  const containerPopup = document.querySelector('.popup'); // Use .popup para selecionar por classe

  if (containerPopup === null) { // Use === para verificar igualdade
    CriarcontainerPopup ();
  } else {
    containerPopup.remove(); // Remova o pop-up existente, não o "popup"
    CriarcontainerPopup ();
  }

  function CriarcontainerPopup () {
     // Cria os elementos do pop-up
    const popup = document.createElement('div');
    popup.className = 'popup';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-conteudo estilo-conteiner-primario';

    const popupTitle = document.createElement('strong');
    popupTitle.className = 'header2';
    popupTitle.innerText = title;

    const popupContentText = document.createElement('p');
    popupContentText.className = 'texto-de-suporte';
    popupContentText.innerText = content;

    // Monta a estrutura do pop-up
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupContentText);
    popup.appendChild(popupContent);

    // Seleciona o elemento <main>
    const mainElement = document.querySelector('main');

    // Adiciona o pop-up ao elemento <main>
    mainElement.appendChild(popup);

    // Exibe o pop-up
    popup.style.display = 'block';

    // Configura um temporizador para ocultar o pop-up após 2 segundos
    setTimeout(() => {
      popup.remove();
    }, 2000); // 2000 milissegundos (2 segundos)

  }
}










