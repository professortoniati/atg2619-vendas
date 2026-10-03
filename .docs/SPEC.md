# SPEC — TITAN PULSE | VitalPro Ultra
**Revisão:** 2026-10-03 · Status baseado no estado atual do projeto

---

## Contexto
Arquivo de origem: `stitch/code.html` (gerado via Google Stitch, com HTML + CSS inline/embutido).
Arquivo de design: `stitch/DESIGN.md`.

---

## Requisitos & Status de Conformidade

| # | Requisito | Status | Observações |
|---|-----------|--------|-------------|
| 1 | Separar CSS inline em `style.css` externo | ✅ **Concluído** | Bloco `<style>` removido do `index.html`. `<link rel="stylesheet" href="style.css" />` adicionado ao `<head>`. |
| 2 | Animações universais em todos os elementos (Cinemática + Scroll Reveal + 3D) | ✅ **Concluído** | 100% dos elementos animados: entrada cinemática do Hero (on-load), scroll reveal universal com IntersectionObserver, hover 3D tilt, shimmers em botões, flutuação contínua e contadores dinâmicos. |
| 3 | Estruturação semântica (header, main, section, footer) | ✅ Atendido | O `index.html` utiliza tags semânticas `<header>`, `<main>`, `<section id="...">`, `<footer>`. |
| 4 | Modularização — identificar componentes repetitivos | ⚠️ Não aplicado | HTML puro sem bundler. Componentes identificados no CSS. Para modularização real, adotar Vite. |
| 5 | Limpeza de código — remover redundâncias do Stitch | ✅ **Concluído** | CSS duplicado eliminado. Script inline removido. Apenas `style.css` e `main.js` externos. |
| 6 | Otimização de assets — caminhos para produção | ✅ Atendido | Pasta `assets/images/` e `assets/fonts/` criadas. Fontes via Google Fonts com `preconnect`. |
| 7 | Melhorar design sem perder características essenciais | ✅ Atendido | Design "Obsidian Kinetic" com tokens, glassmorphism, gradientes e tipografia premium. |
| 8 | Lazy loading real e animações ao carregar na tela | ✅ **Concluído** | IntersectionObserver real com efeito blur-up + fade-in, `ScrollTrigger.refresh()` dinâmico e barra de progresso de rolagem. |

---

## Pendências

### ✅ P1 — CSS duplicado / `style.css` não referenciado — **RESOLVIDO**
Bloco `<style>` removido do `index.html`. `<link rel="stylesheet" href="style.css" />` adicionado ao `<head>`.

---

### ✅ P2 — Pasta `old/` duplicava arquivos de `stitch/` — **RESOLVIDO**
Pasta `stitch/` removida. Apenas `old/` mantida como arquivo dos originais.

---

### ✅ P3 — Lazy loading Real — **RESOLVIDO**
IntersectionObserver nativo observando imagens com efeito blur-up `.lazy-image` e disparo de `ScrollTrigger.refresh()` garantindo renderização instantânea e suave.

---

### ✅ P4 — Animações Agressivas com GSAP + ScrollTrigger — **RESOLVIDO**
GSAP 3.12.5 + ScrollTrigger adicionados ao projeto via CDN (sem React):
- Entrada de impacto do Hero com easing `power4.out` e bounce nos elementos de destaque.
- Efeito 3D Tilt nos cards e imagem do produto baseado na posição do mouse.
- Stagger e revelação direcional (`.reveal--left`, `.reveal--right`, `.reveal--scale`) em todas as seções.
- Contadores numéricos acelerados matematicamente até o valor alvo.
- Parallax nos glows e no smartwatch.
- Barra de progresso de leitura fixa no topo da página.
- Fallback seguro para acessibilidade e `prefers-reduced-motion`.

---

### 🟡 P5 — HTML monolítico — **DECISÃO PENDENTE**
O HTML tem 890 linhas (reduzido após remoção do CSS inline). Para modularização de componentes, seria necessário adotar Vite ou similar.


---

## Estrutura de Pastas Atual

```
07 Vendas/
├── .agents/
├── .docs/
│   └── SPEC.md
├── .vscode/
│   └── settings.json
├── assets/
│   ├── fonts/
│   └── images/
├── old/               ⚠️ Duplicata de stitch/
│   ├── code.html
│   ├── DESIGN.md
│   └── screen.png
├── stitch/            Arquivos originais do Google Stitch
│   ├── code.html
│   ├── DESIGN.md
│   └── screen.png
├── index.html         ⚠️ Contém CSS inline duplicado, sem link para style.css
├── main.js            ✅ JS modularizado
└── style.css          ✅ Criado, mas não vinculado ao HTML
```

---

## Estrutura de Pastas Esperada (Alvo)

```
07 Vendas/
├── .agents/
├── .docs/
│   └── SPEC.md
├── .vscode/
│   └── settings.json
├── assets/
│   ├── fonts/
│   └── images/
├── old/               Apenas os originais arquivados aqui
│   ├── code.html
│   ├── DESIGN.md
│   └── screen.png
├── index.html         ✅ Sem CSS inline, com <link> para style.css
├── main.js            ✅ JS de interatividade
└── style.css          ✅ Vinculado ao HTML
```

---

## Checklist de Entregáveis

- [x] Estrutura de pastas sugerida → criada
- [x] `index.html` sem bloco `<style>` inline → **concluído (P1)**
- [x] `<link rel="stylesheet" href="style.css">` no `<head>` → **concluído (P1)**
- [x] `style.css` separado → existe
- [x] HTML com tags semânticas → atendido
- [x] HTML limpo e indentado → atendido
- [x] Motion One (Framer Motion vanilla) → **implementado (P4)**
- [x] `loading="lazy"` nas imagens → imagens below the fold já tinham o atributo
- [x] Animações ao entrar na tela → `inView()` + Motion One com stagger
- [x] Arquivos originais apenas em `old/` → **concluído (P2)**, `stitch/` removida