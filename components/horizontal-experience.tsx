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

// ── palette ────────────────────────────────────────────────────────────────────
const C = {
  brand:   '#A822DD',
  brandLt: '#CC55EC',
  brandHi: '#E088F8',
  dark:    'rgba(7,6,15,0.97)',
  light:   'rgba(245,243,238,0.96)',
  text:    '#1a1a2e',
  muted:   'rgba(26,26,46,0.5)',
  white:   '#f2f0fc',
  g: (a: number) => `rgba(168,34,221,${a})`,
}

// ── data ───────────────────────────────────────────────────────────────────────
const pillars = [
  { n:'01', Icon:TrendingUp,      t:'Gestão de Tráfego',   d:'Atraia clientes qualificados todos os dias através de campanhas estratégicas otimizadas.' },
  { n:'02', Icon:Bot,             t:'IA para Atendimento',  d:'Automatize atendimentos 24h. Nossa IA qualifica leads e conduz clientes pelo funil.' },
  { n:'03', Icon:LayoutDashboard, t:'Sistema de Gestão',    d:'Centralize toda a operação da empresa em uma plataforma feita para sua realidade.' },
  { n:'04', Icon:Globe,           t:'Landing Page & Dev',   d:'Páginas de alta conversão e sistemas sob medida. Do design ao código, premium.' },
]
const steps = [
  { n:'01', t:'Diagnóstico',   d:'Mapeamos processos, identificamos gargalos e definimos onde a IA gera mais impacto.' },
  { n:'02', t:'Arquitetura',   d:'Desenhamos o fluxo técnico: integrações, triggers, modelos e estrutura de dados.' },
  { n:'03', t:'Implementação', d:'Construímos e testamos automações, bots, CRM e criativos em cada componente.' },
  { n:'04', t:'Escala',        d:'Monitoramos, otimizamos e expandimos. O sistema evolui com o seu negócio.' },
]
const diffs = [
  { n:'01', Icon:Crosshair,   t:'Nichado, não genérico',          d:'Cada solução é construída para o problema específico do seu negócio.' },
  { n:'02', Icon:Code2,       t:'Prompt Engineering real',         d:'Nossa base é engenharia de prompt estruturada. Resultado técnico, performance mensurável.' },
  { n:'03', Icon:CheckCircle, t:'Automação sem código fantasma',   d:'Fluxos que funcionam meses depois, documentados e com suporte de evolução.' },
]
const testimonials = [
  { name:'Rafael Santos',   role:'Sócio-fundador, Santos & Associados',      text:'Rulles IA transformou nosso workflow. O que levava 3h agora leva 30min. Impecável.' },
  { name:'Mariana Costa',   role:'Diretora de Marketing, E-commerce Growth', text:'A automação de tráfego da Orvyn transformou nossa captação. 45% mais conversão.' },
  { name:'Felipe Oliveira', role:'CTO, Tech Startup',                        text:'A Orvyn não vende software, vende entendimento. Entendem o problema antes do código.' },
]

// ── gem positions: [desktop, mobile] ──────────────────────────────────────────
const GEM = {
  desktop: [
    { l:'7vw',  t:'78vh', s:0.75 },
    { l:'88vw', t:'11vh', s:0.50 },
    { l:'39vw', t:'50vh', s:0.90 },
    { l:'7vw',  t:'11vh', s:0.50 },
    { l:'88vw', t:'78vh', s:0.65 },
    { l:'50vw', t:'7vh',  s:0.50 },
    { l:'50vw', t:'28vh', s:1.10 },
  ],
  mobile: [
    { l:'7vw',  t:'80vh', s:0.55 },
    { l:'85vw', t:'9vh',  s:0.40 },
    { l:'85vw', t:'48vh', s:0.60 },
    { l:'7vw',  t:'9vh',  s:0.38 },
    { l:'85vw', t:'80vh', s:0.48 },
    { l:'50vw', t:'6vh',  s:0.38 },
    { l:'50vw', t:'25vh', s:0.85 },
  ],
}

// ── clip-path direction: odd = from right, even = from below ──────────────────
const clipFrom = (i: number) => i % 2 !== 0 ? 'inset(0 0 0 100%)' : 'inset(100% 0 0 0)'

// ── Framer Motion stagger variants ────────────────────────────────────────────
function useV(active: boolean) {
  return {
    wrap: {
      animate: active ? 'show' : 'hide',
      variants: {
        hide: { transition: { staggerChildren: 0.03, staggerDirection: -1 as never } },
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      } as never,
    },
    el: {
      variants: {
        hide: { opacity: 0, y: 12, transition: { duration: 0.25 } },
        show: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      } as never,
    },
  }
}

