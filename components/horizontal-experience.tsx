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
  { n:'01', Icon:TrendingUp,      t:'Gestão de Tráfego',       d:'Atraia clientes qualificados todos os dias através de campanhas estratégicas otimizadas.' },
  { n:'02', Icon:Bot,             t:'IA para Atendimento',      d:'Automatize atendimentos 24h. Nossa IA qualifica leads e conduz clientes pelo funil.' },
  { n:'03', Icon:LayoutDashboard, t:'Sistema de Gestão',        d:'Centralize toda a operação da empresa em uma plataforma feita para sua realidade.' },
  { n:'04', Icon:Globe,           t:'Landing Page & Dev',       d:'Páginas de alta conversão e sistemas sob medida. Do design ao código, premium.' },
]
const steps = [
  { n:'01', t:'Diagnóstico',    d:'Mapeamos processos, identificamos gargalos e definimos onde a IA gera mais impacto.' },
  { n:'02', t:'Arquitetura',    d:'Desenhamos o fluxo técnico: integrações, triggers, modelos e estrutura de dados.' },
  { n:'03', t:'Implementação',  d:'Construímos e testamos automações, bots, CRM e criativos em cada componente.' },
  { n:'04', t:'Escala',         d:'Monitoramos, otimizamos e expandimos. O sistema evolui com o seu negócio.' },
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

// ── gem positions per slide ────────────────────────────────────────────────────
// each slide's content is laid out around the gem's position
const GEM = [
  { l:'7vw',  t:'78vh', s:0.75 },  // 0 intro:         bottom-left corner
  { l:'88vw', t:'11vh', s:0.50 },  // 1 pillars:       top-right
  { l:'39vw', t:'50vh', s:0.90 },  // 2 products:      center between image+text
  { l:'7vw',  t:'11vh', s:0.50 },  // 3 process:       top-left
  { l:'88vw', t:'78vh', s:0.65 },  // 4 why:           bottom-right
  { l:'50vw', t:'7vh',  s:0.50 },  // 5 testimonials:  top-center
  { l:'50vw', t:'28vh', s:1.10 },  // 6 cta:           center hero
]

// ── Framer Motion content variants ────────────────────────────────────────────
function useSlideVariants(active: boolean) {
  return {
    container: {
      animate: active ? 'show' : 'hide',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants: {
        hide: { transition: { staggerChildren: 0.04, staggerDirection: -1 as any } },
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
      } as any,
    },
    item: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants: {
        hide: { opacity: 0, y: 14, transition: { duration: 0.28 } },
        show: { opacity: 1, y: 0,  transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] } },
      } as any,
    },
  }
}

// ── helpers ────────────────────────────────────────────────────────────────────
function Label({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-px" style={{ background: light ? C.brandHi : C.brand }} />
      <span className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: light ? C.brandHi : C.brand }}>{children}</span>
    </div>
  )
}

