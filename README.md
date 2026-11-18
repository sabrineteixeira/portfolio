 Portfólio Pessoal — Sabrine Teixeira

Portfólio web interativo desenvolvido para apresentar minha trajetória como estudante de Desenvolvimento Full Stack, meus projetos práticos, habilidades técnicas e canal direto de contato.

 1. Descrição e Tecnologias

O projeto consiste em uma Single Page Application (SPA) estática e responsiva, construída sem frameworks externos para consolidar fundamentos de desenvolvimento web, manipulação segura do DOM, acessibilidade (WAI-ARIA) e consumo de APIs assíncronas.

HTML5 Semântico: Estruturação com tags `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` e atributos ARIA (`aria-live`, `aria-expanded`, `aria-invalid`).
CSS3: Estilização responsiva via CSS Grid e Flexbox, além de sistema de temas (Escuro/Claro) gerenciado por variáveis nativas (`--fundo`, `--superficie`, `--texto`).
*JavaScript (ES6+): Manipulação dinâmica do DOM, delegação de eventos, persistência com `localStorage`, validação em tempo real e envio assíncrono via `fetch` API.

 2. Modo de Execução

Como o projeto utiliza tecnologias front-end puras, não requer instalação de dependências ou etapas de build.

Opção A: Execução via Servidor Local (Recomendado)
1. Clone este repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/sabrineteixeira/portfolio.git
   ```
2. Abra a pasta do projeto no VS Code
3. Utilize a extensão **Live Server** (clique com o botão direito em `index.html` > *Open with Live Server*).
   Nota: Executar via protocolo `http://localhost` evita bloqueios de segurança (CORS) ao testar o envio do formulário de contato e o armazenamento local.

 Opção B: Abertura Direta
1. Navegue até a pasta raiz do projeto.
2. Dê um duplo clique no arquivo `index.html` para abri-lo no seu navegador padrão.

---

3. Diagnóstico de Cinco Problemas

Durante a auditoria técnica do código-fonte (`index.html`, `style.css` e `script.js`), foram diagnosticados cinco pontos de melhoria:

1. Chave de fechamento ausente na Media Query (`style.css`):
   Problema: Na linha 178 de `style.css`, o bloco `@media (max-width: 700px)` não possui a chave de fechamento `}` antes da declaração `@media (prefers-reduced-motion: reduce)`. Isso faz com que a regra de acessibilidade fique aninhada incorretamente e perca efeito em telas maiores que 700px.
2. Inconsistência inicial no contador de projetos (`index.html`):
   Problema: O HTML estático define inicialmente `<p id="contador-projetos">Projetos visíveis: 2</p>`, porém existem **3** cards cadastrados na grade. Embora o `script.js` corrija esse valor ao carregar (`filtrarProjetos()`), usuários com conexões lentas ou sem JS visualizam uma contagem incorreta.
3. Cards cadastrados dinamicamente sem estrutura completa (`script.js`):
   * **Problema:** Ao adicionar um novo projeto pelo formulário (`#cadastro-projeto`), o JavaScript cria apenas o título, a categoria e o botão de remover, omitindo a lista de tecnologias (`<ul class="tags">`) e o link externo presentes nos cards originais.
4. **Falta de persistência nos projetos cadastrados/removidos (`script.js`):**
   * **Problema:** Diferente da preferência de tema (salva em `localStorage`), as alterações feitas na lista de projetos (adição ou remoção) existem apenas em memória e são perdidas ao recarregar a página.
5. **Contrastes de foco no botão de habilidades (`style.css`):**
   * **Problema:** A classe `.skill-mais` define `background: transparent` herdando `color: white` da regra genérica `button`. Quando o usuário ativa o **Tema Claro** (`body.claro`), o fundo da página fica claro (`#f5f3ff`) e o texto branco do botão perde legibilidade.

---

 4. Evidências de Antes e Depois

 Evidência 1: Correção da Sintaxe CSS e Acessibilidade de Movimento (`style.css`)
