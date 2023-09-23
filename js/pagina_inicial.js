// BOTÃO BACK TOP
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
    const menuItems = document.querySelectorAll('.menu-item');

    // Remover a classe 'selected' de todos os itens do menu
    menuItems.forEach(item => {
        item.classList.remove('selected');
    });

    // Adicionar a classe 'selected' ao item selecionado
    element.classList.add('selected');

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







// CALENDARIO
document.addEventListener('DOMContentLoaded', function () {

    const daysTag = document.querySelector(".dia"),
        currentDate = document.querySelector(".data-atual"),
        prevNextIcon = document.querySelectorAll(".ícones span");

    // obtendo a nova data, ano atual e mês atual
    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    // armazenando o nome completo de todos os meses em um array
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inativo">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            // adicionando a classe "ativo" ao li se o dia atual, mês e ano coincidirem
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
                currYear === new Date().getFullYear() ? "ativo" : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inativo">${i - lastDayofMonth + 1}</li>`;
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // definindo o texto da data atual com o mês e ano atual
        daysTag.innerHTML = liTag;
    };

    renderCalendar();

    prevNextIcon.forEach(icon => {
        // obtendo os ícones de anterior e próximo
        icon.addEventListener("click", () => {
            // adicionando evento de clique em ambos os ícones
            // se o ícone clicado for o ícone anterior, decrementa o mês atual em 1, caso contrário, incrementa em 1
            currMonth = icon.id === "anterior" ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) {
                // se o mês atual for menor que 0 ou maior que 11
                // cria uma nova data com o ano e mês atual e define como valor da variável date
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear(); // atualiza o ano atual com o ano da nova data
                currMonth = date.getMonth(); // atualiza o mês atual com o mês da nova data
            } else {
                date = new Date(); // define a data atual como valor da variável date
            }
            renderCalendar(); // chama a função renderCalendar
        });
    });

});



// NOVO POST
function toggleElementVisibility(element, displayValue = 'block') {
    const computedStyle = window.getComputedStyle(element);

    if (computedStyle.opacity === "0") {
        element.style.maxHeight = "326px";
        element.style.opacity = "1";
        element.style.display = displayValue;
    } else {
        element.style.maxHeight = "0px";
        element.style.opacity = "0";
        element.style.display = 'none';
    }
}

function criar_post() {
    const fundo = document.querySelector('.fundoTransparente');
    const suspenso_criar = document.querySelector(".conteiner_suspenso_criar");

    toggleElementVisibility(suspenso_criar, 'flex');

    fundo.addEventListener('click', () => {
        toggleElementVisibility(suspenso_criar);
    });
}

function criar_atividade() {
    const suspenso_criar = document.querySelector(".conteiner_suspenso_criar");
    const conteiner_fundo_novo_post = document.querySelector('.conteiner_fundo_novo_post');
    conteiner_fundo_novo_post.classList.add('active');

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





