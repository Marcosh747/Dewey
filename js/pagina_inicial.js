function selecionarOpcao(element) {
    const menuItems = document.querySelectorAll('.menu-item');

    // Remover a classe 'selected' de todos os itens do menu
    menuItems.forEach(item => {
        item.classList.remove('selected');
    });

    // Adicionar a classe 'selected' ao item selecionado
    element.classList.add('selected');

    // Mostra/Esconde os elementos com base na opção selecionada
    const conteinerFeedAvisos = document.getElementById('conteiner_feed_avisos');
    const conteinerFeed2 = document.getElementById('conteiner_feed_2');

    if (element.textContent === 'Avisos' && window.innerWidth >= 1000) {
        conteinerFeedAvisos.style.display = 'flex';
        conteinerFeed2.style.display = 'flex';

    } else if (element.textContent === 'Avisos') {
        conteinerFeedAvisos.style.display = 'flex';
        conteinerFeed2.style.display = 'none';
    } else {
        conteinerFeedAvisos.style.display = 'none';
        conteinerFeed2.style.display = 'flex';
    }
}