* **Antes:**
  ```css
  @media (max-width: 700px) {
      /* ... regras mobile ... */
      .hero, .contato { grid-template-columns: 1fr; }
      
  /* Respeita quem prefere menos movimento */
  @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      }
  ```
* **Depois:**
  ```css
  @media (max-width: 700px) {
      /* ... regras mobile ... */
      .hero, .contato { grid-template-columns: 1fr; }
  }

  /* Respeita quem prefere menos movimento em qualquer largura de tela */
  @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
  }
  ```

 Evidência 2: Sincronização do Contador Inicial de Projetos (`index.html`)
* **Antes:**
  ```html
  <p id="contador-projetos" aria-live="polite">Projetos visíveis: 2</p>
  ```
* **Depois:**
  ```html
  <p id="contador-projetos" aria-live="polite">Projetos visíveis: 3</p>
  ```

Evidência 3: Legibilidade do Botão "Ver mais" no Tema Claro (`style.css`)
* **Antes:**
  ```css
  .skill-mais { 
      align-self: flex-start; 
      background: transparent; 
      border: 1px solid var(--roxo); 
      padding: 4px 12px; 
  }
  ```
* **Depois:**
  ```css
  .skill-mais { 
      align-self: flex-start; 
      background: transparent; 
      color: var(--texto);
      border: 1px solid var(--roxo); 
      padding: 4px 12px; 
  }
  .skill-mais:hover {
      color: white;
  }
  ```

5. Matriz de Testes

| ID | Funcionalidade | Cenário / Entrada | Resultado Esperado | Status |
| :--- | :--- | :--- | :--- | :---: |
| **CT-01** | Alternância de Tema | Clicar no botão "Tema claro" e recarregar a página (`F5`). | O tema alterna para claro, `aria-pressed` muda para `"true"` e a escolha persiste após recarregar. | Aprovado |
| **CT-02** | Menu Responsivo | Redimensionar tela para `< 700px`, abrir menu e clicar em "Projetos". | O botão "Menu" aparece, expande os links ao clicar e fecha automaticamente após selecionar a âncora. | Aprovado |
| **CT-03** | Filtro de Projetos | Selecionar a opção "Mobile" no `<select id="filtro">`. | Os 3 cards "Web" são ocultados (`hidden`), o contador exibe `"Projetos visíveis: 0"` e a região `aria-live` anuncia o filtro. | Aprovado |
| **CT-04** | Cadastro de Projeto | Digitar `"Ab"` (2 caracteres) e submeter o formulário. | O envio é bloqueado, foco vai para o input e exibe: *"O nome do projeto precisa ter pelo menos 3 caracteres."* | Aprovado |
| **CT-05** | Remoção de Projeto | Clicar em "Remover projeto" em um card recém-criado. | O card é removido do DOM via delegação de eventos, o contador decrementa e o status confirma a exclusão. | Aprovado |
| **CT-06** | Validação de Contato | Sair (`blur`) do campo Mensagem com apenas 15 caracteres digitados. | O campo recebe `aria-invalid="true"` e exibe o erro: *"A mensagem deve ter de 30 a 1000 caracteres."* | Aprovado |
| **CT-07** | Proteção Anti-Spam | Preencher o campo oculto `_gotcha` via DevTools e enviar formulário válido. | O script intercepta o preenchimento, aborta a requisição `fetch` silenciosamente e não envia spam. | Aprovado |
| **CT-08** | Envio de Contato | Preencher todos os campos corretamente e clicar em "Enviar mensagem". | O botão desabilita durante o `POST` no Formspree, exibe mensagem de sucesso e limpa o formulário. | Aprovado |


 6. Revisão do Colega 

> **Revisor:** Lucas Almeida (Desenvolvedor Front-End)  
> **Data:** Novembro de 2026  

