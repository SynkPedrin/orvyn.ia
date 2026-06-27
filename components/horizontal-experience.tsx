'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, TrendingUp, Bot, LayoutDashboard, Globe,
  Scale, FileText, Bell, BarChart2,
  Crosshair, Code2, CheckCircle, Star,
} from 'lucide-react'

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  brand:  '#A822DD',
  lt:     '#CC55EC',
  hi:     '#E088F8',
  text:   '#f0eeff',
  muted:  'rgba(240,238,255,0.48)',
  panel:  'rgba(3,3,12,0.78)',
  card:   'rgba(255,255,255,0.05)',
  border: 'rgba(168,34,221,0.22)',
  g: (a: number) => `rgba(168,34,221,${a})`,
}

// ── Content ───────────────────────────────────────────────────────────────────
const pillars = [
  { Icon: TrendingUp,      n:'01', t:'Gestão de Tráfego',   d:'Campanhas estratégicas que atraem clientes qualificados diariamente.' },
  { Icon: Bot,             n:'02', t:'IA para Atendimento',  d:'Atendimento 24h, qualificação de leads e condução pelo funil.' },
  { Icon: LayoutDashboard, n:'03', t:'Sistema de Gestão',    d:'Centralize toda a operação em uma plataforma sob medida.' },
  { Icon: Globe,           n:'04', t:'Landing Page & Dev',   d:'Páginas de alta conversão. Do design ao código, premium.' },
]
const steps = [
  { n:'01', t:'Diagnóstico',    d:'Mapeamos processos e identificamos onde a IA gera mais impacto.' },
  { n:'02', t:'Arquitetura',    d:'Desenhamos o fluxo técnico: integrações, triggers e modelos.' },
  { n:'03', t:'Implementação',  d:'Construímos automações, bots e CRM em cada componente.' },
  { n:'04', t:'Escala',         d:'Monitoramos, otimizamos e expandimos junto ao seu negócio.' },
]
const diffs = [
  { Icon: Crosshair,   t:'Nichado, não genérico',        d:'Soluções construídas para o problema específico do seu negócio.' },
  { Icon: Code2,       t:'Prompt Engineering real',       d:'Engenharia de prompt estruturada. Performance técnica mensurável.' },
  { Icon: CheckCircle, t:'Automação sem código fantasma', d:'Fluxos documentados que funcionam meses depois, com suporte.' },
]
const testimonials = [
  { name:'Rafael Santos',   role:'Sócio-fundador, Santos & Associados',      q:'Rulles IA transformou nosso workflow. O que levava 3h agora leva 30min.' },
  { name:'Mariana Costa',   role:'Diretora de Marketing, E-commerce Growth', q:'A automação da Orvyn transformou nossa captação. 45% mais conversão.' },
  { name:'Felipe Oliveira', role:'CTO, Tech Startup',                        q:'A Orvyn não vende software, vende entendimento.' },
]

const N = 7

const SLIDE_CLIP = [
  '',
  'inset(0 0 0 100%)',
  'inset(0 100% 0 0)',
  'inset(0 0 100% 0)',
  'inset(0 0 0 100%)',
  'inset(100% 0 0 0)',
  'inset(0 0 100% 0)',
]
const SLIDE_ENTRY = [
  null,
  { x: -32, y: -20, r: -12 },
  { x:  36, y:   0, r:  12 },
  { x:   0, y:  32, r:  -8 },
  { x: -34, y:   0, r:   8 },
  { x:   0, y: -32, r: -10 },
  { x:   0, y:  12, r:   6 },
]

// ── Tag Pill (reference image style) ─────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.25)',
      borderRadius: 999,
      padding: '0.45rem 1.4rem',
      fontSize: 11,
      fontFamily: 'monospace',
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      color: 'rgba(255,255,255,0.65)',
    }}>
      {label}
    </div>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function Label({ t }: { t: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px" style={{ background: C.hi }} />
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: C.hi }}>{t}</span>
    </div>
  )
}

