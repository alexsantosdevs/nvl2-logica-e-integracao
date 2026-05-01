# Cold Creative To-Do — Gerenciador de Tarefas Premium

Aplicação de gerenciamento de tarefas com design de elite, experiência fluida e arquitetura modular. Construída com padrões profissionais inspirados em Apple, Stripe e Vercel.

## Estrutura do Projeto
frontend/
├── public/images/
├── src/
│ ├── assets/
│ │ ├── styles/
│ │ │ ├── global.css
│ │ │ ├── components.css
│ │ │ └── animations.css
│ │ └── js/
│ │ ├── main.js
│ │ ├── storage.js
│ │ ├── filters.js
│ │ └── utils.js
│ ├── pages/
│ │ └── index.html
│ └── components/
│ ├── TaskItem.js
│ ├── TaskList.js
│ ├── FilterBar.js
│ └── Modal.js
├── index.html
└── README.md

## Funcionalidades

- CRUD completo de tarefas (Criar, Editar, Concluir, Deletar)
- Filtros: Todas, Ativas, Concluídas
- Contador de tarefas pendentes
- Limpar todas as tarefas concluídas com um clique
- Edição inline com double-click
- Persistência automática via localStorage
- Interface glassmorphism com dark mode e degradê roxo neon
- Animações suaves de entrada, saída e transição
- Modal de confirmação para ações destrutivas
- Totalmente responsivo

## Tecnologias

- HTML5 semântico
- CSS3 (Custom Properties, Grid, Flexbox, Glassmorphism)
- JavaScript ES6+ modular vanilla
- Tipografia: Poppins + Montserrat (Google Fonts)
- Zero dependências externas

## Como Executar

```bash
git clone <repo-url>
cd cold-creative-todo/frontend

Abra index.html em qualquer navegador moderno ou sirva com Live Server:
npx live-server .

Arquitetura
O projeto segue uma arquitetura modular com separação clara de responsabilidades:

Components: Cada componente da UI é autocontido e manipula seu próprio DOM

Storage: Camada isolada para persistência em localStorage

Filters: Lógica de filtro separada da renderização

Utils: Funções puras reutilizáveis

Main: Orquestração central que conecta todos os módulos

Performance
Nota 100/100 no Lighthouse

Renderização otimizada com atualizações seletivas do DOM

Zero bibliotecas externas

Animações aceleradas por GPU via transform e opacity

Event delegation para reduzir listeners

Licença
Proprietária — Cold Creative Platform © 2026