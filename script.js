console.log("JavaScript conectado com sucesso!");

//1- DADOS DO PERFIL

const nome = "Sabrine Teixeira";
const area = "Desenvolvimento Full Stack";
const cidade = "Salvador";
const idade = 18;
const disponivelParaEstagio = true;
const projetosConcluidos = 2;
const projetosEmAndamento = 1;

console.log("Tipo do nome:", typeof nome);
console.log("Tipo da idade:", typeof idade);
console.log("Tipo da disponibilidade:", typeof disponivelParaEstagio);

// 2- APRESENTAÇÃO

const apresentacao = `
Olá! Meu nome é ${nome}.
Sou estudante da área de ${area}.
Moro em ${cidade}.
Tenho ${idade} anos.
`;

console.log(apresentacao);

const totalProjetos = projetosConcluidos + projetosEmAndamento;

console.log("Projetos concluídos:", projetosConcluidos);
console.log("Projetos em andamento:", projetosEmAndamento);
console.log("Total de projetos:", totalProjetos);

if (totalProjetos > 0) {
    console.log("Existe pelo menos um projeto cadastrado.");
} else {
    console.log("Nenhum projeto cadastrado.");
}

if (totalProjetos === 0) {
    console.log("Ainda sem projetos.");
} else if (totalProjetos <= 2) {
    console.log("Portfólio em construção.");
} else {
    console.log("Portfólio com vários projetos.");
}

if (totalProjetos > 0 && disponivelParaEstagio) {
    console.log("Portfólio com projetos e disponibilidade para estágio.");
} else {
    console.log("Continue desenvolvendo seu perfil profissional.");
}

// 3- FUNÇÕES


function apresentarPerfil(nome, area) {
    return `Meu nome é ${nome} e atuo na área de ${area}.`;
}

console.log(apresentarPerfil(nome, area));

function resumirProjetos(concluidos, andamento) {
    return concluidos + andamento;
}

console.log(
    "Resumo dos projetos:",
    resumirProjetos(projetosConcluidos, projetosEmAndamento)
);

// 4- SELETORES DO DOM

const botaoTema = document.querySelector("#tema");
const botaoMostrar = document.querySelector("#mostrar-mais");

const textoExtra = document.querySelector("#sobre-extra");

const formulario = document.querySelector("#cadastro-projeto");
const campoNome = document.querySelector("#projeto-nome");
const campoCategoria = document.querySelector("#projeto-categoria");

const listaProjetos = document.querySelector("#lista-projetos");
const filtro = document.querySelector("#filtro");

const statusProjetos = document.querySelector("#status-projetos");
const statusCadastro = document.querySelector("#status-cadastro");

const contadorProjetos = document.querySelector("#contador-projetos");

// 5- ALTERNAR TEMA

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("escuro");

    const temaAtivo = document.body.classList.contains("escuro");

    botaoTema.textContent = temaAtivo
        ? "Ativar tema claro"
        : "Ativar tema escuro";

    botaoTema.setAttribute("aria-pressed", String(temaAtivo));

});


// 6- MOSTRAR MAIS / MOSTRAR MENOS

botaoMostrar.addEventListener("click", function () {

    const estaOculto = textoExtra.hidden;

    textoExtra.hidden = !estaOculto;

    botaoMostrar.textContent = estaOculto
        ? "Mostrar menos"
        : "Mostrar mais";

    botaoMostrar.setAttribute(
        "aria-expanded",
        String(estaOculto)
    );

});

// 7- CONTADOR DE PROJETOS


function atualizarContador() {

    const cards = listaProjetos.querySelectorAll(".card-projeto");

    const projetosVisiveis = Array.from(cards).filter(function (card) {
        return !card.hidden;
    });

    contadorProjetos.textContent =
        `Projetos visíveis: ${projetosVisiveis.length}`;

}


// 8- FILTRAR PROJETOS


function filtrarProjetos() {

    // Nova seleção a cada execução
    const cards = listaProjetos.querySelectorAll(".card-projeto");

    const categoriaSelecionada = filtro.value;

    cards.forEach(function (card) {

        const categoria = card.dataset.categoria;

        if (
            categoriaSelecionada === "todos" ||
            categoria === categoriaSelecionada
        ) {
            card.hidden = false;
        } else {
            card.hidden = true;
        }

    });

    atualizarContador();

}