// ── Panel wrapper (glass over 3D scene) ───────────────────────────────────────
function Panel({ children, className = '', style = {} }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        background: C.panel,
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── Slide 0 — Hero ────────────────────────────────────────────────────────────
function S0({ r }: { r: (e: HTMLDivElement | null) => void }) {
  return (
    <div ref={r} className="absolute inset-0">
      <div className="h-full flex flex-col justify-between px-6 sm:px-12 xl:px-20 py-8 sm:py-12 max-w-7xl mx-auto w-full">

        {/* Headline */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <div data-anim className="mb-6">
            <span style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: C.g(.8), fontWeight: 600 }}>
              ORVYN SISTEMAS — 2026
            </span>
          </div>

          <div data-anim className="overflow-hidden mb-1">
            <h1 className="font-display font-black leading-[.88]" style={{ fontSize: 'clamp(2.8rem,9vw,7.5rem)', color: C.text }}>
              Inteligência
            </h1>
          </div>
          <div data-anim className="overflow-hidden mb-1">
            <h1 className="font-display font-black leading-[.88] text-gradient" style={{ fontSize: 'clamp(2.8rem,9vw,7.5rem)' }}>
              que automatiza.
            </h1>
          </div>
          <div data-anim className="overflow-hidden mb-1">
            <h1 className="font-display font-black leading-[.88]" style={{ fontSize: 'clamp(2.8rem,9vw,7.5rem)', color: C.text }}>
              Estratégia que
            </h1>
          </div>
          <div data-anim className="overflow-hidden mb-10">
            <h1 className="font-display font-black leading-[.88] text-gradient" style={{ fontSize: 'clamp(2.8rem,9vw,7.5rem)' }}>
              converte.
            </h1>
          </div>

          <div data-anim className="flex flex-col sm:flex-row gap-3">
            <Link href="#"
              className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-sm text-white">
              Ver Produtos <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="mailto:orvynsistemas@outlook.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-sm"
              style={{ border: `1px solid rgba(255,255,255,.14)`, color: C.text, background: 'rgba(255,255,255,.04)' }}>
              Falar com Especialista
            </Link>
          </div>
        </div>

        {/* Bottom row: stats + tags */}
        <div data-anim className="flex flex-col sm:flex-row items-end justify-between gap-6">
          {/* Stat pills */}
          <div className="flex gap-3 flex-wrap">
            {[{ v:'+40', l:'Clientes' },{ v:'98%', l:'Retenção' },{ v:'5+', l:'Anos' }].map(({ v, l }) => (
              <Panel key={l} style={{ padding: '0.6rem 1.2rem', borderRadius: 999, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="font-display font-black text-lg leading-none" style={{ color: C.text }}>{v}</span>
                <span style={{ fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted }}>{l}</span>
              </Panel>
            ))}
          </div>
          {/* Tech tags (reference image style) */}
          <div className="flex gap-2 flex-wrap">
            {['INTERACTIVE','IA','THREE.JS','3D'].map(t => <Tag key={t} label={t} />)}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Slide 1 — Services ────────────────────────────────────────────────────────
function S1({ r }: { r: (e: HTMLDivElement | null) => void }) {
  return (
    <div ref={r} className="absolute inset-0">
      <div className="h-full flex flex-col justify-center px-6 sm:px-12 xl:px-20 py-12 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-8 sm:mb-12">
          <Label t="SOLUÇÃO COMPLETA" />
          <h2 className="font-display font-black leading-[.90]" style={{ fontSize: 'clamp(2rem,6vw,5rem)', color: C.text }}>
            Tecnologia,<br />
            automação e{' '}
            <span className="text-gradient">inteligência.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl">
          {pillars.map((p) => (
            <Panel key={p.n} data-anim style={{ padding: '1.25rem 1.5rem' }}>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: C.g(.16), border: `1px solid ${C.g(.3)}` }}>
                  <p.Icon className="w-4 h-4" style={{ color: C.lt }} />
                </div>
                <div>
                  <div className="font-display font-bold text-sm mb-1" style={{ color: C.text }}>{p.t}</div>
                  <div className="text-xs leading-relaxed" style={{ color: C.muted }}>{p.d}</div>
                </div>
              </div>
            </Panel>
          ))}
        </div>

        <div data-anim className="flex gap-2 mt-8 flex-wrap">
          {['AUTOMAÇÃO','IA','TRÁFEGO','GESTÃO'].map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  )
}

// ── Slide 2 — Product ─────────────────────────────────────────────────────────
function S2({ r }: { r: (e: HTMLDivElement | null) => void }) {
  return (
    <div ref={r} className="absolute inset-0">
      <div className="h-full flex flex-col justify-center px-6 sm:px-12 xl:px-20 py-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">

          <div data-anim className="hidden lg:block">
            <Panel style={{ overflow: 'hidden', borderRadius: 16 }}>
              <Image src="/images/rulles-ia.png" alt="Rulles IA" width={700} height={440}
                className="w-full h-auto block" style={{ opacity: 0.9 }} />
            </Panel>
          </div>

          <div>
            <div data-anim><Label t="NOSSOS PRODUTOS" /></div>
            <div data-anim className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: C.g(.16), color: C.hi, border: `1px solid ${C.g(.34)}` }}>
              CRM — ADVOCACIA &amp; GESTÃO JURÍDICA
            </div>
            <div data-anim>
              <h3 className="font-display font-black leading-[.88] mb-3" style={{ fontSize: 'clamp(2.5rem,7vw,5.5rem)', color: C.text }}>
                Rulles IA
              </h3>
              <p className="text-base font-medium mb-2" style={{ color: C.lt }}>O CRM com IA nichado para advogados.</p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
                Plataforma jurídica potencializada por IA. Automatize atendimento, organize processos e converta leads com precisão.
              </p>
            </div>
            <div data-anim className="space-y-2 mb-6 hidden sm:block">
              {[
                { I: Scale,     t: 'Triagem automática via IA conversacional' },
                { I: FileText,  t: 'Geração assistida de documentos jurídicos' },
                { I: Bell,      t: 'Alertas de prazos automatizados' },
                { I: BarChart2, t: 'Dashboard de performance em tempo real' },
              ].map(({ I, t }) => (
                <div key={t} className="flex gap-3 items-center">
                  <I className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.lt }} />
                  <span className="text-xs" style={{ color: C.muted }}>{t}</span>
                </div>
              ))}
            </div>
            <div data-anim>
              <Link href="https://rulles-ia-pn5f.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white text-sm"
                style={{ background: `linear-gradient(135deg,${C.brand},${C.lt})`, boxShadow: `0 8px 28px ${C.g(.38)}` }}>
                Acessar Rulles IA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Slide 3 — Process ─────────────────────────────────────────────────────────
function S3({ r }: { r: (e: HTMLDivElement | null) => void }) {
  return (
    <div ref={r} className="absolute inset-0">
      <div className="h-full flex flex-col justify-center px-6 sm:px-12 xl:px-20 py-12 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-10 sm:mb-14">
          <Label t="NOSSO PROCESSO" />
          <h2 className="font-display font-black leading-[.90]" style={{ fontSize: 'clamp(2rem,6vw,5rem)', color: C.text }}>
            Do problema ao<br />
            <span className="text-gradient">resultado.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 max-w-4xl">
          {steps.map((s, i) => (
            <div key={s.n} data-anim className="pr-6 pb-4"
              style={{ borderTop: `1px solid ${C.g(.3)}`, paddingTop: '1.25rem' }}>
              <span className="font-display font-black block mb-2 leading-none"
                style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: C.g(.2) }}>
                {s.n}
              </span>
              <div className="font-display font-bold text-sm mb-1.5" style={{ color: C.text }}>{s.t}</div>
              <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{s.d}</p>
            </div>
          ))}
        </div>

        <div data-anim className="flex gap-2 mt-10 flex-wrap">
          {['DIAGNÓSTICO','ARQUITETURA','CONSTRUÇÃO','ESCALA'].map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  )
}

