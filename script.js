const ENDPOINT_EMAIL = "https://formspree.io/f/xkjrjedg";

//1- TEMA CLARO/ESCURO
const botaoTema = document.querySelector("#tema");

function aplicarTema(claro) {
    document.body.classList.toggle("claro", claro);
    botaoTema.textContent = claro ? "Tema escuro" : "Tema claro";
    botaoTema.setAttribute("aria-pressed", String(claro));
}

// Lembra a escolha da pessoa entre uma visita e outra
try {
    aplicarTema(localStorage.getItem("tema") === "claro");
} catch (e) {
    aplicarTema(false);
}

botaoTema.addEventListener("click", function () {
    const claro = !document.body.classList.contains("claro");
    aplicarTema(claro);
    try { localStorage.setItem("tema", claro ? "claro" : "escuro"); } catch (e) { /* sem armazenamento */ }
});

// 2- MENU NO CELULAR
const botaoMenu = document.querySelector("#menu-botao");
const menu = document.querySelector("#menu");

botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
});

// Fecha o menu ao escolher um link
menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) {
        menu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    }
});

// 3- MOSTRAR MAIS/MENOS(SOBRE MIM)
const botaoMostrar = document.querySelector("#mostrar-mais");
const textoExtra = document.querySelector("#sobre-extra");

botaoMostrar.addEventListener("click", function () {
    const estavaOculto = textoExtra.hidden;
    textoExtra.hidden = !estavaOculto;
    botaoMostrar.textContent = estavaOculto ? "Mostrar menos" : "Mostrar mais";
    botaoMostrar.setAttribute("aria-expanded", String(estavaOculto));
});

// 5- PROJETOS: FILTRAR, CONTAR, CADASTRAR, REMOVER
const listaProjetos = document.querySelector("#lista-projetos");
const filtro = document.querySelector("#filtro");
const contadorProjetos = document.querySelector("#contador-projetos");
const statusProjetos = document.querySelector("#status-projetos");
const statusCadastro = document.querySelector("#status-cadastro");
const formProjeto = document.querySelector("#cadastro-projeto");
const campoProjeto = document.querySelector("#projeto-nome");

function atualizarContador() {
    const visiveis = Array.from(listaProjetos.querySelectorAll(".card-projeto"))
        .filter(function (card) { return !card.hidden; });
    contadorProjetos.textContent = `Projetos visíveis: ${visiveis.length}`;
}

function filtrarProjetos() {
    listaProjetos.querySelectorAll(".card-projeto").forEach(function (card) {
        card.hidden = !(filtro.value === "todos" || card.dataset.categoria === filtro.value);
    });
    atualizarContador();
}

filtro.addEventListener("change", function () {
    filtrarProjetos();
    statusProjetos.textContent = `Filtro selecionado: ${filtro.value}.`;
});

formProjeto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nomeProjeto = campoProjeto.value.trim();

    if (nomeProjeto.length < 3) {
        statusCadastro.textContent = "O nome do projeto precisa ter pelo menos 3 caracteres.";
        campoProjeto.focus();
        return;
    }

    const categoria = document.querySelector("#projeto-categoria").value;

    // Monta o card com createElement (textContent evita injeção de HTML)
    const card = document.createElement("article");
    card.className = "card-projeto";
    card.dataset.categoria = categoria;

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.textContent = nomeProjeto.charAt(0).toUpperCase();

    const titulo = document.createElement("h3");
    titulo.textContent = nomeProjeto;

    const descricao = document.createElement("p");
    descricao.textContent = `Categoria: ${categoria.toUpperCase()}`;

    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "remover";
    botaoRemover.textContent = "Remover projeto";

    card.append(thumb, titulo, descricao, botaoRemover);
    listaProjetos.append(card);

    filtrarProjetos();
    statusCadastro.textContent = `Projeto "${nomeProjeto}" cadastrado com sucesso!`;
    formProjeto.reset();
});

// Delegação de eventos: um único "ouvinte" cuida de todos os botões Remover,
// inclusive dos cards criados depois
listaProjetos.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".remover");
    if (!botao) { return; }

    const card = botao.closest(".card-projeto");
    const nomeRemovido = card.querySelector("h3").textContent;

    card.remove();
    filtrarProjetos();
    statusProjetos.textContent = `O projeto "${nomeRemovido}" foi removido.`;
});

