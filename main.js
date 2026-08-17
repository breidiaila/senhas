JavaScript
// 1. SELEÇÃO DE ELEMENTOS E VARIÁVEIS INICIAIS
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

// 2. ATRIBUIÇÃO DE EVENTOS
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// 3. EXECUÇÃO INICIAL
geraSenha();

// 4. FUNÇÕES DE AJUSTE DE TAMANHO
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// 5. FUNÇÃO DE GERAÇÃO DA SENHA
function geraSenha() {
    let alfabeto = '';
    
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

// 6. CLASSIFICAÇÃO DA SENHA BASEADA EM ENTROPIA
function classificaSenha(tamanhoAlfabeto) {
    // Cálculo da Entropia: H = L * log2(N)
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    // Cálculo do tempo estimado de quebra por força bruta (100 milhões de tentativas/seg)
    let diasEstimados = Math.floor((2 ** entropia) / (100e6 * 60 * 60 * 24));

    if (isNaN(diasEstimados) || diasEstimados <= 0) {
        valorEntropia.textContent = "Selecione ao menos um tipo de caractere para gerar a senha.";
    } else {
        valorEntropia.textContent = "Um computador pode levar até " + diasEstimados + " dias para descobrir essa senha.";
    }
}
