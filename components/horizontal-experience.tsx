'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, TrendingUp, Bot, LayoutDashboard, Globe,
  Scale, FileText, Bell, BarChart2,
  Crosshair, Code2, CheckCircle, Star, ChevronRight,
} from 'lucide-react'

// ── palette ───────────────────────────────────────────────────────────────────
const C = {
  brand:      '#A822DD',
  brandLt:    '#CC55EC',
  brandHi:    '#E088F8',
  slide:      'rgba(7,6,15,0.86)',
  text:       '#f2f0fc',
  muted:      'rgba(242,240,252,0.52)',
  card:       'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.10)',
  g: (a: number) => `rgba(168,34,221,${a})`,
}

// ── content data ──────────────────────────────────────────────────────────────
const pillars = [
  { n:'01', Icon:TrendingUp,      t:'Gestão de Tráfego',  d:'Atraia clientes qualificados todos os dias através de campanhas estratégicas otimizadas.' },
  { n:'02', Icon:Bot,             t:'IA para Atendimento', d:'Automatize atendimentos 24h. Nossa IA qualifica leads e conduz clientes pelo funil.' },
  { n:'03', Icon:LayoutDashboard, t:'Sistema de Gestão',   d:'Centralize toda a operação da empresa em uma plataforma feita para sua realidade.' },
  { n:'04', Icon:Globe,           t:'Landing Page & Dev',  d:'Páginas de alta conversão e sistemas sob medida. Do design ao código, premium.' },
]
const steps = [
  { n:'01', t:'Diagnóstico',   d:'Mapeamos processos, identificamos gargalos e definimos onde a IA gera mais impacto.' },
  { n:'02', t:'Arquitetura',   d:'Desenhamos o fluxo técnico: integrações, triggers, modelos e estrutura de dados.' },
  { n:'03', t:'Implementação', d:'Construímos e testamos automações, bots, CRM e criativos em cada componente.' },
  { n:'04', t:'Escala',        d:'Monitoramos, otimizamos e expandimos. O sistema evolui com o seu negócio.' },
]
const diffs = [
  { n:'01', Icon:Crosshair,   t:'Nichado, não genérico',        d:'Cada solução é construída para o problema específico do seu negócio.' },
  { n:'02', Icon:Code2,       t:'Prompt Engineering real',       d:'Nossa base é engenharia de prompt estruturada. Resultado técnico, performance mensurável.' },
  { n:'03', Icon:CheckCircle, t:'Automação sem código fantasma', d:'Fluxos que funcionam meses depois, documentados e com suporte de evolução.' },
]
const testimonials = [
  { name:'Rafael Santos',   role:'Sócio-fundador, Santos & Associados',      text:'Rulles IA transformou nosso workflow. O que levava 3h agora leva 30min. Impecável.' },
  { name:'Mariana Costa',   role:'Diretora de Marketing, E-commerce Growth', text:'A automação de tráfego da Orvyn transformou nossa captação. 45% mais conversão.' },
  { name:'Felipe Oliveira', role:'CTO, Tech Startup',                        text:'A Orvyn não vende software, vende entendimento. Entendem o problema antes do código.' },
]