// 6- HABILIDADES: VER MAIS
document.querySelector("#lista-skills").addEventListener("click", function (evento) {
    const botao = evento.target.closest(".skill-mais");
    if (!botao) { return; }

    const detalhe = botao.nextElementSibling;
    detalhe.hidden = !detalhe.hidden;
    botao.textContent = detalhe.hidden ? "Ver mais" : "Ver menos";
    botao.setAttribute("aria-expanded", String(!detalhe.hidden));
});

// 7- FORMULÁRIO DE CONTATO
const formContato = document.querySelector("#form-contato");
const statusContato = document.querySelector("#status-contato");
const botaoEnviar = document.querySelector("#botao-enviar");
const campoMensagem = document.querySelector("#contato-mensagem");
const contadorMensagem = document.querySelector("#contador-mensagem");
const camposContato = [
    document.querySelector("#contato-nome"),
    document.querySelector("#contato-email"),
    document.querySelector("#contato-motivo"),
    campoMensagem
];

// Cada regra recebe o valor (sem espaços nas pontas) e devolve o texto do erro
// ou "" quando está tudo certo
const regras = {
    nome: function (v) {
        if (!v) { return "Informe seu nome."; }
        if (v.length < 3 || v.length > 80) { return "O nome deve ter de 3 a 80 caracteres."; }
        return "";
    },
    email: function (v, campo) {
        if (!v) { return "Informe seu e-mail."; }
        if (campo.validity.typeMismatch) { return "Informe um e-mail válido."; }
        return "";
    },
    motivo: function (v) {
        return v ? "" : "Selecione o motivo do contato.";
    },
    mensagem: function (v) {
        if (!v) { return "Digite sua mensagem."; }
        if (v.length < 30 || v.length > 1000) { return "A mensagem deve ter de 30 a 1000 caracteres."; }
        return "";
    }
};

function validarCampo(campo) {
    const erro = regras[campo.name](campo.value.trim(), campo);
    document.querySelector(`#erro-${campo.name}`).textContent = erro;

    if (erro) {
        campo.setAttribute("aria-invalid", "true");
    } else {
        campo.removeAttribute("aria-invalid");
    }
    return erro === "";
}

// Valida ao sair do campo; depois, a cada alteração
camposContato.forEach(function (campo) {
    campo.addEventListener("blur", function () {
        campo.dataset.tocado = "sim";
        validarCampo(campo);
    });
    campo.addEventListener("input", function () {
        if (campo.dataset.tocado) { validarCampo(campo); }
    });
});

campoMensagem.addEventListener("input", function () {
    contadorMensagem.textContent = `${campoMensagem.value.trim().length} / 1000 caracteres (mínimo 30)`;
});

formContato.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    if (botaoEnviar.disabled) { return; }

    // Valida todos os campos e foca o primeiro com problema
    let primeiroInvalido = null;
    camposContato.forEach(function (campo) {
        if (!validarCampo(campo) && !primeiroInvalido) { primeiroInvalido = campo; }
    });
    if (primeiroInvalido) {
        primeiroInvalido.focus();
        statusContato.textContent = "Corrija os campos indicados e envie novamente.";
        return;
    }

    // Campo isca preenchido = robô: finge sucesso e não envia nada
    if (formContato.elements["_gotcha"].value) { return; }

    if (ENDPOINT_EMAIL.includes("SEU_ID_AQUI")) {
        statusContato.textContent = "O envio ainda não foi configurado: cole o endereço do Formspree no script.js.";
        return;
    }

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    statusContato.textContent = "Enviando sua mensagem. Aguarde.";

    try {
        const resposta = await fetch(ENDPOINT_EMAIL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
                nome: camposContato[0].value.trim(),
                email: camposContato[1].value.trim(),     // vira o "responder para" do e-mail
                motivo: camposContato[2].value,
                mensagem: campoMensagem.value,
                _subject: "Nova mensagem do portfólio"
            })
        });

        if (!resposta.ok) { throw new Error("Resposta " + resposta.status); }

        statusContato.textContent = "Mensagem enviada! Responderei em breve.";
        formContato.reset();
        camposContato.forEach(function (campo) {
            delete campo.dataset.tocado;
            campo.removeAttribute("aria-invalid");
            document.querySelector(`#erro-${campo.name}`).textContent = "";
        });
        contadorMensagem.textContent = "0 / 1000 caracteres (mínimo 30)";

    } catch (erro) {
        console.error("Falha no envio:", erro);
        statusContato.textContent = "Não foi possível enviar agora. Seus dados foram mantidos. Tente novamente.";
    } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar mensagem";
    }
});

// 8- INICIALIZAÇÃO
filtrarProjetos();
