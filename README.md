# TITAN PULSE | VitalPro Ultra

> Landing Page de Alta Conversão para o smartwatch premium **TITAN PULSE VitalPro Ultra**. Projeto desenvolvido com foco em estética executiva "Obsidian Kinetic", alta performance, acessibilidade e animações cinemáticas fluidas em Vanilla JavaScript.

---

## 📋 Descrição do Projeto

Esta landing page foi construída do zero utilizando HTML5 semântico, Vanilla CSS arquitetado com Design Tokens e Vanilla JavaScript acelerado por hardware. O projeto oferece uma experiência imersiva de compra com carregamento ultrarrápido, micro-animações, efeito 3D tilt nos cards, lazy loading inteligente de imagens e contadores em tempo real.

---

## ✨ Principais Funcionalidades

- **Hero Cinemático**: Apresentação com animação coreografada na entrada (Header, Headline, Card de Oferta, Visual 3D do smartwatch e selos de escassez).
- **Animações Fluidas em 100% dos Elementos**:
  - *Scroll Reveal* nativo com aceleração por GPU (`translate3d`, `filter: blur`, `cubic-bezier`).
  - Efeito cascata (*stagger*) na exibição de cards, especificações técnicas e garantias.
  - Flutuação contínua orgânica nos badges e na foto do produto.
  - Efeito *shimmer* (varredura luminosa) em botões de conversão CTA.
- **Interatividade 3D Tilt**: Inclinação dinâmica dos cards e smartwatch baseada na física do cursor do mouse.
- **Lazy Loading Real**: Carregamento sob demanda com efeito *blur-up* via `IntersectionObserver` com margem antecipada e failsafe automático.
- **Contadores Numéricos**: Animação matemática fluida com easing cúbico para métricas de prova social e modalidades monitoradas.
- **Barra de Leitura Superior**: Indicador luminoso neon em tempo real que acompanha a rolagem da página.
- **Sticky CTA Inteligente**: Barra persistente de compra rápida no rodapé que se oculta automaticamente ao atingir o formulário de checkout.
- **Acessibilidade Completa**: Suporte total a `prefers-reduced-motion`, contraste WCAG AAA e navegação por teclado.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Descrição |
|---|---|---|
| **Estrutura** | HTML5 Semântico | Tags `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` |
| **Estilização** | CSS3 Moderno (Vanilla) | Design tokens HSL, glassmorphism, grid responsivo, animações CSS3 |
| **Lógica** | JavaScript (ES6+ Vanilla) | IntersectionObserver nativo, lógica de rolagem, tilt 3D e contadores |
| **Motion** | GSAP 3.12.5 + ScrollTrigger | Bibliotecas locais em `assets/js/` (100% offline e sem dependências) |
| **Tipografia** | Google Fonts | Sora, Hanken Grotesk, JetBrains Mono e Material Symbols |

---

## 📁 Estrutura do Projeto

```text
07 Vendas/
├── assets/
│   ├── js/
│   │   ├── gsap.min.js           # Biblioteca GSAP 3 (local)
│   │   └── ScrollTrigger.min.js  # Plugin ScrollTrigger (local)
│   ├── fonts/                    # Fontes do projeto
│   └── images/                   # Imagens locais do projeto
├── old/                          # Arquivos de referência e histórico
│   ├── code.html
│   ├── DESIGN.md
│   └── screen.png
├── .docs/
│   ├── SPEC.md                   # Especificações técnicas e checklist de entrega
│   └── prompt_github.md          # Orientações DevOps e versionamento
├── .gitignore                    # Regras de exclusão do Git
├── index.html                    # Estrutura principal da Landing Page
├── style.css                     # Design System, tokens e regras de estilo
├── main.js                       # Motor de animações, lazy loading e interatividade
└── README.md                     # Documentação completa do projeto
```

---

## 🚀 Como Executar o Projeto

Como o projeto é desenvolvido em **Vanilla Web** (sem necessidade de bundlers pesados ou compilação), não é necessário instalar dependências via npm ou yarn.

### Pré-requisitos
- Qualquer navegador moderno (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Opera).

### Opção 1: Execução Direta (Sem Servidor)
Dê um duplo clique no arquivo `index.html` ou abra-o diretamente no navegador.

### Opção 2: Com VSCode Live Server (Recomendado para Desenvolvimento)
1. Abra a pasta do projeto no **Visual Studio Code**.
2. Instale a extensão **Live Server** (caso ainda não possua).
3. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"** (ou use o atalho `Alt + L, Alt + O`).
4. A página será aberta automaticamente em `http://127.0.0.1:5501`.

### Opção 3: Com Node.js / Python (Servidor Local)
Caso prefira rodar um servidor HTTP local via terminal:

**Com Python:**
```bash
python -m http.server 8000
```
Acesse: `http://localhost:8000`

**Com Node.js (npx serve):**
```bash
npx serve .
```

---

## 🧪 Validação e Testes

- **Validação de Sintaxe**: Código JavaScript e CSS validados sem erros de execução ou chaves desbalanceadas.
- **Cross-Browser**: Testado e compatível com motores Chromium, Gecko e WebKit.
- **Acessibilidade**: Se o usuário tiver ativado o modo de redução de movimento no sistema operacional (`prefers-reduced-motion`), todas as animações dinâmicas são desativadas automaticamente, garantindo conforto visual e conformidade com as diretrizes WCAG.

---

## 📄 Licença

Distribuído sob licença proprietária de Titan Pulse Inc. Todos os direitos reservados.
