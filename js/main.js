// MENU LATERAL
function menu_lateral() {
  const fundo = document.querySelector('.fundoTransparente');
  const aside = document.getElementsByClassName("container-menuLateral")[0];

  var computedStyle = window.getComputedStyle(aside);

  if (computedStyle.opacity === "0") {
    toggleElementVisibility(aside, 'flex');
  }

}


// PERFIL
function perfil() {

  const perfil = document.getElementsByClassName("conteiner_perfil")[0];

  var computedStyle = window.getComputedStyle(perfil);

  if (computedStyle.opacity === "0") {
    toggleElementVisibility(perfil, 'flex');

  }
  
}

// FUNDO TRANSPARENTE
function toggleElementVisibility(element, displayValue = 'block') {
  const computedStyle = window.getComputedStyle(element);
  const fundo = document.querySelector('.fundoTransparente');

  if (computedStyle.opacity === "0") {
      element.style.maxHeight = "326px";
      element.style.opacity = "1";
      element.style.display = displayValue;
      fundo.style.display = 'flex';
  } else {
      element.style.maxHeight = "0px";
      element.style.opacity = "0";
      element.style.display = 'none';
      fundo.style.display = 'none';
  }

  fundo.addEventListener('click', () => {
      element.style.maxHeight = "0px";
      element.style.opacity = "0";
      element.style.display = 'none';
      fundo.style.display = 'none';
  });
}


// SAIR DA CONTA
function logout(){
  localStorage.removeItem('darkMode');
  window.location.href = '/'
}

// PAGINA ALBUM
function acessar_album (){
  window.location.href = '/public/album.html';
}

// PAGINA INICIAL
function acessar_pagina_inicial (){
  window.location.href = '/public/pagina_inicial.html';
}


// Função para rolar suavemente até o topo da página
// Define a função scrollToTop fora do escopo DOMContentLoaded
function scrollToTop(duration) {
  const scrollStep = -window.scrollY / (duration / 15);
  const scrollInterval = setInterval(function() {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

document.addEventListener("DOMContentLoaded", function() {
  // Mostra ou esconde o botão de "Voltar ao Topo" com base no scroll da página
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("backToTop").style.display = "flex";
    } else {
      document.getElementById("backToTop").style.display = "none";
    }
  };

  // Função para rolar suavemente até o topo da página
  document.getElementById("backToTop").addEventListener("click", function() {
    scrollToTop(500); // 500ms para a rolagem suave
  });
});




