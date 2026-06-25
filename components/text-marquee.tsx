'use client'

const WORDS = [
  'Automação', '·', 'IA', '·', 'CRM', '·', 'Prompt Engineering', '·',
  'Tráfego Pago', '·', 'Atendimento 24h', '·', 'Gestão Empresarial', '·',
  'Automação', '·', 'IA', '·', 'CRM', '·', 'Prompt Engineering', '·',
  'Tráfego Pago', '·', 'Atendimento 24h', '·', 'Gestão Empresarial', '·',
]

export function TextMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden py-4 border-y"
      style={{ borderColor: 'rgba(26,26,46,0.08)' }}
    >
      {/* Fade masks — dark bg */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to right, #f5f3ee 0%, transparent 6%, transparent 94%, #f5f3ee 100%)',
        }}
      />

      <div
        className="flex gap-8 w-max"
        style={{ animation: 'marquee-scroll 30s linear infinite' }}
      >
        {WORDS.map((word, i) => (
          <span
            key={i}
            className="text-xs sm:text-sm font-medium tracking-widest uppercase whitespace-nowrap flex-shrink-0"
            style={{
              color: word === '·' ? 'rgba(83,74,183,0.5)' : 'rgba(26,26,46,0.4)',
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
