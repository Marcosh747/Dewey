// MENU LATERAL
function menu_lateral() {
  const fundo = document.querySelector('.fundoTransparente');
  const aside = document.getElementsByClassName("container-menuLateral")[0];

  var computedStyle = window.getComputedStyle(aside);

  if (computedStyle.opacity === "0") {
    aside.style.maxWidth = "326px";
    aside.style.opacity = "1";
    fundo.style.display = "flex";
    aside.style.display = "flex";


  } else {
    aside.style.maxWidth = "0";
    fundo.style.display = "none";
    aside.style.opacity = "0";
    aside.style.display = 'none';
  }

  fundo.addEventListener('click', () => {
    aside.style.maxWidth = "0";
    fundo.style.display = "none";
    aside.style.opacity = "0";
    aside.style.display = 'none';
  });

}


// PERFIL
function perfil() {
  const fundo = document.querySelector('.fundoTransparente');
  const perfil = document.getElementsByClassName("conteiner_perfil")[0];

  var computedStyle = window.getComputedStyle(perfil);

  if (computedStyle.opacity === "0") {
    perfil.style.maxHeight = "326px";
    perfil.style.opacity = "1";
    fundo.style.display = 'flex';

  } else {
    perfil.style.maxHeight = "0px";
    perfil.style.opacity = "0";
    fundo.style.display = 'none';
  }



  fundo.addEventListener('click', () => {
    perfil.style.maxHeight = "0px";
    perfil.style.opacity = "0";
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