filtro.addEventListener("change", function () {

    filtrarProjetos();

    statusProjetos.textContent =
        `Filtro selecionado: ${filtro.value}.`;

});

// 9- CADASTRAR NOVOS PROJETOS

formulario.addEventListener("submit", function (evento) {

    // Impede o recarregamento da página
    evento.preventDefault();

    // Verifica a validação dos campos
    if (!formulario.checkValidity()) {

        formulario.reportValidity();

        statusCadastro.textContent =
            "Preencha corretamente os campos do formulário.";

        return;
    }

    // Captura os dados do formulário
    const dados = new FormData(formulario);

    const nomeProjeto = dados.get("nome").trim();

    const categoriaProjeto = dados.get("categoria");

    // Validação manual do nome
    if (nomeProjeto.length < 3) {

        statusCadastro.textContent =
            "O nome do projeto precisa ter pelo menos 3 caracteres.";

        campoNome.focus();

        return;
    }

    // CRIAÇÃO DO CARD

    const card = document.createElement("article");

    card.classList.add("card-projeto");

    card.dataset.categoria = categoriaProjeto;

    // Título
    const titulo = document.createElement("h3");

    titulo.textContent = nomeProjeto;

    // Descrição da categoria
    const categoria = document.createElement("p");

    categoria.textContent =
        `Categoria: ${categoriaProjeto.toUpperCase()}`;

    // Botão de remoção
    const botaoRemover = document.createElement("button");

    botaoRemover.type = "button";

    botaoRemover.classList.add("remover");

    botaoRemover.textContent = "Remover projeto";

    // Organiza os elementos em um fragmento
    const fragmento = document.createDocumentFragment();

    fragmento.append(titulo, categoria, botaoRemover);

    console.log(
        "Quantidade de elementos no fragmento antes:",
        fragmento.childNodes.length
    );

    // Adiciona os elementos ao card
    card.append(fragmento);

    console.log(
        "Quantidade de elementos no fragmento depois:",
        fragmento.childNodes.length
    );

    // Insere o novo projeto na página
    listaProjetos.append(card);

    // Atualiza o filtro e o contador
    filtrarProjetos();

    // Retorno ao usuário
    statusCadastro.textContent =
        `Projeto "${nomeProjeto}" cadastrado com sucesso!`;

    statusProjetos.textContent =
        "Novo projeto adicionado ao portfólio.";

    // Limpa o formulário
    formulario.reset();

    campoNome.value = "";

});


// 10- REMOVER PROJETOS COM DELEGAÇÃO

listaProjetos.addEventListener("click", function (evento) {

    // Identifica o botão, mesmo quando o clique
    // acontece em um elemento dentro dele
    const botao = evento.target.closest(".remover");

    // Confirma se o botão pertence à lista
    if (!botao || !listaProjetos.contains(botao)) {
        return;
    }

    // Localiza o card correspondente
    const card = botao.closest(".card-projeto");

    if (!card) {
        return;
    }

    const titulo = card.querySelector("h3");

    const nomeRemovido = titulo
        ? titulo.textContent
        : "Projeto";

    // Remove o card
    card.remove();

    // Atualiza as informações
    filtrarProjetos();

    statusProjetos.textContent =
        `O projeto "${nomeRemovido}" foi removido com sucesso.`;

});


// 11 - FORMULÁRIO DE CONTATO

const formularioContato = document.querySelector("#form-contato");

const statusContato = document.querySelector("#status-contato");

const campoContatoNome = document.querySelector("#contato-nome");
const campoContatoEmail = document.querySelector("#contato-email");
const campoContatoMotivo = document.querySelector("#contato-motivo");
const campoContatoAssunto = document.querySelector("#contato-assunto");
const campoContatoMensagem = document.querySelector("#contato-mensagem");

const grupoAssunto = document.querySelector("#grupo-assunto");

const contadorMensagem = document.querySelector("#contador-mensagem");

const resumoErros = document.querySelector("#resumo-erros");

const botaoEnviar = document.querySelector("#botao-enviar");

const resultadoTeste = document.querySelector("#resultado-teste");

let formularioEnviando = false;
let tentativaRealizada = false;

const camposContato = [
    campoContatoNome,
    campoContatoEmail,
    campoContatoMotivo,
    campoContatoAssunto,
    campoContatoMensagem
];