// ── Gem path: 13 waypoints repositioned to avoid blocking content ─────────────
// d: [xPct, yPct, scale, rotate] desktop  |  m: mobile
const WAYPOINTS = [
  { t:0.0, d:[68, 42, 1.10,  0  ], m:[50, 40, 0.90,   0  ] },
  { t:0.5, d:[ 5, 10, 0.72, -14 ], m:[ 8,  8, 0.58,  -14 ] },
  { t:1.0, d:[ 8, 60, 0.56, -22 ], m:[10, 62, 0.44,  -20 ] },
  { t:1.5, d:[90, 32, 0.68,  12 ], m:[88, 28, 0.54,   12 ] },
  { t:2.0, d:[84, 50, 0.72,   8 ], m:[88, 50, 0.58,    8 ] },
  { t:2.5, d:[50, 88, 0.58,  -5 ], m:[50, 90, 0.46,   -5 ] },
  { t:3.0, d:[10, 78, 0.54,   0 ], m:[10, 80, 0.44,    0 ] },
  { t:3.5, d:[90, 65, 0.62, -16 ], m:[92, 68, 0.50,  -16 ] },
  { t:4.0, d:[ 8, 40, 0.60, -10 ], m:[ 8, 42, 0.48,  -10 ] },
  { t:4.5, d:[50, 10, 0.72,  18 ], m:[50,  8, 0.58,   18 ] },
  { t:5.0, d:[90, 28, 0.66,   6 ], m:[92, 26, 0.54,    6 ] },
  { t:5.5, d:[50, 36, 1.00,   0 ], m:[50, 34, 0.82,    0 ] },
  { t:6.0, d:[50, 42, 1.45,   0 ], m:[50, 40, 1.14,    0 ] },
]
const GEM_SIZE = { d: 64, m: 44 }
function toXY(xPct: number, yPct: number, half: number) {
  return {
    x: window.innerWidth  * (xPct / 100) - half,
    y: window.innerHeight * (yPct / 100) - half,
  }
}

// ── Per-slide choreography ─────────────────────────────────────────────────────
const SLIDE_CLIP = [
  '',
  'inset(0 0 0 100%)',
  'inset(0 100% 0 0)',
  'inset(0 0 100% 0)',
  'inset(0 0 0 100%)',
  'inset(100% 0 0 0)',
  'inset(0 0 100% 0)',
]
// r = rotation for entrance spin effect (Noomo-style burst)
const SLIDE_ENTRY = [
  null,
  { x: -28, y: -18, s: 1,    r: -10 },
  { x:  32, y:   0, s: 1,    r:  10 },
  { x:   0, y:  28, s: 1,    r:  -7 },
  { x: -30, y:   0, s: 1,    r:   7 },
  { x:   0, y: -28, s: 1,    r:  -9 },
  { x:   0, y:  10, s: 0.92, r:   5 },
]

const N = 7

// ── Shared slide wrapper ───────────────────────────────────────────────────────
// Uses backgroundColor separate from backgroundImage to ensure dark bg always shows
function SlideWrap({ r, children, accent }: {
  r: (e: HTMLDivElement | null) => void
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      ref={r}
      className="absolute inset-0 overflow-hidden"
      style={{
        backgroundColor: C.slide,
        backgroundImage: accent
          ? `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,34,221,0.07) 0%, transparent 70%)`
          : undefined,
      }}
    >
      {children}
    </div>
  )
}

// ── Label ─────────────────────────────────────────────────────────────────────
function Label({ t }: { t: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-px" style={{ background: C.brandHi }} />
      <span className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: C.brandHi }}>{t}</span>
    </div>
  )
}

