// MENU DE POSTS
// Verifica a largura da janela quando a página é carregada
if (window.location.pathname === '/public/professor/pagina_inicial.html') {
    window.addEventListener('load', function () {
        selecionarOpcao(document.querySelector('.menu-item'));


    });

    window.addEventListener('resize', function () {
        selecionarOpcao(document.querySelector('.menu-item'));

    });
}
// Função para selecionar a opção e ajustar a exibição com base no tamanho da tela
function selecionarOpcao(element) {
    const menuItems = document.querySelectorAll('.nav-link'); // Alterado para .nav-link

    // Remover a classe 'active' de todos os itens do menu
    menuItems.forEach(item => {
        item.classList.remove('menu-item-active');
    });

    // Adicionar a classe 'menu-item-active' ao item selecionado
    element.classList.add('menu-item-active');

    // Mostra/Esconde os elementos com base na opção selecionada
    const conteinerFeedAvisos = document.getElementById('feed2');
    const conteinerFeed2 = document.getElementById('feed3');

    if (element.textContent === 'Avisos' && window.innerWidth >= 990) {
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












// NOVO POST
function criar_post() {

    // Seleciona a div com id "variado"
    const variadoDiv = document.getElementById("variado");

    // Limpa o conteúdo existente
    variadoDiv.innerHTML = '';


    // Cria a estrutura interna
    variadoDiv.innerHTML = `
    <div class="containerSelecaoExpandido SelecaoExpandidoUP">
        <button class="botaoExpandido SecundarioVerde cabecalho-2 selecionado">Aviso</button>
    </div>

    <div class="containerSelecaoExpandido SelecaoExpandidoDN">
        <button class="botaoExpandido cabecalho-2 SecundarioVerde selecionado" onclick="criar_atividade()">Atividade</button>
    </div>
    `;

    // Insere o elemento criado dentro de <div id="variado"></div>
    toggleModalExpand();
}






function criar_atividade() {
    const suspenso_criar = document.querySelector(".conteiner_suspenso_criar");
    const conteiner_fundo_novo_post = document.querySelector('.conteiner_fundo_novo_post');
    conteiner_fundo_novo_post.classList.add('active');

    toggleModalExpand();
    toggleElementVisibility(suspenso_criar, 'flex');

}

function fechar_post() {
    const conteiner_fundo_novo_post = document.querySelector('.conteiner_fundo_novo_post');
    conteiner_fundo_novo_post.classList.remove('active');

    // Limpar os campos do formulário
    const formulario = document.getElementById('post-formulario');
    formulario.reset();

    // Limpar as imagens
    const imagemPreviewDiv = document.getElementById('imagem-preview');
    imagemPreviewDiv.innerHTML = '';
}


// ENVIO DE POST
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('post-formulario');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Crie um objeto para armazenar os dados do formulário
        const dadosDoFormulario = {
            turma: document.getElementById('turmas').value,
            dataFinalEntrega: document.getElementById('sub_titulo_criar').value,
            titulo: document.getElementById('titulo-criar').value,
            descricao: document.getElementById('descricao-criar').value,
            imagens: []
        };

        // Coleta as imagens selecionadas
        const imagensSelecionadas = document.querySelectorAll('.imagem-preview');
        imagensSelecionadas.forEach(function (imagem) {
            dadosDoFormulario.imagens.push(imagem.src);
        });

        // Faça algo com os dados, como exibi-los no console
        console.log(dadosDoFormulario);

        // Você pode enviar esses dados para o servidor ou realizar outras ações aqui
    });
});


// ESCOLHA DE IMAGEM DO POST
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('documento-post');
    const imagemPreviewDiv = document.getElementById('imagem-preview');

    fileInput.addEventListener('change', function () {
        const files = fileInput.files;

        // Verifique o número atual de imagens exibidas
        const imagensExibidas = imagemPreviewDiv.querySelectorAll('.imagem-preview').length;
        const limiteDeImagens = 4;

        if (imagensExibidas + files.length > limiteDeImagens) {
            alert('Você pode adicionar no máximo 4 imagens.');
            fileInput.value = ''; // Limpa o input file
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const newImage = document.createElement('img');
                    newImage.className = 'imagem-preview';
                    newImage.src = event.target.result;
                    imagemPreviewDiv.appendChild(newImage);
                };
                reader.readAsDataURL(file);
            }
        }

        // Limpa o input file após o upload das imagens
        fileInput.value = '';
    });
});





// CALENDARIO
document.addEventListener('DOMContentLoaded', function () {
    let calendario = document.querySelector('.calendario');
    const meses = calendario.querySelector('.mes');
    const voltarMes = document.querySelector('#voltarMes'); // Botão Anterior
    const proximoMes = document.querySelector('#proximoMes'); // Botão Próximo
    const diaAtual = document.querySelector('.reiniciar'); // Botão reiniciar

    const nomes_meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    EAnoBissexto = (ano) => {
        return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
    };

    getDiasFevereiro = (ano) => {
        return EAnoBissexto(ano) ? 29 : 28;
    };

    gerarCalendario = (mes, ano) => {
        let diasDoCalendario = calendario.querySelector('.dias_do_calendario');

        let dias_do_mes = [31, getDiasFevereiro(ano), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        diasDoCalendario.innerHTML = '';

        let mesAtual = `${nomes_meses[mes]} ${ano}`;
        meses.innerHTML = mesAtual;

        // Obter o primeiro dia do mês
        let primeiro_dia = new Date(ano, mes, 1);

        for (let i = 0; i <= dias_do_mes[mes] + primeiro_dia.getDay() - 1; i++) {
            let dia = document.createElement('div');
            if (i >= primeiro_dia.getDay()) {
                dia.classList.add('dia-do-calendario-hover', 'semana-5');
                let numeroDia = i - primeiro_dia.getDay() + 1;
                dia.innerHTML = `
                    <div class="container2">
                        <div class="camada-estado3">
                            <div class="data">${numeroDia}</div>
                        </div>
                    </div>
                `;
                let dataAtual = new Date();
                if (numeroDia === dataAtual.getDate() && ano === dataAtual.getFullYear() && mes === dataAtual.getMonth()) {
                    dia.classList.add('data-atual');
                }
            }
            diasDoCalendario.appendChild(dia);
        }
    };

    let dataAtual = new Date();
    let mes_atual = { valor: dataAtual.getMonth() };
    let ano_atual = { valor: dataAtual.getFullYear() };
    gerarCalendario(mes_atual.valor, ano_atual.valor);

    // Ouvinte de evento para o botão anterior
    voltarMes.addEventListener('click', () => {
        mes_atual.valor--;
        if (mes_atual.valor < 0) {
            mes_atual.valor = 11;
            ano_atual.valor--;
        }
        gerarCalendario(mes_atual.valor, ano_atual.valor);
    });

    // Ouvinte de evento para o botão próximo
    proximoMes.addEventListener('click', () => {
        mes_atual.valor++;
        if (mes_atual.valor > 11) {
            mes_atual.valor = 0;
            ano_atual.valor++;
        }
        gerarCalendario(mes_atual.valor, ano_atual.valor);
    });

    // Ouvinte de evento para o botão reiniciar
    diaAtual.addEventListener('click', () => {
        let dataAtual = new Date();
        mes_atual.valor = dataAtual.getMonth();
        ano_atual.valor = dataAtual.getFullYear();
        gerarCalendario(mes_atual.valor, ano_atual.valor);
    });
});