**Pontos Positivos:**
* **Excelente atenção à acessibilidade:** O uso consistente de `aria-live="polite"` para feedbacks dinâmicos (contadores e status de envio), `aria-expanded` nos controles retráteis e `aria-invalid` nos inputs demonstra maturidade técnica.
* **Segurança contra XSS:** Na criação dinâmica de cards de projeto, a escolha de `document.createElement` combinada com `.textContent` (em vez de `innerHTML`) neutraliza qualquer tentativa de injeção de scripts maliciosos.
* **Performance com Event Delegation:** O uso de um único `addEventListener` no container `#lista-projetos` e `#lista-skills` evita vazamento de memória e garante que elementos criados dinamicamente funcionem sem precisar reatribuir eventos.

**Sugestões de Melhoria:**
* No CSS, corrigir o fechamento da media query mobile que está englobando a regra `prefers-reduced-motion` e ajustar a cor do texto do botão `.skill-mais` quando o tema claro estiver ativo.
* Adicionar um estado vazio amigável (ex: *"Nenhum projeto encontrado nesta categoria"*) quando o filtro retornar 0 resultados.


7. Explicação de uma Refatoração

 Contexto: Validação Declarativa e Delegação de Eventos
Originalmente, a validação de formulários e o controle dos botões "Remover" ou "Ver mais" costumam ser escritos com estruturas repetitivas (`if/else` encadeados para cada campo e `forEach` atrelando um ouvinte de evento para cada botão individualmente).

 Como foi refatorado:
1. **Dicionário de Regras (`const regras`):**
   No `script.js`, toda a lógica de validação do formulário de contato foi extraída para um objeto de mapeamento onde cada chave corresponde ao atributo `name` do input (`nome`, `email`, `motivo`, `mensagem`). A função genérica `validarCampo(campo)` apenas consulta `regras[campo.name](valor, campo)`.
   * **Benefício:** Elimina duplicação de código (princípio DRY), facilita a manutenção e permite adicionar novos campos no HTML sem precisar alterar o motor de validação.
2. **Delegação de Eventos (`Event Delegation`):**
   Em vez de buscar todos os botões `.remover` no carregamento da página, o evento de clique foi anexado apenas ao elemento pai `#lista-projetos`, verificando o alvo com `evento.target.closest(".remover")`.
   * **Benefício:** Reduz o consumo de memória e resolve o bug clássico onde cards criados dinamicamente pelo usuário não respondiam ao clique de remoção.

---

 8. Como o Contato Funciona

O formulário de contato utiliza uma arquitetura Serverless (Jamstack) integrada ao serviço **Formspree**, permitindo o recebimento de e-mails sem a necessidade de configurar um servidor back-end próprio:

1. Validação em Duas Etapas (UX):
   * Enquanto o usuário digita, o evento `input` atualiza o contador de caracteres em tempo real.
   * Ao sair de cada campo (`blur`), o atributo `data-tocado="sim"` é ativado. A partir desse momento, qualquer correção é validada instantaneamente, evitando exibir mensagens de erro agressivas antes mesmo de o usuário terminar de digitar pela primeira vez.
2. **Prevenção contra Robôs (Honeypot):**
   * Existe um campo oculto visualmente (`<input name="_gotcha" class="isca" tabindex="-1">`). Humanos não o veem nem o preenchem, mas bots automatizados costumam preencher todos os inputs da página. No `submit`, se `_gotcha` contiver algum valor, o JavaScript interrompe o processo antes de consumir a cota da API.
3. **Envio Assíncrono (`Fetch API`):**
   * O evento `submit` intercepta o comportamento padrão (`evento.preventDefault()`), bloqueia o botão de envio (`botaoEnviar.disabled = true`) para evitar cliques duplos e dispara uma requisição HTTP `POST` com payload JSON para o `ENDPOINT_EMAIL`.
4. **Tratamento de Resposta e Resiliência:**
   * **Sucesso (`resposta.ok`):** Exibe a confirmação na região `aria-live`, reseta os campos e limpa os estados de validação.
   * **Falha de rede ou servidor (`catch`):** Mantém os dados digitados intactos para que o usuário não perca sua mensagem e exibe uma orientação clara para tentar novamente.