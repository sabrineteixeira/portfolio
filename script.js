console.log("JavaScript conectado com sucesso!");

// 1- Dados do perfil
const nome = "Sabrine Teixeira";
const area = "Desenvolvimento Full Stack";
const cidade = "Salvador";
const idade = 18;
const disponivelParaEstagio = true;

// Quantidades de projetos
const projetosConcluidos = 2;
const projetosEmAndamento = 1;

// 2- Tipos de dados com typeof
console.log("Tipo do nome:", typeof nome);
console.log("Tipo da idade:", typeof idade);
console.log("Tipo da disponibilidade:", typeof disponivelParaEstagio);

// 3- Apresentação com template literal
const apresentacao = `
Olá! Meu nome é ${nome}.
Sou estudante da área de ${area}.
Moro em ${cidade}.
Tenho ${idade} anos.
`;

console.log(apresentacao);

// 4- Operadores e cálculos
const totalProjetos = projetosConcluidos + projetosEmAndamento;

console.log("Projetos concluídos:", projetosConcluidos);
console.log("Projetos em andamento:", projetosEmAndamento);
console.log("Total de projetos:", totalProjetos);

// 5- Condicional if/else
if (totalProjetos > 0) {
    console.log("Existe pelo menos um projeto cadastrado.");
} else {
    console.log("Nenhum projeto cadastrado.");
}

// 6- Condicional if/else if/else
if (totalProjetos === 0) {
    console.log("Ainda sem projetos");
} else if (totalProjetos <= 2) {
    console.log("Portfólio em construção");
} else {
    console.log("Portfólio com vários projetos");
}

// 7- Operador lógico
// A mensagem aparece quando há projetos e a pessoa está disponível
// para estágio. O operador && exige que as duas condições sejam verdadeiras.
if (totalProjetos > 0 && disponivelParaEstagio) {
    console.log("Portfólio com projetos e disponibilidade para estágio.");
} else {
    console.log("Continue desenvolvendo seu perfil profissional.");
}

// 8- Função apresentarPerfil
function apresentarPerfil(nome, area) {
    return `Meu nome é ${nome} e atuo na área de ${area}.`;
}

const perfil = apresentarPerfil(nome, area);
console.log(perfil);

// Teste com outros dados
console.log(
    apresentarPerfil("Ana Silva", "Desenvolvimento Back-end")
);

// 9- Função resumirProjetos
function resumirProjetos(concluidos, andamento) {
    return concluidos + andamento;
}

const resumo = resumirProjetos(
    projetosConcluidos,
    projetosEmAndamento
);

console.log("Resumo dos projetos:", resumo);

// Teste com quantidades diferentes
console.log("Teste 1:", resumirProjetos(0, 0));
console.log("Teste 2:", resumirProjetos(1, 1));
console.log("Teste 3:", resumirProjetos(4, 2));