// ── SLIDE 0 — Intro ────────────────────────────────────────────────────────────
function Slide0({ r, active }: { r:(el:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useSlideVariants(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.dark }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse 70% 55% at 50% 50%, ${C.g(.07)} 0%, transparent 72%)` }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* left: headline + CTA */}
          <motion.div {...v.container}>
            <motion.div {...v.item} className="flex items-center gap-3 mb-8">
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
              <motion.div key={t} {...v.item} className="overflow-hidden">
                <span className={`font-display font-bold block leading-[.93]${accent?' text-gradient':''}`}
                  style={{ fontSize:'clamp(2.4rem,4.5vw,5.2rem)', color:accent?undefined:C.white }}>{t}</span>
              </motion.div>
            ))}
            <motion.div {...v.item} className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link href="#" className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base text-white">
                Ver Produtos <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="mailto:orvynsistemas@outlook.com"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base"
                style={{ border:`1px solid rgba(255,255,255,.1)`, color:C.white, background:'rgba(255,255,255,.04)' }}>
                Falar com Especialista
              </Link>
            </motion.div>
          </motion.div>

          {/* right: metric tiles */}
          <motion.div {...v.container} className="grid grid-cols-2 gap-5">
            {[{ v:'+40',label:'Clientes Ativos' },{ v:'98%',label:'Retenção' },{ v:'3',label:'Produtos SaaS' },{ v:'5+',label:'Anos de Mercado' }].map(({ v:val, label }) => (
              <motion.div key={label} {...v.item} className="rounded-2xl p-6"
                style={{ background:'rgba(255,255,255,.04)', border:`1px solid ${C.g(.11)}` }}>
                <div className="font-display font-bold text-4xl mb-1 leading-none" style={{ color:C.white }}>{val}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color:'rgba(255,255,255,.35)' }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* scroll hint */}
      <motion.div className="absolute bottom-7 right-10 xl:right-20 flex items-center gap-1.5"
        style={{ color:'rgba(255,255,255,.22)' }}
        animate={{ opacity: active ? 1 : 0 }} transition={{ duration:.4, delay:.6 }}>
        <motion.div animate={{ x:[0,12,0] }} transition={{ duration:1.6, repeat:Infinity }}>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize:10, letterSpacing:'.14em', textTransform:'uppercase' }}>scroll</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── SLIDE 1 — Pillars ──────────────────────────────────────────────────────────
function Slide1({ r, active }: { r:(el:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useSlideVariants(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full flex flex-col justify-center px-10 xl:px-20 py-14 max-w-7xl mx-auto w-full">
        <motion.div {...v.container}>
          <motion.div {...v.item} className="mb-10">
            <Label>SOLUÇÃO COMPLETA</Label>
            <h2 className="font-display font-bold mt-4 leading-[.93]"
              style={{ fontSize:'clamp(2rem,3.8vw,4.2rem)', color:C.text }}>
              Tecnologia, automação e{' '}
              <span className="text-gradient">inteligência estratégica.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-4" style={{ perspective:'1400px' }}>
            {pillars.map((p, i) => (
              <motion.div key={p.n} {...v.item} className="rounded-2xl p-6 cursor-default"
                style={{ background:'rgba(255,255,255,.74)', border:'1px solid rgba(26,26,46,.09)' }}>
                <span className="font-display font-bold text-4xl block mb-4 leading-none" style={{ color:C.g(.1) }}>{p.n}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background:C.g(.09), border:`1px solid ${C.g(.22)}` }}>
                  <p.Icon className="w-5 h-5" style={{ color:C.brand }} />
                </div>
                <h3 className="font-display text-base font-bold mb-2 leading-tight" style={{ color:C.text }}>{p.t}</h3>
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
function Slide2({ r, active }: { r:(el:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useSlideVariants(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full flex items-center px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-center">
          <motion.div {...v.item} className="rounded-2xl overflow-hidden"
            style={{ transform:'perspective(1200px) rotateY(-7deg) rotateX(2.5deg)', boxShadow:`0 30px 80px ${C.g(.2)}` }}>
            <Image src="/images/rulles-ia.png" alt="Rulles IA" width={800} height={500} className="w-full h-auto block" />
          </motion.div>
          <motion.div {...v.container}>
            <motion.div {...v.item} className="mb-4"><Label>NOSSOS PRODUTOS</Label></motion.div>
            <motion.div {...v.item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background:C.g(.13), color:C.brandHi, border:`1px solid ${C.g(.28)}` }}>
              CRM — ADVOCACIA &amp; GESTÃO JURÍDICA
            </motion.div>
            <motion.h3 {...v.item} className="font-display font-normal mb-2 leading-[.93]"
              style={{ fontSize:'clamp(2.5rem,4vw,4.5rem)', color:C.text }}>Rulles IA</motion.h3>
            <motion.p {...v.item} className="text-base font-medium mb-3" style={{ color:C.brandLt }}>
              O CRM com IA nichado para advogados.
            </motion.p>
            <motion.p {...v.item} className="text-sm leading-relaxed mb-6" style={{ color:C.muted }}>
              Plataforma de gestão jurídica potencializada por IA. Automatize atendimento, organize processos e converta leads com precisão.
            </motion.p>
            <motion.div {...v.item} className="space-y-2 mb-7">
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
            <motion.div {...v.item}>
              <Link href="https://rulles-ia-pn5f.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white text-sm"
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
function Slide3({ r, active }: { r:(el:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useSlideVariants(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.dark }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse 65% 45% at 50% 65%, ${C.g(.06)} 0%, transparent 72%)` }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <motion.div {...v.container}>
          <motion.div {...v.item} className="mb-12">
            <Label light>NOSSO PROCESSO</Label>
            <h2 className="font-display font-bold mt-4 leading-[.93]"
              style={{ fontSize:'clamp(2rem,3.8vw,4.2rem)', color:C.white }}>
              Do problema ao resultado.{' '}
              <span className="text-gradient">Em etapas claras.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-4 gap-0">
            {steps.map((s) => (
              <motion.div key={s.n} {...v.item} className="pt-7 pr-8"
                style={{ borderTop:`1px solid ${C.g(.2)}` }}>
                <span className="font-display font-bold block mb-4 leading-none"
                  style={{ fontSize:'4.2rem', color:C.g(.16) }}>{s.n}</span>
                <h3 className="font-display text-xl mb-3" style={{ color:C.white }}>{s.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'rgba(255,255,255,.38)' }}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── SLIDE 4 — Why ──────────────────────────────────────────────────────────────
function Slide4({ r, active }: { r:(el:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useSlideVariants(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full flex flex-col justify-center px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <motion.div {...v.container}>
          <motion.div {...v.item} className="mb-10">
            <Label>DIFERENCIAIS</Label>
            <h2 className="font-display font-bold mt-4 leading-[.93]"
              style={{ fontSize:'clamp(2rem,3.8vw,4.2rem)', color:C.text }}>Por que Orvyn</h2>
            <p className="text-base mt-3" style={{ color:C.muted }}>Três razões técnicas que definem nossa abordagem.</p>
          </motion.div>
          <div className="grid grid-cols-3 gap-5" style={{ perspective:'1400px' }}>
            {diffs.map((d, i) => (
              <motion.div key={d.n} {...v.item} className="rounded-2xl p-8 cursor-default"
                style={{
                  background:'rgba(255,255,255,.72)', border:'1px solid rgba(26,26,46,.08)',
                  transform:`perspective(900px) rotateY(${(i-1)*-4}deg) rotateX(2deg)`,
                  transformOrigin:'center bottom',
                }}>
                <span className="font-display font-bold text-5xl block mb-4 leading-none" style={{ color:C.g(.12) }}>{d.n}</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background:C.g(.1), border:`1px solid ${C.g(.22)}` }}>
                  <d.Icon className="w-6 h-6" style={{ color:C.brandLt }} />
                </div>
                <h3 className="font-display text-xl mb-3" style={{ color:C.text }}>{d.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color:C.muted }}>{d.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── SLIDE 5 — Testimonials ─────────────────────────────────────────────────────
function Slide5({ r, active }: { r:(el:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useSlideVariants(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.light }}>
      <div className="h-full flex flex-col justify-center px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <motion.div {...v.container}>
          <motion.div {...v.item} className="mb-10">
            <Label>DEPOIMENTOS</Label>
            <h2 className="font-display font-bold mt-4 leading-[.93]"
              style={{ fontSize:'clamp(2rem,3.8vw,4.2rem)', color:C.text }}>O que nossos clientes dizem</h2>
          </motion.div>
          <div className="grid grid-cols-3 gap-5" style={{ perspective:'1400px' }}>
            {testimonials.map((t, i) => {
              const initials = t.name.split(' ').map(n => n[0]).join('')
              return (
                <motion.div key={t.name} {...v.item} className="rounded-2xl p-7"
                  style={{
                    background:'rgba(255,255,255,.72)', border:'1px solid rgba(26,26,46,.08)',
                    transform:`perspective(1000px) rotateY(${(i-1)*-4}deg) translateZ(${i===1?28:0}px)`,
                  }}>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_,s) => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color:'rgba(26,26,46,.72)' }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                      style={{ background:`linear-gradient(135deg,${C.brand},${C.brandLt})` }}>
                      {initials}
                    </div>
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
function Slide6({ r, active }: { r:(el:HTMLDivElement|null)=>void; active:boolean }) {
  const v = useSlideVariants(active)
  return (
    <div ref={r} className="absolute inset-0 overflow-hidden" style={{ background:C.dark }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse 80% 55% at 50% 50%, ${C.g(.09)} 0%, transparent 70%)` }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-10 xl:px-20 max-w-7xl mx-auto w-full">
        <motion.div {...v.container}>
          <motion.div {...v.item} className="mb-7"><Label light>VAMOS COMEÇAR</Label></motion.div>
          {/* gem lives here as spacer — the floating gem is above */}
          <div style={{ height:'8vh' }} />
          <div className="overflow-hidden mb-1">
            <motion.h2 {...v.item} className="font-display font-bold leading-[.93]"
              style={{ fontSize:'clamp(2.8rem,6.5vw,7rem)', color:C.white }}>
              Pronto para automatizar
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-9">
            <motion.h2 {...v.item} className="font-display font-bold leading-[.93] text-gradient"
              style={{ fontSize:'clamp(2.8rem,6.5vw,7rem)' }}>
              o que te trava?
            </motion.h2>
          </div>
          <motion.div {...v.item} className="flex flex-col sm:flex-row items-start gap-6">
            <p className="text-sm max-w-xs leading-relaxed" style={{ color:'rgba(242,240,252,.4)' }}>
              Fale com a ORVYN. Diagnóstico gratuito para novos projetos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="mailto:orvynsistemas@outlook.com?subject=Quero%20falar%20com%20a%20ORVYN"
                className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base text-white">
                Falar com a Equipe <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="mailto:orvynsistemas@outlook.com"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base"
                style={{ border:'1px solid rgba(255,255,255,.1)', color:C.white, background:'rgba(255,255,255,.04)' }}>
                Ver Produtos
              </Link>
            </div>
          </motion.div>
          <motion.div {...v.item} className="mt-12 pt-7 flex items-center justify-between"
            style={{ borderTop:'1px solid rgba(255,255,255,.06)' }}>
            <div className="flex items-center gap-3">
              <Image src="/images/orvyn-gem.png" alt="ORVYN" width={26} height={26} />
              <span className="font-display font-semibold text-base tracking-widest" style={{ color:C.white }}>ORVYN</span>
            </div>
            <p className="text-xs hidden md:block" style={{ color:'rgba(255,255,255,.28)' }}>
              © 2026 ORVYN Sistemas. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
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
const DARK_SLIDES = new Set([0, 3, 6])
function DotNav({ current }: { current: number }) {
  const dark = DARK_SLIDES.has(current)
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 pointer-events-none"
      style={{ zIndex: 200 }}>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="rounded-full transition-all duration-300"
          style={{
            width:  i === current ? 8 : 5,
            height: i === current ? 8 : 5,
            background: i === current ? C.brand : dark ? 'rgba(255,255,255,.25)' : 'rgba(168,34,221,.3)',
            boxShadow: i === current ? `0 0 10px rgba(168,34,221,.7)` : 'none',
          }} />
      ))}
    </div>
  )
}

// ── Mobile LP ──────────────────────────────────────────────────────────────────
import { Hero }               from './hero'
import { FloatingIconMarquee } from './floating-icon-marquee'
import { TextMarquee }        from './text-marquee'
import { Pillars }            from './pillars'
import { Products }           from './products'
import { HowItWorks }         from './how-it-works'
import { WhyOrvyn }           from './why-orvyn'
import { Testimonials }       from './testimonials'
import { FinalCTA }           from './final-cta'
import { Footer }             from './footer'

function MobileLP() {
  return (
    <main className="min-h-screen overflow-x-hidden page-bg">
      <Hero /><FloatingIconMarquee /><TextMarquee /><Pillars />
      <Products /><HowItWorks /><WhyOrvyn /><Testimonials />
      <FinalCTA /><Footer />
    </main>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
const SLIDE_COUNT = 7
// clip-path transition: odd slides enter from RIGHT, even from BELOW
const clipFrom = (i: number) =>
  i % 2 !== 0 ? 'inset(0 0 0 100%)' : 'inset(100% 0 0 0)'
const clipTo = (_i: number) => 'inset(0% 0% 0% 0%)'

export function HorizontalExperience() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const gemRef    = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>(Array(SLIDE_COUNT).fill(null))

  const [mounted,  setMounted]  = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [current,  setCurrent]  = useState(0)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!mounted || isMobile) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any

    const setup = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const outer  = outerRef.current
      const gem    = gemRef.current
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!outer || slides.length < SLIDE_COUNT) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ctx = gsap.context((): void => {

        // ── z-index: later slides stack on top ─────────────────────────────
        slides.forEach((s, i) => gsap.set(s, { zIndex: 10 + i }))

        // ── initial clip: slides 1-6 fully hidden ─────────────────────────
        slides.forEach((s, i) => {
          if (i === 0) return
          gsap.set(s, { clipPath: clipFrom(i) })
        })

        // ── gem: initial position ─────────────────────────────────────────
        if (gem) {
          gsap.set(gem, {
            position: 'absolute',
            xPercent: -50,
            yPercent: -50,
            left: GEM[0].l,
            top:  GEM[0].t,
            scale: GEM[0].s,
          })
        }

        // ── master timeline: scroll drives clip-path reveal + gem ─────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            pin: true,
            scrub: 2,
            start: 'top top',
            end: () => `+=${(SLIDE_COUNT - 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
            onUpdate(self) {
              // progress 0–1 maps to slides 0–6
              const raw = self.progress * (SLIDE_COUNT - 1)
              setCurrent(Math.min(SLIDE_COUNT - 1, Math.round(raw)))
            },
          },
        })

        for (let i = 1; i < SLIDE_COUNT; i++) {
          const pos = i - 1 // timeline label 0, 1, 2 …

          // Reveal slide i over the current one (no translate, just clip-path)
          tl.to(slides[i], {
            clipPath: clipTo(i),
            duration: 1,
            ease: 'power1.inOut',
          }, pos)

          // Gem moves to the new position
          if (gem && GEM[i]) {
            tl.to(gem, {
              left:  GEM[i].l,
              top:   GEM[i].t,
              scale: GEM[i].s,
              duration: 0.55,
              ease: 'power2.inOut',
            }, pos + 0.18)
          }
        }

        ScrollTrigger.refresh()
      }, outer)
    }

    const t = setTimeout(setup, 200)
    return () => { clearTimeout(t); ctx?.revert() }
  }, [mounted, isMobile])

  if (!mounted) return null
  if (isMobile) return <MobileLP />

  const r = (i: number) => (el: HTMLDivElement | null) => { slideRefs.current[i] = el }

  return (
    <>
      <DotNav current={current} />

      {/* Pinned outer container */}
      <div ref={outerRef} className="relative w-screen h-screen overflow-hidden">

        {/* Floating gem — absolute, above all slides, animated by GSAP */}
        <div ref={gemRef} className="absolute pointer-events-none" style={{ zIndex: 150 }}>
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 10px rgba(168,34,221,.45))',
                'drop-shadow(0 0 32px rgba(168,34,221,.95))',
                'drop-shadow(0 0 10px rgba(168,34,221,.45))',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image src="/images/orvyn-gem.png" alt="" width={52} height={52} aria-hidden />
          </motion.div>
        </div>

        {/* Slides — stacked absolutely, revealed by clip-path */}
        <Slide0 r={r(0)} active={current === 0} />
        <Slide1 r={r(1)} active={current === 1} />
        <Slide2 r={r(2)} active={current === 2} />
        <Slide3 r={r(3)} active={current === 3} />
        <Slide4 r={r(4)} active={current === 4} />
        <Slide5 r={r(5)} active={current === 5} />
        <Slide6 r={r(6)} active={current === 6} />
      </div>
    </>
  )
}