// ── SLIDE 0 — Hero ────────────────────────────────────────────────────────────
function S0({ r }: { r:(e:HTMLDivElement|null)=>void }) {
  return (
    <SlideWrap r={r} accent>
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          <div>
            <div data-anim className="flex items-center gap-3 mb-5 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ border:`1px solid ${C.g(.3)}`, fontSize:10, fontWeight:600, letterSpacing:'.14em', textTransform:'uppercase', color:C.brandHi }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:C.brand }} />
                ORVYN SISTEMAS — 2026
              </div>
            </div>

            {([
              { t:'Inteligência que', accent:false },
              { t:'automatiza.',      accent:true  },
              { t:'Estratégia que',   accent:false },
              { t:'converte.',        accent:true  },
            ] as const).map(({ t, accent }) => (
              <div key={t} data-anim className="overflow-hidden">
                <span className={`font-display font-bold block leading-[.93]${accent?' text-gradient':''}`}
                  style={{ fontSize:'clamp(2rem,7vw,5.2rem)', color: accent ? undefined : C.text }}>{t}</span>
              </div>
            ))}

            <div data-anim className="flex flex-col sm:flex-row gap-3 mt-7 sm:mt-10">
              <Link href="#" className="btn-primary inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white">
                Ver Produtos <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link href="mailto:orvynsistemas@outlook.com"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base"
                style={{ border:`1px solid rgba(255,255,255,.12)`, color:C.text, background:'rgba(255,255,255,.05)' }}>
                Falar com Especialista
              </Link>
            </div>
          </div>

          <div data-anim className="grid grid-cols-2 gap-3 sm:gap-5">
            {[{ v:'+40',label:'Clientes Ativos' },{ v:'98%',label:'Retenção' },{ v:'3',label:'Produtos SaaS' },{ v:'5+',label:'Anos de Mercado' }]
              .map(({ v, label }) => (
              <div key={label} className="rounded-2xl p-4 sm:p-6"
                style={{ background: C.card, border:`1px solid ${C.cardBorder}` }}>
                <div className="font-display font-bold text-3xl sm:text-4xl mb-1 leading-none" style={{ color:C.text }}>{v}</div>
                <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: C.muted }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div data-anim className="absolute bottom-6 right-6 sm:bottom-7 sm:right-10 xl:right-20 flex items-center gap-1.5"
        style={{ color:'rgba(242,240,252,.22)' }}>
        <motion.div animate={{ x:[0,10,0] }} transition={{ duration:1.6, repeat:Infinity }}>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase' }}>scroll</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </motion.div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 1 — Pillars ─────────────────────────────────────────────────────────
function S1({ r }: { r:(e:HTMLDivElement|null)=>void }) {
  return (
    <SlideWrap r={r}>
      <div className="h-full flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 sm:py-14 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-6 sm:mb-10">
          <Label t="SOLUÇÃO COMPLETA" />
          <h2 className="font-display font-bold mt-3 leading-[.93]"
            style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.text }}>
            Tecnologia, automação e{' '}
            <span className="text-gradient">inteligência estratégica.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {pillars.map((p) => (
            <div key={p.n} data-anim className="rounded-2xl p-4 sm:p-6"
              style={{ background: C.card, border:`1px solid ${C.cardBorder}`, backdropFilter:'blur(12px)' }}>
              <span className="font-display font-bold text-3xl sm:text-4xl block mb-3 leading-none" style={{ color:C.g(.25) }}>{p.n}</span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background:C.g(.14), border:`1px solid ${C.g(.28)}` }}>
                <p.Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color:C.brand }} />
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold mb-1.5 leading-tight" style={{ color:C.text }}>{p.t}</h3>
              <p className="text-xs leading-relaxed" style={{ color:C.muted }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 2 — Products ────────────────────────────────────────────────────────
function S2({ r }: { r:(e:HTMLDivElement|null)=>void }) {
  return (
    <SlideWrap r={r}>
      <div className="h-full flex items-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 w-full items-center">

          <div data-anim className="hidden sm:block rounded-2xl overflow-hidden flex-shrink-0"
            style={{ transform:'perspective(1200px) rotateY(-7deg) rotateX(2.5deg)', boxShadow:`0 30px 80px ${C.g(.25)}` }}>
            <Image src="/images/rulles-ia.png" alt="Rulles IA" width={800} height={500} className="w-full h-auto block" />
          </div>

          <div>
            <div data-anim className="mb-3"><Label t="NOSSOS PRODUTOS" /></div>
            <div data-anim className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3"
              style={{ background:C.g(.15), color:C.brandHi, border:`1px solid ${C.g(.32)}` }}>
              CRM — ADVOCACIA &amp; GESTÃO JURÍDICA
            </div>
            <h3 data-anim className="font-display font-normal mb-2 leading-[.93]"
              style={{ fontSize:'clamp(2rem,5vw,4.5rem)', color:C.text }}>Rulles IA</h3>
            <p data-anim className="text-sm sm:text-base font-medium mb-2" style={{ color:C.brandLt }}>
              O CRM com IA nichado para advogados.
            </p>
            <p data-anim className="text-sm leading-relaxed mb-4" style={{ color:C.muted }}>
              Plataforma de gestão jurídica potencializada por IA. Automatize atendimento, organize processos e converta leads com precisão.
            </p>
            <div data-anim className="space-y-2 mb-5 hidden sm:block">
              {[
                { I:Scale,    t:'Triagem automática via IA conversacional' },
                { I:FileText, t:'Geração assistida de documentos jurídicos' },
                { I:Bell,     t:'Alertas de prazos automatizados' },
                { I:BarChart2,t:'Dashboard de performance em tempo real' },
              ].map(({ I, t }) => (
                <div key={t} className="flex gap-3 items-start">
                  <I className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color:C.brandLt }} />
                  <span className="text-xs" style={{ color:C.muted }}>{t}</span>
                </div>
              ))}
            </div>
            <div data-anim>
              <Link href="https://rulles-ia-pn5f.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white text-sm"
                style={{ background:`linear-gradient(135deg,${C.brand},${C.brandLt})`, boxShadow:`0 8px 24px ${C.g(.35)}` }}>
                Acessar Rulles IA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 3 — Process ─────────────────────────────────────────────────────────
function S3({ r }: { r:(e:HTMLDivElement|null)=>void }) {
  return (
    <SlideWrap r={r} accent>
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-7 sm:mb-12">
          <Label t="NOSSO PROCESSO" />
          <h2 className="font-display font-bold mt-3 leading-[.93]"
            style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.text }}>
            Do problema ao resultado.{' '}
            <span className="text-gradient">Em etapas claras.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((s) => (
            <div key={s.n} data-anim className="pt-5 sm:pt-7 pr-4 sm:pr-8 pb-4"
              style={{ borderTop:`1px solid ${C.g(.25)}` }}>
              <span className="font-display font-bold block mb-3 leading-none"
                style={{ fontSize:'clamp(2.5rem,6vw,4.2rem)', color:C.g(.22) }}>{s.n}</span>
              <h3 className="font-display text-base sm:text-xl mb-2" style={{ color:C.text }}>{s.t}</h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color:C.muted }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 4 — Why Orvyn ───────────────────────────────────────────────────────
function S4({ r }: { r:(e:HTMLDivElement|null)=>void }) {
  return (
    <SlideWrap r={r}>
      <div className="h-full flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-6 sm:mb-10">
          <Label t="DIFERENCIAIS" />
          <h2 className="font-display font-bold mt-3 leading-[.93]"
            style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.text }}>Por que Orvyn</h2>
          <p className="text-sm sm:text-base mt-2" style={{ color:C.muted }}>Três razões técnicas que definem nossa abordagem.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {diffs.map((d, i) => (
            <div key={d.n} data-anim className="rounded-2xl p-5 sm:p-8"
              style={{
                background: C.card,
                border:`1px solid ${C.cardBorder}`,
                backdropFilter:'blur(12px)',
                transform:`perspective(900px) rotateY(${(i-1)*-4}deg) rotateX(2deg)`,
                transformOrigin:'center bottom',
              }}>
              <span className="font-display font-bold text-4xl sm:text-5xl block mb-3 leading-none" style={{ color:C.g(.22) }}>{d.n}</span>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-5"
                style={{ background:C.g(.14), border:`1px solid ${C.g(.28)}` }}>
                <d.Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color:C.brandLt }} />
              </div>
              <h3 className="font-display text-base sm:text-xl mb-2" style={{ color:C.text }}>{d.t}</h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color:C.muted }}>{d.d}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 5 — Testimonials ────────────────────────────────────────────────────
function S5({ r }: { r:(e:HTMLDivElement|null)=>void }) {
  return (
    <SlideWrap r={r}>
      <div className="h-full flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-6 sm:mb-10">
          <Label t="DEPOIMENTOS" />
          <h2 className="font-display font-bold mt-3 leading-[.93]"
            style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.text }}>O que nossos clientes dizem</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => {
            const ini = t.name.split(' ').map(n => n[0]).join('')
            return (
              <div key={t.name} data-anim className="rounded-2xl p-5 sm:p-7"
                style={{
                  background: C.card,
                  border:`1px solid ${C.cardBorder}`,
                  backdropFilter:'blur(12px)',
                  transform:`perspective(1000px) rotateY(${(i-1)*-4}deg) translateZ(${i===1?28:0}px)`,
                }}>
                <div className="flex gap-1 mb-3 sm:mb-5">
                  {[...Array(5)].map((_,s) => <Star key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color:C.muted }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                    style={{ background:`linear-gradient(135deg,${C.brand},${C.brandLt})` }}>{ini}</div>
                  <div>
                    <div className="font-semibold text-xs" style={{ color:C.text }}>{t.name}</div>
                    <div className="text-[10px]" style={{ color:C.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 6 — CTA ─────────────────────────────────────────────────────────────
function S6({ r }: { r:(e:HTMLDivElement|null)=>void }) {
  return (
    <SlideWrap r={r} accent>
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-5 sm:mb-7"><Label t="VAMOS COMEÇAR" /></div>

        <div style={{ height:'clamp(48px,8vh,80px)' }} />

        <div className="overflow-hidden mb-1">
          <h2 data-anim className="font-display font-bold leading-[.93]"
            style={{ fontSize:'clamp(2.2rem,7vw,7rem)', color:C.text }}>
            Pronto para automatizar
          </h2>
        </div>
        <div className="overflow-hidden mb-7 sm:mb-9">
          <h2 data-anim className="font-display font-bold leading-[.93] text-gradient"
            style={{ fontSize:'clamp(2.2rem,7vw,7rem)' }}>
            o que te trava?
          </h2>
        </div>

        <div data-anim className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <p className="text-sm max-w-xs leading-relaxed hidden sm:block" style={{ color:C.muted }}>
            Fale com a ORVYN. Diagnóstico gratuito para novos projetos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="mailto:orvynsistemas@outlook.com?subject=Quero%20falar%20com%20a%20ORVYN"
              className="btn-primary inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white">
              Falar com a Equipe <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link href="mailto:orvynsistemas@outlook.com"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base"
              style={{ border:`1px solid rgba(255,255,255,.12)`, color:C.text, background:'rgba(255,255,255,.05)' }}>
              Ver Produtos
            </Link>
          </div>
        </div>

        <div data-anim className="mt-8 sm:mt-12 pt-5 sm:pt-7 flex items-center justify-between"
          style={{ borderTop:`1px solid rgba(255,255,255,.07)` }}>
          <div className="flex items-center gap-2 sm:gap-3">
            <Image src="/images/orvyn-gem.png" alt="ORVYN" width={22} height={22} className="sm:w-[26px] sm:h-[26px]" />
            <span className="font-display font-semibold text-sm sm:text-base tracking-widest" style={{ color:C.text }}>ORVYN</span>
          </div>
          <p className="text-xs hidden md:block" style={{ color:C.muted }}>© 2026 ORVYN Sistemas.</p>
          <div className="flex gap-3 sm:gap-4">
            {['Privacidade','Termos'].map(l => (
              <Link key={l} href="#" className="text-xs hover:opacity-80 transition-opacity" style={{ color:C.muted }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  )
}

// ── Progress + Dot Nav ────────────────────────────────────────────────────────
function ProgressNav({ progress, current }: { progress: number; current: number }) {
  const pct = Math.round(progress * 100)
  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 pointer-events-none"
      style={{ zIndex: 200 }}>
      <div className="relative w-px rounded-full overflow-hidden"
        style={{ height: 72, background: 'rgba(255,255,255,.10)' }}>
        <div className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: `${pct}%`,
            background: `linear-gradient(to bottom, ${C.brand}, ${C.brandLt})`,
            transition: 'height 60ms linear',
          }} />
      </div>
      <span className="font-mono tabular-nums leading-none"
        style={{ fontSize: 8, color: 'rgba(255,255,255,.3)', letterSpacing: '.08em' }}>
        {pct.toString().padStart(2,'0')}
      </span>
      {Array.from({ length: N }, (_, i) => (
        <div key={i} className="rounded-full transition-all duration-300"
          style={{
            width:  i === current ? 6 : 3,
            height: i === current ? 6 : 3,
            background: i === current ? C.brand : 'rgba(255,255,255,.22)',
            boxShadow: i === current ? `0 0 7px rgba(168,34,221,.75)` : 'none',
          }} />
      ))}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function HorizontalExperience() {
  const outerRef     = useRef<HTMLDivElement>(null)
  const gemRef       = useRef<HTMLDivElement>(null)
  const magnetRef    = useRef<HTMLDivElement>(null)   // cursor magnetic layer
  const spotlightRef = useRef<HTMLDivElement>(null)
  const clickSfxRef  = useRef<HTMLAudioElement | null>(null)
  const cursorRef    = useRef({ x: 0, y: 0 })
  const sRefs        = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const [mounted,  setMounted]  = useState(false)
  const [current,  setCurrent]  = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  // ── Audio setup ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return

    const openSfx = new Audio('/abertura.mp3')
    openSfx.volume = 0.35

    const clickSfx = new Audio('/click.mp3')
    clickSfx.volume = 0.55
    clickSfxRef.current = clickSfx

    // Try autoplay; if blocked, play on first scroll/click
    const tryOpen = () => { openSfx.play().catch(() => {}) }

    const timer = setTimeout(() => {
      openSfx.play().catch(() => {
        window.addEventListener('scroll',     tryOpen, { once: true })
        window.addEventListener('click',      tryOpen, { once: true })
        window.addEventListener('touchstart', tryOpen, { once: true })
      })
    }, 900)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll',     tryOpen)
      window.removeEventListener('click',      tryOpen)
      window.removeEventListener('touchstart', tryOpen)
    }
  }, [])

  // ── Gem click: burst animation + sound ──────────────────────────────────────
  const handleGemClick = useCallback(async () => {
    if (clickSfxRef.current) {
      clickSfxRef.current.currentTime = 0
      clickSfxRef.current.play().catch(() => {})
    }

    const { default: gsap } = await import('gsap')
    const mag = magnetRef.current
    if (!mag) return

    const bob = mag.querySelector('.gem-anchor-bob')
    if (bob) {
      gsap.timeline()
        .to(bob, { scale: 1.4, duration: 0.12, ease: 'power3.out' })
        .to(bob, { scale: 1.0, duration: 0.55, ease: 'elastic.out(1.4, 0.35)' })
    }

    // Double ripple burst
    const imgSize = window.innerWidth < 640 ? GEM_SIZE.m : GEM_SIZE.d
    ;[0, 0.14].forEach((delay, idx) => {
      const ripple = document.createElement('div')
      const size = idx === 0 ? imgSize : imgSize * 0.8
      Object.assign(ripple.style, {
        position: 'absolute',
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
        top: '0px',
        left: '0px',
        scale: '0',
        opacity: '0.85',
        background: `radial-gradient(circle, rgba(200,80,255,0.9) 0%, rgba(168,34,221,0.6) 50%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: '20',
        transformOrigin: 'center center',
      })
      mag.appendChild(ripple)
      gsap.fromTo(ripple,
        { scale: 0, opacity: 0.85 },
        {
          scale: 3.5, opacity: 0,
          duration: 0.65,
          delay,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      )
    })
  }, [])

  // ── GSAP + scroll setup ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const slides = sRefs.current.filter(Boolean) as HTMLDivElement[]
      slides.forEach(s => { s.style.clipPath = 'none'; s.style.position = 'relative' })
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any
    let removeTicker: (() => void) | undefined
    let removeMouseMove: (() => void) | undefined

    const setup = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const outer  = outerRef.current
      const gem    = gemRef.current
      const magnet = magnetRef.current
      const slides = sRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!outer || slides.length < N) return

      const mobile  = window.innerWidth < 640
      const scrub   = mobile ? 1.2 : 1.8
      const imgSize = mobile ? GEM_SIZE.m : GEM_SIZE.d
      const half    = imgSize / 2

      // Track cursor globally
      const onMouseMove = (e: MouseEvent) => {
        cursorRef.current = { x: e.clientX, y: e.clientY }
      }
      window.addEventListener('mousemove', onMouseMove)
      removeMouseMove = () => window.removeEventListener('mousemove', onMouseMove)

      let tickerFn: ((time: number, delta: number) => void) | undefined

      ctx = gsap.context((): void => {

        // ── z-index stacking + clip-paths ────────────────────────────────────
        slides.forEach((s, i) => gsap.set(s, { zIndex: 10 + i }))
        slides.forEach((s, i) => {
          if (i === 0) return
          gsap.set(s, { clipPath: SLIDE_CLIP[i] })
        })

        // ── Hide content, set directional initial states ──────────────────────
        for (let i = 1; i < N; i++) {
          const entry = SLIDE_ENTRY[i]
          const els   = slides[i].querySelectorAll('[data-anim]')
          if (els.length && entry) {
            gsap.set(els, { autoAlpha: 0, x: entry.x, y: entry.y, scale: entry.s, rotation: entry.r })
          }
        }

        // ── Gem initial position ──────────────────────────────────────────────
        if (gem) {
          const data = mobile ? WAYPOINTS[0].m : WAYPOINTS[0].d
          const init = toXY(data[0], data[1], half)
          gsap.set(gem, { position:'absolute', top:0, left:0, x:init.x, y:init.y, scale:data[2], rotate:data[3] })

          if (spotlightRef.current) {
            spotlightRef.current.style.background =
              `radial-gradient(circle 320px at ${init.x+half}px ${init.y+half}px, rgba(168,34,221,0.10) 0%, rgba(168,34,221,0.03) 45%, transparent 70%)`
          }
        }

        // ── Cursor magnetic: quickTo setters on the inner magnetic layer ──────
        const qx = magnet ? gsap.quickTo(magnet, 'x', { duration: 0.55, ease: 'power2.out' }) : null
        const qy = magnet ? gsap.quickTo(magnet, 'y', { duration: 0.55, ease: 'power2.out' }) : null
        const qr = magnet ? gsap.quickTo(magnet, 'rotation', { duration: 0.65, ease: 'power2.out' }) : null

        // Magnetic ticker: gem leans toward cursor when cursor is near
        const onTick = () => {
          if (!gem || !qx || !qy) return
          const gx = (gsap.getProperty(gem, 'x') as number) + half
          const gy = (gsap.getProperty(gem, 'y') as number) + half
          const cx = cursorRef.current.x
          const cy = cursorRef.current.y
          if (!cx && !cy) return
          const dx = cx - gx
          const dy = cy - gy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const R = 240
          if (dist < R && dist > 1) {
            const factor = (1 - dist / R)
            const force  = factor * 18
            qx(dx / dist * force)
            qy(dy / dist * force)
            qr?.(dx / dist * factor * 14)
          } else {
            qx(0); qy(0); qr?.(0)
          }
        }
        gsap.ticker.add(onTick)
        tickerFn = onTick
        removeTicker = () => gsap.ticker.remove(onTick)

        // ── Master timeline (drives EVERYTHING) ───────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            pin: true,
            scrub,
            start: 'top top',
            end: () => `+=${(N - 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const idx = Math.min(N - 1, Math.round(self.progress * (N - 1)))
              setCurrent(idx)
              setProgress(self.progress)

              // Spotlight follows gem — direct DOM, zero React re-render
              if (spotlightRef.current && gem) {
                const gx = (gsap.getProperty(gem, 'x') as number) + half
                const gy = (gsap.getProperty(gem, 'y') as number) + half
                spotlightRef.current.style.background =
                  `radial-gradient(circle 320px at ${gx}px ${gy}px, rgba(168,34,221,0.10) 0%, rgba(168,34,221,0.03) 45%, transparent 70%)`
              }
            },
          },
        })

        // ── Slide reveals + Noomo-style burst content entry ───────────────────
        for (let i = 1; i < N; i++) {
          const pos   = i - 1
          const entry = SLIDE_ENTRY[i]!

          // Clip-path wipe tied to scroll
          tl.to(slides[i], {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power1.inOut',
          }, pos)

          // Content bursts in with rotation (elements appear in sequence like Noomo)
          const contentEls = Array.from(slides[i].querySelectorAll('[data-anim]'))
          if (contentEls.length) {
            tl.fromTo(contentEls,
              { autoAlpha: 0, x: entry.x, y: entry.y, scale: 0.82, rotation: entry.r },
              {
                autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0,
                stagger: 0.10,
                duration: 0.40,
                ease: 'back.out(1.8)',
              },
              pos + 0.32
            )
          }
        }

        // ── Gem travels its continuous path segment by segment ────────────────
        if (gem) {
          for (let i = 1; i < WAYPOINTS.length; i++) {
            const prev = WAYPOINTS[i - 1]
            const curr = WAYPOINTS[i]
            const data = mobile ? curr.m : curr.d
            const { x, y } = toXY(data[0], data[1], half)
            tl.to(gem, { x, y, scale:data[2], rotate:data[3], ease:'power1.inOut', duration: curr.t - prev.t }, prev.t)
          }
        }

        // ── S0 hero one-shot entry (not scrubbed) ─────────────────────────────
        const s0Els = Array.from(slides[0].querySelectorAll('[data-anim]'))
        if (s0Els.length) {
          gsap.set(s0Els, { autoAlpha: 0, y: 24, rotation: -4 })
          gsap.to(s0Els, {
            autoAlpha: 1, y: 0, rotation: 0,
            stagger: 0.09, duration: 0.7,
            ease: 'back.out(1.5)',
            delay: 0.35,
          })
        }

        ScrollTrigger.refresh()
      }, outer)

      void tickerFn // used via removeTicker closure
    }

    const t = setTimeout(setup, 200)
    return () => {
      clearTimeout(t)
      removeTicker?.()
      removeMouseMove?.()
      ctx?.revert()
    }
  }, [mounted])

  if (!mounted) return null

  const r = (i: number) => (el: HTMLDivElement | null) => { sRefs.current[i] = el }

  return (
    <>
      <ProgressNav progress={progress} current={current} />

      <div ref={outerRef} className="relative w-screen overflow-hidden" style={{ height:'100dvh', minHeight:'100svh' }}>

        {/* Spotlight layer — follows gem, illuminates nearby content */}
        <div ref={spotlightRef} className="absolute inset-0 pointer-events-none" style={{ zIndex:140, mixBlendMode:'screen' }} />

        {/* Gem anchor — GSAP controls outer position; magnetRef responds to cursor */}
        <div ref={gemRef} aria-hidden style={{ position:'absolute', top:0, left:0, zIndex:150, pointerEvents:'none' }}>
          {/* Halo rings (CSS animated, don't block clicks) */}
          <div className="gem-halo" style={{ width:160, height:160, top:-48, left:-48 }} />
          <div className="gem-halo-inner" style={{ width:100, height:100, top:-18, left:-18 }} />

          {/* Magnetic layer: GSAP quickTo moves this toward cursor */}
          <div ref={magnetRef} style={{ position:'relative' }}>
            <div className="gem-anchor-bob">
              {/* Clickable hitbox — small circle on top of gem image */}
              <div
                onClick={handleGemClick}
                role="button"
                aria-label="Interagir com gem"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 2,
                }}
              />
              <Image
                src="/images/orvyn-gem.png"
                alt=""
                width={64}
                height={64}
                className="gem-anchor-glow w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] block"
                style={{ mixBlendMode: 'screen', position: 'relative', zIndex: 1 }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Slides */}
        <S0 r={r(0)} />
        <S1 r={r(1)} />
        <S2 r={r(2)} />
        <S3 r={r(3)} />
        <S4 r={r(4)} />
        <S5 r={r(5)} />
        <S6 r={r(6)} />
      </div>
    </>
  )
}
