
// Função para atualizar o modo escuro
const updateDarkMode = () => {
  const isDarkMode = localStorage.getItem('darkMode');

  if (isDarkMode === 'true') {
    document.body.classList.add('dark');
    const checkbox_dark = document.getElementById('modo_dark');

    if (checkbox_dark) {
      checkbox_dark.checked = true;
    }
  } else {
    document.body.classList.remove('dark');
  }
};

// Chame a função para atualizar o modo escuro quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  updateDarkMode();
});

// Se o elemento 'modo_dark' existir, continue com o código relacionado ao modo escuro
const checkbox_dark = document.getElementById('modo_dark');

if (checkbox_dark) {
  const body = document.body;

  // Adicione um ouvinte de evento para alternar o modo escuro
  checkbox_dark.addEventListener('change', () => {
    body.classList.toggle('dark');
    // Salve o estado atual no localStorage
    localStorage.setItem('darkMode', checkbox_dark.checked.toString());
  });
}










