
// Função menu avisos e atividades
function selecionarOpcao(element) {
    const menuItems = document.querySelectorAll('.nav-link'); // Alterado para .nav-link

    // Remover a classe 'active' de todos os itens do menu
    menuItems.forEach(item => {
        item.classList.remove('menu-item-active');
    });

    // Adicionar a classe 'menu-item-active' ao item botao-selecionado
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
        <button class="botaoExpandido SecundarioVerde cabecalho-2 botao-selecionado">Aviso</button>
    </div>

    <div class="containerSelecaoExpandido SelecaoExpandidoDN">
        <button class="botaoExpandido cabecalho-2 SecundarioVerde botao-selecionado" onclick="criar_atividade()">Atividade</button>
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
            let dia = document.createElement('button');
            if (i >= primeiro_dia.getDay()) {
                dia.classList.add('botoes');
                let numeroDia = i - primeiro_dia.getDay() + 1;
                dia.innerHTML = `
                    <div class="container2">
                        
                        <span class="data">${numeroDia}</span>
                       
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








// CARROSEL 
document.addEventListener('DOMContentLoaded', function () {
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper button");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "flex";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "flex";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
});