// Guarda os campos que já foram utilizados.
const camposUtilizados = new Set();


// 1 - CONTAGEM DE CARACTERES

// Utiliza String.length, que conta unidades de código UTF-16.
// O mesmo critério é utilizado na validação e no contador.

function contarCaracteres(valor) {
    return valor.length;
}


// 2 - CONTADOR DA MENSAGEM

function atualizarContadorMensagem() {

    const quantidade = contarCaracteres(
        campoContatoMensagem.value.trim()
    );

    contadorMensagem.textContent =
        `${quantidade} / 1000 caracteres`;

}

campoContatoMensagem.addEventListener(
    "input",
    atualizarContadorMensagem
);


// 3 - CONTROLE DO ASSUNTO CONDICIONAL

function atualizarAssunto() {

    const outroSelecionado =
        campoContatoMotivo.value === "Outro";

    grupoAssunto.hidden = !outroSelecionado;

    campoContatoAssunto.disabled = !outroSelecionado;

    campoContatoAssunto.required = outroSelecionado;

    if (!outroSelecionado) {

        campoContatoAssunto.value = "";

        camposUtilizados.delete(campoContatoAssunto);

        limparErro(campoContatoAssunto);

    } else if (
        camposUtilizados.has(campoContatoAssunto) ||
        tentativaRealizada
    ) {

        validarCampo(campoContatoAssunto);

    }

}

campoContatoMotivo.addEventListener(
    "change",
    atualizarAssunto
);


// 4 - MENSAGENS DE ERRO

function limparErro(campo) {

    const elementoErro = document.querySelector(
        `#erro-${campo.name === "nome" ? "nome" :
        campo.name === "email" ? "email" :
        campo.name === "motivo" ? "motivo" :
        campo.name === "assunto" ? "assunto" :
        "mensagem"}`
    );

    elementoErro.textContent = "";

    campo.removeAttribute("aria-invalid");

}


// 5 - VALIDAÇÃO INDIVIDUAL

function validarCampo(campo) {

    if (campo.disabled) {
        limparErro(campo);
        return true;
    }

    let erro = "";

    const valor = campo.value.trim();

    const tamanho = contarCaracteres(valor);

    switch (campo.name) {

        case "nome":

            if (!valor) {
                erro = "Informe seu nome.";
            } else if (tamanho < 3 || tamanho > 80) {
                erro = "O nome deve possuir de 3 a 80 caracteres.";
            }

            break;

        case "email":

            if (!valor) {
                erro = "Informe seu e-mail.";
            } else if (campo.validity.typeMismatch) {
                erro = "Informe um endereço de e-mail válido.";
            }

            break;

        case "motivo":

            if (!valor) {
                erro = "Selecione o motivo do contato.";
            }

            break;

        case "assunto":

            if (campoContatoMotivo.value === "Outro") {

                if (!valor) {
                    erro = "Informe o assunto adicional.";
                } else if (tamanho < 5 || tamanho > 100) {
                    erro = "O assunto deve possuir de 5 a 100 caracteres.";
                }

            }

            break;

        case "mensagem":

            if (!valor) {
                erro = "Digite sua mensagem.";
            } else if (tamanho < 30 || tamanho > 1000) {
                erro = "A mensagem deve possuir de 30 a 1000 caracteres.";
            }

            break;

    }

    const idErro = campo.name === "mensagem"
        ? "erro-mensagem"
        : `erro-${campo.name}`;

    const elementoErro = document.querySelector(`#${idErro}`);

    elementoErro.textContent = erro;

    if (erro) {

        campo.setAttribute("aria-invalid", "true");

    } else {

        campo.removeAttribute("aria-invalid");

    }

    return erro === "";

}


// 6 - EVENTOS DE INTERAÇÃO E VALIDAÇÃO

camposContato.forEach(function (campo) {

    campo.addEventListener("blur", function () {

        camposUtilizados.add(campo);

        validarCampo(campo);

    });

    campo.addEventListener("input", function () {

        if (
            camposUtilizados.has(campo) ||
            tentativaRealizada
        ) {

            validarCampo(campo);

        }

    });

    campo.addEventListener("change", function () {

        if (
            camposUtilizados.has(campo) ||
            tentativaRealizada
        ) {

            validarCampo(campo);

        }

    });

});


