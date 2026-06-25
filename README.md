# ORVYN Sistemas — Landing Page

Site institucional da ORVYN Sistemas. Experiência imersiva com scroll horizontal, animações 3D e navegação fluida por clips-path.

[![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://orvyn-ia.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

---

## Stack

| Tecnologia | Uso |
|---|---|
| Next.js 16 (App Router) | Framework React com Turbopack |
| React 19 | UI |
| TypeScript 5 | Tipagem estrita |
| GSAP + ScrollTrigger | Scroll horizontal via clip-path |
| Framer Motion | Animações de conteúdo por slide |
| Tailwind CSS | Estilos responsivos |
| pnpm | Gerenciador de pacotes |

## Arquitetura de animação

7 slides empilhados em `position: absolute`. O GSAP controla **somente** `clipPath` e posição/escala da gema. O Framer Motion controla **somente** opacidade e `y` do conteúdo, via prop `active` derivada do progresso do scroll.

```
Scroll → ScrollTrigger.onUpdate → setCurrent(i)
                                        ↓
                              Framer Motion variants
                              (show/hide por slide)
```

Direção de reveal alternada por slide:
- Ímpar → `inset(0 0 0 100%)` → `inset(0% 0% 0% 0%)` (da direita)
- Par → `inset(100% 0 0 0)` → `inset(0% 0% 0% 0%)` (de baixo)

Gema flutua entre 7 posições fixas animadas via `left` / `top` / `scale` com GSAP, independente do conteúdo.

## Responsividade mobile

- Sem branch de layout separado para mobile — mesmo componente, mesma arquitetura de animação
- `GEM.mobile` — posições e escala adaptadas para portrait
- `scrub: 1.2` no mobile vs `scrub: 2` no desktop
- Grids responsivos com Tailwind: `grid-cols-2 lg:grid-cols-4`, `grid-cols-1 sm:grid-cols-3`
- Fontes com `clamp()` em todos os headings

## Slides

| # | Nome | Fundo |
|---|---|---|
| 0 | Intro — headline + métricas | Escuro |
| 1 | Pilares — 4 serviços | Claro |
| 2 | Produtos — Rulles IA | Claro |
| 3 | Processo — 4 etapas | Escuro |
| 4 | Por que Orvyn — diferenciais | Claro |
| 5 | Depoimentos | Claro |
| 6 | CTA — chamada final + footer | Escuro |

## Setup local

```bash
# Requer Node 20 + pnpm 9
corepack enable
corepack use pnpm@9

pnpm install
pnpm dev
```

Acesse `http://localhost:3000`.

## Deploy

Vercel com detecção automática Next.js. Variáveis de ambiente não são necessárias para o site estático.

---

© 2026 ORVYN Sistemas
