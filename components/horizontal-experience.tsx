'use client'

import { useEffect, useRef, useState } from 'react'
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
  // S0 semi-transparent (particles show through); S1-S6 fully opaque
  slideHero:  'rgba(7,6,15,0.84)',
  slideOpq:   '#07060f',
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

// ── Per-slide choreography ─────────────────────────────────────────────────────
const SLIDE_CLIP = [
  '',
  'inset(0 0 0 100%)',   // S1 → wipe left→right
  'inset(0 100% 0 0)',   // S2 → wipe right→left
  'inset(0 0 100% 0)',   // S3 → wipe bottom→top
  'inset(0 0 0 100%)',   // S4 → wipe left→right
  'inset(100% 0 0 0)',   // S5 → wipe top→bottom
  'inset(0 0 100% 0)',   // S6 → wipe bottom→top
]
// Content bursts in FROM the direction opposite to wipe (rotation = Noomo spin effect)
const SLIDE_ENTRY = [
  null,
  { x: -28, y: -18, r: -10 },
  { x:  32, y:   0, r:  10 },
  { x:   0, y:  28, r:  -7 },
  { x: -30, y:   0, r:   7 },
  { x:   0, y: -28, r:  -9 },
  { x:   0, y:  10, r:   5 },
]

const N = 7

// ── Slide wrappers ─────────────────────────────────────────────────────────────
// hero: semi-transparent so BackgroundAnimation particles bleed through
// opaque slides (S1-S6): fully opaque to prevent content bleed-through between slides
function SlideWrap({ r, children, hero, accent }: {
  r: (e: HTMLDivElement | null) => void
  children: React.ReactNode
  hero?: boolean
  accent?: boolean
}) {
  return (
    <div
      ref={r}
      className="absolute inset-0 overflow-hidden"
      style={{
        backgroundColor: hero ? C.slideHero : C.slideOpq,
        backgroundImage: accent
          ? `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,34,221,0.08) 0%, transparent 70%)`
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
    <SlideWrap r={r} hero accent>
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
  const spotlightRef = useRef<HTMLDivElement>(null)
  const sRefs        = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const [mounted,  setMounted]  = useState(false)
  const [current,  setCurrent]  = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  // ── Opening sound ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const sfx = new Audio('/abertura.mp3')
    sfx.volume = 0.35
    const tryPlay = () => { sfx.play().catch(() => {}) }
    const t = setTimeout(() => {
      sfx.play().catch(() => {
        window.addEventListener('scroll',     tryPlay, { once: true })
        window.addEventListener('click',      tryPlay, { once: true })
        window.addEventListener('touchstart', tryPlay, { once: true })
      })
    }, 900)
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll',     tryPlay)
      window.removeEventListener('click',      tryPlay)
      window.removeEventListener('touchstart', tryPlay)
    }
  }, [])

  // ── Cursor-driven spotlight ────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return
    const onMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return
      spotlightRef.current.style.background =
        `radial-gradient(circle 380px at ${e.clientX}px ${e.clientY}px, rgba(168,34,221,0.09) 0%, rgba(168,34,221,0.03) 50%, transparent 70%)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mounted])

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

    const setup = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const outer  = outerRef.current
      const slides = sRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!outer || slides.length < N) return

      const scrub = window.innerWidth < 640 ? 1.0 : 1.5

      ctx = gsap.context((): void => {

        // ── z-index stacking ──────────────────────────────────────────────────
        slides.forEach((s, i) => gsap.set(s, { zIndex: 10 + i }))

        // ── S1-S6 start hidden behind clip-paths ──────────────────────────────
        slides.forEach((s, i) => {
          if (i === 0) return
          gsap.set(s, { clipPath: SLIDE_CLIP[i] })
        })

        // ── S1-S6 content: hidden + directional offset ────────────────────────
        for (let i = 1; i < N; i++) {
          const entry = SLIDE_ENTRY[i]!
          const els   = slides[i].querySelectorAll('[data-anim]')
          if (els.length) {
            gsap.set(els, { autoAlpha: 0, x: entry.x, y: entry.y, scale: 0.88, rotation: entry.r })
          }
        }

        // ── Master scroll timeline ─────────────────────────────────────────────
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
            },
          },
        })

        // ── S0 hero content exits BEFORE next slide's content enters ──────────
        // Fades out quickly as soon as scrolling starts → no content stacking
        const s0Els = Array.from(slides[0].querySelectorAll('[data-anim]'))
        if (s0Els.length) {
          tl.to(s0Els, {
            autoAlpha: 0, y: -28, rotation: -4,
            stagger: 0.03, duration: 0.28, ease: 'power2.in',
          }, 0.05)
        }

        // ── Slides 1-6: clip-path reveal + content burst ──────────────────────
        for (let i = 1; i < N; i++) {
          const pos   = i - 1      // timeline position where this slide starts
          const entry = SLIDE_ENTRY[i]!

          // 1. Clip wipes open over 1 time unit
          tl.to(slides[i], {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power1.inOut',
          }, pos)

          // 2. Content bursts in AFTER clip is 70%+ open (pos + 0.70)
          //    so content is never visible before its slide is mostly revealed
          const contentEls = Array.from(slides[i].querySelectorAll('[data-anim]'))
          if (contentEls.length) {
            tl.fromTo(contentEls,
              { autoAlpha: 0, x: entry.x, y: entry.y, scale: 0.82, rotation: entry.r },
              {
                autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0,
                stagger: 0.10, duration: 0.38, ease: 'back.out(1.9)',
              },
              pos + 0.70   // ← only appears once slide is 70% open
            )
          }

          // 3. Content exits before next slide comes in (clean handoff)
          if (i < N - 1) {
            tl.to(contentEls, {
              autoAlpha: 0, y: -22, rotation: -3,
              stagger: 0.02, duration: 0.22, ease: 'power2.in',
            }, pos + 0.92)
          }
        }

        // ── S0 hero one-shot entry (not scrubbed, fires on load) ──────────────
        const s0Entry = Array.from(slides[0].querySelectorAll('[data-anim]'))
        if (s0Entry.length) {
          gsap.set(s0Entry, { autoAlpha: 0, y: 24, rotation: -3 })
          gsap.to(s0Entry, {
            autoAlpha: 1, y: 0, rotation: 0,
            stagger: 0.09, duration: 0.7, ease: 'back.out(1.5)', delay: 0.35,
          })
        }

        ScrollTrigger.refresh()
      }, outer)
    }

    const t = setTimeout(setup, 200)
    return () => { clearTimeout(t); ctx?.revert() }
  }, [mounted])

  if (!mounted) return null

  const r = (i: number) => (el: HTMLDivElement | null) => { sRefs.current[i] = el }

  return (
    <>
      <ProgressNav progress={progress} current={current} />

      <div ref={outerRef} className="relative w-screen overflow-hidden" style={{ height:'100dvh', minHeight:'100svh' }}>

        {/* Spotlight follows cursor */}
        <div ref={spotlightRef} className="absolute inset-0 pointer-events-none" style={{ zIndex:140, mixBlendMode:'screen' }} />

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