// 7 - LEITURA E NORMALIZAÇÃO DOS DADOS

function lerDadosContato() {

    const dados = {

        nome: campoContatoNome.value.trim(),

        email: campoContatoEmail.value.trim(),

        motivo: campoContatoMotivo.value,

        mensagem: campoContatoMensagem.value

    };

    // O assunto só participa do processamento quando
    // o motivo selecionado é "Outro".

    if (campoContatoMotivo.value === "Outro") {

        dados.assunto = campoContatoAssunto.value.trim();

    }

    // A mensagem preserva seu conteúdo interno.
    // Não aplicamos trim() ao valor enviado.

    return dados;

}


// 8 - VALIDAÇÃO COMPLETA

function validarFormularioContato() {

    let primeiroCampoInvalido = null;

    const erros = [];

    camposContato.forEach(function (campo) {

        if (campo.disabled) {
            return;
        }

        const valido = validarCampo(campo);

        if (!valido) {

            if (!primeiroCampoInvalido) {
                primeiroCampoInvalido = campo;
            }

            const mensagem = document.querySelector(
                `#erro-${campo.name}`
            ).textContent;

            erros.push(mensagem);

        }

    });

    if (erros.length > 0) {

        resumoErros.innerHTML = "";

        const titulo = document.createElement("strong");

        titulo.textContent =
            "Não foi possível enviar. Corrija os seguintes problemas:";

        const lista = document.createElement("ul");

        erros.forEach(function (mensagem) {

            const item = document.createElement("li");

            item.textContent = mensagem;

            lista.append(item);

        });

        resumoErros.append(titulo, lista);

        resumoErros.hidden = false;

        primeiroCampoInvalido.focus();

        statusContato.textContent =
            "Existem erros de validação no formulário.";

        return false;

    }

    resumoErros.hidden = true;

    resumoErros.textContent = "";

    return true;

}


// 9 - SIMULAÇÃO CONTROLADA DE ENVIO

function simularEnvio(dados) {

    return new Promise(function (resolve, reject) {

        // Demonstração assíncrona com resultado controlado.

        setTimeout(function () {

            if (resultadoTeste.value === "sucesso") {

                resolve({
                    sucesso: true,
                    dadosRecebidos: dados
                });

            } else {

                reject(
                    new Error("Falha simulada no processamento.")
                );

            }

        }, 1500);

    });

}


// 10 - PROCESSAMENTO DO FORMULÁRIO

formularioContato.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    // Impede tentativas simultâneas.

    if (formularioEnviando) {
        return;
    }

    tentativaRealizada = true;

    // Verifica todos os campos antes do processamento.

    if (!validarFormularioContato()) {
        return;
    }

    // Captura os dados somente depois da validação.

    const dadosContato = lerDadosContato();

    formularioEnviando = true;

    botaoEnviar.disabled = true;

    botaoEnviar.textContent = "Processando...";

    statusContato.textContent =
        "Sua solicitação está sendo processada. Aguarde.";

    try {

        const resposta = await simularEnvio(dadosContato);

        console.log(
            "Dados recebidos pela demonstração:",
            resposta.dadosRecebidos
        );

        statusContato.textContent =
            "Sucesso! A demonstração foi concluída. Nenhum e-mail foi enviado.";

        // Limpa os campos somente após o sucesso.

        formularioContato.reset();

        camposUtilizados.clear();

        tentativaRealizada = false;

        atualizarAssunto();

        atualizarContadorMensagem();

        camposContato.forEach(function (campo) {

            limparErro(campo);

        });

        resumoErros.hidden = true;

        resumoErros.textContent = "";

    } catch (erro) {

        console.error("Erro na demonstração:", erro);

        statusContato.textContent =
            "Não foi possível concluir o processamento. Seus dados foram preservados. Tente novamente.";

    } finally {

        // Libera o botão independentemente do resultado.

        formularioEnviando = false;

        botaoEnviar.disabled = false;

        botaoEnviar.textContent = "Enviar mensagem";

    }

});


// 11 - INICIALIZAÇÃO DO FORMULÁRIO

atualizarAssunto();

atualizarContadorMensagem();

console.log("Formulário de contato inicializado!");



// 12 INICIALIZAÇÃO


// Aplica o filtro inicial.
filtrarProjetos()

console.log("Todas as funcionalidades foram inicializadas!");