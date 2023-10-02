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
    emailSpan.innerHTML = "";
  }
});