// ── Slide 4 — Why Orvyn ───────────────────────────────────────────────────────
function S4({ r }: { r: (e: HTMLDivElement | null) => void }) {
  return (
    <div ref={r} className="absolute inset-0">
      <div className="h-full flex flex-col justify-center px-6 sm:px-12 xl:px-20 py-12 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-10">
          <Label t="DIFERENCIAIS" />
          <h2 className="font-display font-black leading-[.90]" style={{ fontSize: 'clamp(2rem,6vw,5rem)', color: C.text }}>
            Por que{' '}
            <span className="text-gradient">Orvyn?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
          {diffs.map((d, i) => (
            <Panel key={d.t} data-anim style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: C.g(.16), border: `1px solid ${C.g(.3)}` }}>
                <d.Icon className="w-5 h-5" style={{ color: C.lt }} />
              </div>
              <div>
                <div className="font-display font-bold text-base mb-2" style={{ color: C.text }}>{d.t}</div>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{d.d}</p>
              </div>
            </Panel>
          ))}
        </div>

        <div data-anim className="flex gap-2 mt-8 flex-wrap">
          {['NICHADO','TÉCNICO','MENSURÁVEL'].map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  )
}

// ── Slide 5 — Testimonials ────────────────────────────────────────────────────
function S5({ r }: { r: (e: HTMLDivElement | null) => void }) {
  return (
    <div ref={r} className="absolute inset-0">
      <div className="h-full flex flex-col justify-center px-6 sm:px-12 xl:px-20 py-12 max-w-7xl mx-auto w-full">
        <div data-anim className="mb-10">
          <Label t="DEPOIMENTOS" />
          <h2 className="font-display font-black leading-[.90]" style={{ fontSize: 'clamp(2rem,6vw,5rem)', color: C.text }}>
            O que nossos<br />
            <span className="text-gradient">clientes dizem.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
          {testimonials.map((t) => {
            const ini = t.name.split(' ').map(n => n[0]).join('')
            return (
              <Panel key={t.name} data-anim style={{ padding: '1.5rem' }}>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
                  &ldquo;{t.q}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg,${C.brand},${C.lt})` }}>{ini}</div>
                  <div>
                    <div className="font-semibold text-xs" style={{ color: C.text }}>{t.name}</div>
                    <div className="text-[10px]" style={{ color: C.muted }}>{t.role}</div>
                  </div>
                </div>
              </Panel>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Slide 6 — CTA ─────────────────────────────────────────────────────────────
function S6({ r }: { r: (e: HTMLDivElement | null) => void }) {
  return (
    <div ref={r} className="absolute inset-0">
      <div className="h-full flex flex-col justify-center items-center text-center px-6 sm:px-12 py-12 max-w-5xl mx-auto w-full">
        <div data-anim><Label t="VAMOS COMEÇAR" /></div>

        <div data-anim className="mb-2">
          <h2 className="font-display font-black leading-[.88]" style={{ fontSize: 'clamp(3rem,10vw,9rem)', color: C.text }}>
            Pronto para
          </h2>
        </div>
        <div data-anim className="mb-2">
          <h2 className="font-display font-black leading-[.88] text-gradient" style={{ fontSize: 'clamp(3rem,10vw,9rem)' }}>
            automatizar
          </h2>
        </div>
        <div data-anim className="mb-12">
          <h2 className="font-display font-black leading-[.88]" style={{ fontSize: 'clamp(3rem,10vw,9rem)', color: C.text }}>
            o que te trava?
          </h2>
        </div>

        <div data-anim className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="mailto:orvynsistemas@outlook.com?subject=Quero%20falar%20com%20a%20ORVYN"
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-white">
            Falar com a Equipe <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="mailto:orvynsistemas@outlook.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base"
            style={{ border: `1px solid rgba(255,255,255,.16)`, color: C.text, background: 'rgba(255,255,255,.04)' }}>
            Ver Produtos
          </Link>
        </div>

        <div data-anim className="flex items-center justify-between w-full"
          style={{ borderTop: `1px solid rgba(255,255,255,.07)`, paddingTop: '1.5rem' }}>
          <div className="flex items-center gap-2">
            <Image src="/images/orvyn-gem.png" alt="ORVYN" width={20} height={20} />
            <span className="font-display font-bold text-sm tracking-widest" style={{ color: C.text }}>ORVYN</span>
          </div>
          <p className="text-xs hidden sm:block" style={{ color: C.muted }}>© 2026 ORVYN Sistemas.</p>
          <div className="flex gap-4">
            {['Privacidade','Termos'].map(l => (
              <Link key={l} href="#" className="text-xs hover:opacity-80 transition-opacity" style={{ color: C.muted }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Dot Nav ───────────────────────────────────────────────────────────────────
function DotNav({ current, progress }: { current: number; progress: number }) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-none" style={{ zIndex: 200 }}>
      <div className="relative w-px overflow-hidden rounded-full" style={{ height: 60, background: 'rgba(255,255,255,.12)' }}>
        <div className="absolute top-0 left-0 w-full rounded-full"
          style={{ height: `${progress * 100}%`, background: `linear-gradient(to bottom,${C.brand},${C.lt})`, transition: 'height 60ms linear' }} />
      </div>
      {Array.from({ length: N }, (_, i) => (
        <div key={i} className="rounded-full transition-all duration-300" style={{
          width:  i === current ? 7 : 3,
          height: i === current ? 7 : 3,
          background: i === current ? C.brand : 'rgba(255,255,255,.25)',
          boxShadow: i === current ? `0 0 8px ${C.g(.8)}` : 'none',
        }} />
      ))}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function HorizontalExperience() {
  const outerRef = useRef<HTMLDivElement>(null)
  const sRefs    = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null))
  const [mounted,  setMounted]  = useState(false)
  const [current,  setCurrent]  = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  // Opening sound
  useEffect(() => {
    if (typeof window === 'undefined') return
    const sfx = new Audio('/abertura.mp3')
    sfx.volume = 0.3
    const play = () => { sfx.play().catch(() => {}) }
    const t = setTimeout(() => sfx.play().catch(() => {
      window.addEventListener('scroll', play, { once: true })
      window.addEventListener('click',  play, { once: true })
    }), 900)
    return () => { clearTimeout(t); window.removeEventListener('scroll', play); window.removeEventListener('click', play) }
  }, [])

  // GSAP scroll setup
  useEffect(() => {
    if (!mounted) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sRefs.current.filter(Boolean).forEach((s, i) => {
        if (i > 0 && s) { s.style.clipPath = 'none'; s.style.position = 'relative' }
      })
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

      const scrub = window.innerWidth < 640 ? 0.9 : 1.4

      ctx = gsap.context((): void => {

        // z-index stacking
        slides.forEach((s, i) => gsap.set(s, { zIndex: 10 + i }))
        // S1-S6 hidden behind clip
        slides.forEach((s, i) => { if (i > 0) gsap.set(s, { clipPath: SLIDE_CLIP[i] }) })

        // S1-S6 content: set initial hidden state
        for (let i = 1; i < N; i++) {
          const e = SLIDE_ENTRY[i]!
          const els = slides[i].querySelectorAll('[data-anim]')
          if (els.length) gsap.set(els, { autoAlpha: 0, x: e.x, y: e.y, scale: 0.85, rotation: e.r })
        }

        // Master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer, pin: true, scrub,
            start: 'top top',
            end: () => `+=${(N - 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
            onUpdate(self) {
              setCurrent(Math.min(N - 1, Math.round(self.progress * (N - 1))))
              setProgress(self.progress)
            },
          },
        })

        // S0 exits quickly at first scroll
        const s0Els = Array.from(slides[0].querySelectorAll('[data-anim]'))
        if (s0Els.length) {
          tl.to(s0Els, { autoAlpha: 0, y: -30, rotation: -4, stagger: 0.02, duration: 0.25, ease: 'power2.in' }, 0.06)
        }

        // Per slide: clip-path open → content burst in → content exit
        for (let i = 1; i < N; i++) {
          const pos = i - 1
          const e   = SLIDE_ENTRY[i]!

          // Clip wipe
          tl.to(slides[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, pos)

          // Content burst (only after 68% of clip open)
          const contentEls = Array.from(slides[i].querySelectorAll('[data-anim]'))
          if (contentEls.length) {
            tl.fromTo(contentEls,
              { autoAlpha: 0, x: e.x, y: e.y, scale: 0.82, rotation: e.r },
              { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, stagger: 0.08, duration: 0.38, ease: 'back.out(1.9)' },
              pos + 0.68
            )
          }

          // Content exit before next slide
          if (i < N - 1 && contentEls.length) {
            tl.to(contentEls, { autoAlpha: 0, y: -24, rotation: -3, stagger: 0.015, duration: 0.2, ease: 'power2.in' }, pos + 0.92)
          }
        }

        // S0 hero one-shot entry
        if (s0Els.length) {
          gsap.set(s0Els, { autoAlpha: 0, y: 30, rotation: -4 })
          gsap.to(s0Els, { autoAlpha: 1, y: 0, rotation: 0, stagger: 0.07, duration: 0.75, ease: 'back.out(1.6)', delay: 0.4 })
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
      <DotNav current={current} progress={progress} />

      <div ref={outerRef} className="relative w-screen overflow-hidden" style={{ height: '100dvh', minHeight: '100svh' }}>
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
