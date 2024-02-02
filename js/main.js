
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
    element.style.display = "flex";
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



// PAGINA ALBUM
function acessar_album() {
  alert("Em desenvolvimento")
  window.location.href = '/public/album.html';
}

// PAGINA INICIAL
function acessar_pagina_inicial() {
  window.location.href = '/public/pagina_inicial.html';
}

// ENCERRAR SESSÃO (LOGOUT)
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('darkMode');
  window.location.href = '/';
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
    CriarcontainerPopup();
  } else {
    containerPopup.remove(); // Remova o pop-up existente, não o "popup"
    CriarcontainerPopup();
  }

  function CriarcontainerPopup() {
    // Cria os elementos do pop-up
    const popup = document.createElement('div');
    popup.className = 'popup';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-conteudo conteiner-primario';

    const popupTitle = document.createElement('span');
    popupTitle.className = 'texto-de-suporte';
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










// TESTE
var anguloAtual = 0; // Variável global para armazenar o ângulo atual

function exibirImagem(src) {
  var fundoTransparente = document.createElement('div');
  fundoTransparente.className = 'fundoTransparente';
  fundoTransparente.id = 'fundoTransparente_imagemAmpliada';

  var imagemAmpliada = document.createElement('img');
  imagemAmpliada.id = 'imagemAmpliada';
  imagemAmpliada.alt = 'Imagem Ampliada';
  imagemAmpliada.src = src;

  fundoTransparente.appendChild(imagemAmpliada);

  document.body.appendChild(fundoTransparente);

  fundoTransparente.style.display = 'flex';

  if (imagemAmpliada.width > window.innerWidth) {
    imagemAmpliada.style.transform = 'rotate(' + anguloAtual + 'deg)';
  }

  var btnGirar = document.createElement('button');
  btnGirar.id = 'btnGirar';
  btnGirar.className = 'botao-selecionado botoes';

  btnGirar.addEventListener('click', function (e) {
    e.stopPropagation();
    girarImagem();
  });

  var iconeSvg = '<svg fill="#161E0A" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">' +
    '<path d="M393-132q-103-29-168-113.5T160-440q0-57 19-108.5t54-94.5q11-12 27-12.5t29 12.5q11 11 11.5 27T290-586q-24 31-37 68t-13 78q0 81 47.5 144.5T410-209q13 4 21.5 15t8.5 24q0 20-14 31.5t-33 6.5Zm174 0q-19 5-33-7t-14-32q0-12 8.5-23t21.5-15q75-24 122.5-87T720-440q0-100-70-170t-170-70h-3l16 16q11 11 11 28t-11 28q-11 11-28 11t-28-11l-84-84q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l84-84q11-11 28-11t28 11q11 11 11 28t-11 28l-16 16h3q134 0 227 93t93 227q0 109-65 194T567-132Z"></path>' +
    '</svg>';

  btnGirar.innerHTML = iconeSvg;
  fundoTransparente.appendChild(btnGirar);

  fundoTransparente.addEventListener('click', function () {
    document.body.removeChild(this);
  });
}

function girarImagem() {
  var imagemAmpliada = document.getElementById('imagemAmpliada');

  // Incrementa o ângulo em 90 graus
  anguloAtual += 90;

  // Verifica se o ângulo atual é múltiplo de 180 (volta ao original)
  if (anguloAtual % 180 === 0) {
    anguloAtual = 0;
  }

  imagemAmpliada.style.transform = 'rotate(' + anguloAtual + 'deg)';
}