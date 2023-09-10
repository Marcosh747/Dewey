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
  window.location.href = '/';
  
}




