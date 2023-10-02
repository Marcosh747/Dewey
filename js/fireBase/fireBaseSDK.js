
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Referência para o banco de dados
const database = firebase.database();

// Função para criar um aviso
function criarAviso(serie, professorId, avisoData) {
  const avisosRef = database.ref(`/escola/Filomena/séries/${serie}/avisos`);
  const novoAvisoRef = avisosRef.push();
  novoAvisoRef.set(avisoData);
}

// Função para criar uma atividade
function criarAtividade(serie, professorId, atividadeData) {
  const atividadesRef = database.ref(`/escola/Filomena/séries/${serie}/atividades`);
  const novaAtividadeRef = atividadesRef.push();
  novaAtividadeRef.set(atividadeData);
}

// Exemplo de uso para criar um aviso
const aviso1 = {
  titulo: "Aviso importante",
  descricao: "Lembrete sobre o próximo teste",
  imagem_url: "URL_da_imagem",
  materia: "Matemática"
};
criarAviso("1ª_série", "professor1", aviso1);

// Exemplo de uso para criar uma atividade
const atividade1 = {
  titulo: "Tarefa de casa",
  descricao: "Resolver os exercícios do capítulo 5",
  imagem_url: "URL_da_imagem",
  materia: "Matemática",
  data_entrega: "2023-10-15",
  nota_maxima: 10
};
criarAtividade("1ª_série", "professor1", atividade1);