// ── label ──────────────────────────────────────────────────────────────────────
function Label({ t, light }: { t: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-px" style={{ background: light ? C.brandHi : C.brand }} />
      <span className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: light ? C.brandHi : C.brand }}>{t}</span>
    </div>
  )
}

// ── SLIDE 0 — Intro ────────────────────────────────────────────────────────────
function S0({ r, active }: { r:(e:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useV(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.dark }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse 70% 55% at 50% 50%, ${C.g(.07)} 0%, transparent 72%)` }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* heading + CTAs */}
          <motion.div {...v.wrap}>
            <motion.div {...v.el} className="flex items-center gap-3 mb-5 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ border:`1px solid ${C.g(.3)}`, fontSize:10, fontWeight:600, letterSpacing:'.14em', textTransform:'uppercase', color:C.brandHi }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:C.brand }} />
                ORVYN SISTEMAS — 2026
              </div>
            </motion.div>
            {[
              { t:'Inteligência que', accent:false },
              { t:'automatiza.',      accent:true  },
              { t:'Estratégia que',   accent:false },
              { t:'converte.',        accent:true  },
            ].map(({ t, accent }) => (
              <motion.div key={t} {...v.el} className="overflow-hidden">
                <span className={`font-display font-bold block leading-[.93]${accent?' text-gradient':''}`}
                  style={{ fontSize:'clamp(2rem,7vw,5.2rem)', color:accent?undefined:C.white }}>{t}</span>
              </motion.div>
            ))}
            <motion.div {...v.el} className="flex flex-col sm:flex-row gap-3 mt-7 sm:mt-10">
              <Link href="#" className="btn-primary inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white">
                Ver Produtos <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link href="mailto:orvynsistemas@outlook.com"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base"
                style={{ border:`1px solid rgba(255,255,255,.1)`, color:C.white, background:'rgba(255,255,255,.04)' }}>
                Falar com Especialista
              </Link>
            </motion.div>
          </motion.div>

          {/* metrics */}
          <motion.div {...v.wrap} className="grid grid-cols-2 gap-3 sm:gap-5">
            {[{ v:'+40',label:'Clientes Ativos' },{ v:'98%',label:'Retenção' },{ v:'3',label:'Produtos SaaS' },{ v:'5+',label:'Anos de Mercado' }].map(({ v:val, label }) => (
              <motion.div key={label} {...v.el} className="rounded-2xl p-4 sm:p-6"
                style={{ background:'rgba(255,255,255,.04)', border:`1px solid ${C.g(.11)}` }}>
                <div className="font-display font-bold text-3xl sm:text-4xl mb-1 leading-none" style={{ color:C.white }}>{val}</div>
                <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color:'rgba(255,255,255,.35)' }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-6 right-6 sm:bottom-7 sm:right-10 xl:right-20 flex items-center gap-1.5"
        animate={{ opacity: active ? 1 : 0 }} transition={{ duration:.4, delay:.6 }}
        style={{ color:'rgba(255,255,255,.22)' }}>
        <motion.div animate={{ x:[0,10,0] }} transition={{ duration:1.6, repeat:Infinity }}>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize:9, letterSpacing:'.14em', textTransform:'uppercase' }}>scroll</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── SLIDE 1 — Pillars ──────────────────────────────────────────────────────────
function S1({ r, active }: { r:(e:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useV(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full overflow-y-auto flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 sm:py-14 max-w-7xl mx-auto w-full">
        <motion.div {...v.wrap}>
          <motion.div {...v.el} className="mb-6 sm:mb-10">
            <Label t="SOLUÇÃO COMPLETA" />
            <h2 className="font-display font-bold mt-3 leading-[.93]"
              style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.text }}>
              Tecnologia, automação e{' '}
              <span className="text-gradient">inteligência estratégica.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" style={{ perspective:'1400px' }}>
            {pillars.map((p) => (
              <motion.div key={p.n} {...v.el} className="rounded-2xl p-4 sm:p-6 cursor-default"
                style={{ background:'rgba(255,255,255,.74)', border:'1px solid rgba(26,26,46,.09)' }}>
                <span className="font-display font-bold text-3xl sm:text-4xl block mb-3 leading-none" style={{ color:C.g(.1) }}>{p.n}</span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background:C.g(.09), border:`1px solid ${C.g(.22)}` }}>
                  <p.Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color:C.brand }} />
                </div>
                <h3 className="font-display text-sm sm:text-base font-bold mb-1.5 leading-tight" style={{ color:C.text }}>{p.t}</h3>
                <p className="text-xs leading-relaxed" style={{ color:C.muted }}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── SLIDE 2 — Products ─────────────────────────────────────────────────────────
function S2({ r, active }: { r:(e:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useV(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full overflow-y-auto flex items-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 w-full items-center">

          {/* screenshot — hidden on smallest mobile to avoid overflow */}
          <motion.div {...v.el} className="hidden sm:block rounded-2xl overflow-hidden flex-shrink-0"
            style={{ transform:'perspective(1200px) rotateY(-7deg) rotateX(2.5deg)', boxShadow:`0 30px 80px ${C.g(.2)}` }}>
            <Image src="/images/rulles-ia.png" alt="Rulles IA" width={800} height={500} className="w-full h-auto block" />
          </motion.div>

          {/* text */}
          <motion.div {...v.wrap}>
            <motion.div {...v.el} className="mb-3"><Label t="NOSSOS PRODUTOS" /></motion.div>
            <motion.div {...v.el} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3"
              style={{ background:C.g(.13), color:C.brandHi, border:`1px solid ${C.g(.28)}` }}>
              CRM — ADVOCACIA &amp; GESTÃO JURÍDICA
            </motion.div>
            <motion.h3 {...v.el} className="font-display font-normal mb-2 leading-[.93]"
              style={{ fontSize:'clamp(2rem,5vw,4.5rem)', color:C.text }}>Rulles IA</motion.h3>
            <motion.p {...v.el} className="text-sm sm:text-base font-medium mb-2" style={{ color:C.brandLt }}>
              O CRM com IA nichado para advogados.
            </motion.p>
            <motion.p {...v.el} className="text-sm leading-relaxed mb-4" style={{ color:C.muted }}>
              Plataforma de gestão jurídica potencializada por IA. Automatize atendimento, organize processos e converta leads com precisão.
            </motion.p>
            <motion.div {...v.el} className="space-y-2 mb-5 hidden sm:block">
              {[
                { I:Scale,    t:'Triagem automática via IA conversacional' },
                { I:FileText, t:'Geração assistida de documentos jurídicos' },
                { I:Bell,     t:'Alertas de prazos automatizados' },
                { I:BarChart2,t:'Dashboard de performance em tempo real' },
              ].map(({ I, t }) => (
                <div key={t} className="flex gap-3 items-start">
                  <I className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color:C.brandLt }} />
                  <span className="text-xs" style={{ color:'rgba(26,26,46,.7)' }}>{t}</span>
                </div>
              ))}
            </motion.div>
            <motion.div {...v.el}>
              <Link href="https://rulles-ia-pn5f.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white text-sm"
                style={{ background:`linear-gradient(135deg,${C.brand},${C.brandLt})`, boxShadow:`0 8px 24px ${C.g(.3)}` }}>
                Acessar Rulles IA <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ── SLIDE 3 — Process ──────────────────────────────────────────────────────────
function S3({ r, active }: { r:(e:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useV(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.dark }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse 65% 45% at 50% 65%, ${C.g(.06)} 0%, transparent 72%)` }} />
      <div className="relative z-10 h-full overflow-y-auto flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <motion.div {...v.wrap}>
          <motion.div {...v.el} className="mb-7 sm:mb-12">
            <Label t="NOSSO PROCESSO" light />
            <h2 className="font-display font-bold mt-3 leading-[.93]"
              style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.white }}>
              Do problema ao resultado.{' '}
              <span className="text-gradient">Em etapas claras.</span>
            </h2>
          </motion.div>
          {/* 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((s) => (
              <motion.div key={s.n} {...v.el} className="pt-5 sm:pt-7 pr-4 sm:pr-8 pb-4"
                style={{ borderTop:`1px solid ${C.g(.2)}` }}>
                <span className="font-display font-bold block mb-3 leading-none"
                  style={{ fontSize:'clamp(2.5rem,6vw,4.2rem)', color:C.g(.16) }}>{s.n}</span>
                <h3 className="font-display text-base sm:text-xl mb-2" style={{ color:C.white }}>{s.t}</h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color:'rgba(255,255,255,.38)' }}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── SLIDE 4 — Why ──────────────────────────────────────────────────────────────
function S4({ r, active }: { r:(e:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useV(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full overflow-y-auto flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 sm:py-0 max-w-7xl mx-auto w-full">
        <motion.div {...v.wrap}>
          <motion.div {...v.el} className="mb-6 sm:mb-10">
            <Label t="DIFERENCIAIS" />
            <h2 className="font-display font-bold mt-3 leading-[.93]"
              style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.text }}>Por que Orvyn</h2>
            <p className="text-sm sm:text-base mt-2" style={{ color:C.muted }}>Três razões técnicas que definem nossa abordagem.</p>
          </motion.div>
          {/* stacked on mobile, 3 cols on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {diffs.map((d, i) => (
              <motion.div key={d.n} {...v.el} className="rounded-2xl p-5 sm:p-8 cursor-default"
                style={{
                  background:'rgba(255,255,255,.72)', border:'1px solid rgba(26,26,46,.08)',
                  transform:`perspective(900px) rotateY(${(i-1)*-4}deg) rotateX(2deg)`,
                  transformOrigin:'center bottom',
                }}>
                <span className="font-display font-bold text-4xl sm:text-5xl block mb-3 leading-none" style={{ color:C.g(.12) }}>{d.n}</span>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-5"
                  style={{ background:C.g(.1), border:`1px solid ${C.g(.22)}` }}>
                  <d.Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color:C.brandLt }} />
                </div>
                <h3 className="font-display text-base sm:text-xl mb-2" style={{ color:C.text }}>{d.t}</h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color:C.muted }}>{d.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── SLIDE 5 — Testimonials ─────────────────────────────────────────────────────
function S5({ r, active }: { r:(e:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useV(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full overflow-y-auto flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 sm:py-0 max-w-7xl mx-auto w-full">
        <motion.div {...v.wrap}>
          <motion.div {...v.el} className="mb-6 sm:mb-10">
            <Label t="DEPOIMENTOS" />
            <h2 className="font-display font-bold mt-3 leading-[.93]"
              style={{ fontSize:'clamp(1.75rem,5vw,4.2rem)', color:C.text }}>O que nossos clientes dizem</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {testimonials.map((t, i) => {
              const ini = t.name.split(' ').map(n => n[0]).join('')
              return (
                <motion.div key={t.name} {...v.el} className="rounded-2xl p-5 sm:p-7"
                  style={{
                    background:'rgba(255,255,255,.72)', border:'1px solid rgba(26,26,46,.08)',
                    transform:`perspective(1000px) rotateY(${(i-1)*-4}deg) translateZ(${i===1?28:0}px)`,
                  }}>
                  <div className="flex gap-1 mb-3 sm:mb-5">
                    {[...Array(5)].map((_,s) => <Star key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color:'rgba(26,26,46,.72)' }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                      style={{ background:`linear-gradient(135deg,${C.brand},${C.brandLt})` }}>{ini}</div>
                    <div>
                      <div className="font-semibold text-xs" style={{ color:C.text }}>{t.name}</div>
                      <div className="text-[10px]" style={{ color:'rgba(26,26,46,.4)' }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── SLIDE 6 — CTA ──────────────────────────────────────────────────────────────
function S6({ r, active }: { r:(e:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useV(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.dark }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse 80% 55% at 50% 50%, ${C.g(.09)} 0%, transparent 70%)` }} />
      <div className="relative z-10 h-full overflow-y-auto flex flex-col justify-center px-6 sm:px-10 xl:px-20 py-8 max-w-7xl mx-auto w-full">
        <motion.div {...v.wrap}>
          <motion.div {...v.el} className="mb-5 sm:mb-7"><Label t="VAMOS COMEÇAR" light /></motion.div>
          {/* spacer for gem */}
          <div style={{ height:'clamp(48px,8vh,80px)' }} />
          <div className="overflow-hidden mb-1">
            <motion.h2 {...v.el} className="font-display font-bold leading-[.93]"
              style={{ fontSize:'clamp(2.2rem,7vw,7rem)', color:C.white }}>
              Pronto para automatizar
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-7 sm:mb-9">
            <motion.h2 {...v.el} className="font-display font-bold leading-[.93] text-gradient"
              style={{ fontSize:'clamp(2.2rem,7vw,7rem)' }}>
              o que te trava?
            </motion.h2>
          </div>
          <motion.div {...v.el} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <p className="text-sm max-w-xs leading-relaxed hidden sm:block" style={{ color:'rgba(242,240,252,.4)' }}>
              Fale com a ORVYN. Diagnóstico gratuito para novos projetos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="mailto:orvynsistemas@outlook.com?subject=Quero%20falar%20com%20a%20ORVYN"
                className="btn-primary inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white">
                Falar com a Equipe <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link href="mailto:orvynsistemas@outlook.com"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base"
                style={{ border:'1px solid rgba(255,255,255,.1)', color:C.white, background:'rgba(255,255,255,.04)' }}>
                Ver Produtos
              </Link>
            </div>
          </motion.div>
          <motion.div {...v.el} className="mt-8 sm:mt-12 pt-5 sm:pt-7 flex items-center justify-between"
            style={{ borderTop:'1px solid rgba(255,255,255,.06)' }}>
            <div className="flex items-center gap-2 sm:gap-3">
              <Image src="/images/orvyn-gem.png" alt="ORVYN" width={22} height={22} className="sm:w-[26px] sm:h-[26px]" />
              <span className="font-display font-semibold text-sm sm:text-base tracking-widest" style={{ color:C.white }}>ORVYN</span>
            </div>
            <p className="text-xs hidden md:block" style={{ color:'rgba(255,255,255,.28)' }}>© 2026 ORVYN Sistemas.</p>
            <div className="flex gap-3 sm:gap-4">
              {['Privacidade','Termos'].map(l => (
                <Link key={l} href="#" className="text-xs hover:opacity-80 transition-opacity"
                  style={{ color:'rgba(255,255,255,.3)' }}>{l}</Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// ── Dot nav ────────────────────────────────────────────────────────────────────
function DotNav({ current }: { current: number }) {
  const dark = new Set([0,3,6]).has(current)
  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none"
      style={{ zIndex: 200 }}>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="rounded-full transition-all duration-300"
          style={{
            width:  i === current ? 7 : 4,
            height: i === current ? 7 : 4,
            background: i === current ? C.brand : dark ? 'rgba(255,255,255,.25)' : 'rgba(168,34,221,.3)',
            boxShadow: i === current ? `0 0 8px rgba(168,34,221,.7)` : 'none',
          }} />
      ))}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
const N = 7

export function HorizontalExperience() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const gemRef    = useRef<HTMLDivElement>(null)
  const sRefs     = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const [mounted, setMounted]   = useState(false)
  const [current, setCurrent]   = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any

    const setup = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const outer  = outerRef.current
      const gem    = gemRef.current
      const slides = sRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!outer || slides.length < N) return

      const mobile = window.innerWidth < 640
      const gemPos = mobile ? GEM.mobile : GEM.desktop
      const scrub  = mobile ? 1.2 : 2

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ctx = gsap.context((): void => {

        // z-index stacking
        slides.forEach((s, i) => gsap.set(s, { zIndex: 10 + i }))

        // initial clip-path: slides 1-6 fully hidden
        slides.forEach((s, i) => {
          if (i === 0) return
          gsap.set(s, { clipPath: clipFrom(i) })
        })

        // gem initial position
        if (gem) {
          gsap.set(gem, {
            position: 'absolute',
            xPercent: -50, yPercent: -50,
            left: gemPos[0].l, top: gemPos[0].t, scale: gemPos[0].s,
          })
        }

        // master timeline: scroll → clip-path reveal + gem movement
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            pin: true,
            scrub,
            start: 'top top',
            end: () => `+=${(N - 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
            onUpdate(self) {
              setCurrent(Math.min(N - 1, Math.round(self.progress * (N - 1))))
            },
          },
        })

        for (let i = 1; i < N; i++) {
          const pos = i - 1

          // reveal slide i over slide i-1 (background stays still)
          tl.to(slides[i], {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power1.inOut',
          }, pos)

          // gem transitions to new position
          if (gem && gemPos[i]) {
            tl.to(gem, {
              left: gemPos[i].l, top: gemPos[i].t, scale: gemPos[i].s,
              duration: 0.55, ease: 'power2.inOut',
            }, pos + 0.18)
          }
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
      <DotNav current={current} />

      <div ref={outerRef} className="relative w-screen h-screen overflow-hidden">

        {/* Floating gem — GSAP controls position */}
        <div ref={gemRef} className="absolute pointer-events-none" style={{ zIndex: 150 }}>
          <motion.div
            animate={{
              filter: [
                `drop-shadow(0 0 ${isMobile ? 8 : 10}px rgba(168,34,221,.45))`,
                `drop-shadow(0 0 ${isMobile ? 22 : 32}px rgba(168,34,221,.95))`,
                `drop-shadow(0 0 ${isMobile ? 8 : 10}px rgba(168,34,221,.45))`,
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/orvyn-gem.png" alt=""
              width={isMobile ? 36 : 52}
              height={isMobile ? 36 : 52}
              aria-hidden
            />
          </motion.div>
        </div>

        {/* Slides */}
        <S0 r={r(0)} active={current === 0} />
        <S1 r={r(1)} active={current === 1} />
        <S2 r={r(2)} active={current === 2} />
        <S3 r={r(3)} active={current === 3} />
        <S4 r={r(4)} active={current === 4} />
        <S5 r={r(5)} active={current === 5} />
        <S6 r={r(6)} active={current === 6} />
      </div>
    </>
  )
}
