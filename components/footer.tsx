'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

function InstagramIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      style={{
        background: '#07060f',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Oversized ORVYN wordmark — decorative watermark */}
      <div
        style={{
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="font-display font-bold block text-center select-none"
            style={{
              fontSize: 'clamp(4rem, 18vw, 16rem)',
              lineHeight: 0.85,
              color: 'rgba(255,255,255,0.03)',
              letterSpacing: '-0.02em',
            }}
          >
            ORVYN
          </span>
        </motion.div>
      </div>

      {/* Main footer content */}
      <div className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/orvyn-gem.png"
                    alt="ORVYN"
                    width={44}
                    height={44}
                    className="opacity-90"
                  />
                  <span
                    className="font-display font-semibold text-2xl tracking-widest"
                    style={{ color: '#f2f0fc' }}
                  >
                    ORVYN
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Automação, IA e Estratégia para empresas que não têm tempo a perder.
                </p>

                {/* Social Icons */}
                <div className="flex flex-wrap gap-3">
                  {/* Instagram ORVYN */}
                  <motion.div whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="https://www.instagram.com/orvyn.ia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram ORVYN"
                      title="@orvyn.ia"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: 'rgba(168,34,221,0.15)' }}
                    >
                      <InstagramIcon className="w-5 h-5 text-white" />
                    </Link>
                  </motion.div>

                  {/* Instagram CEO */}
                  <motion.div whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="https://www.instagram.com/pedro.gaabriiel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram CEO Pedro Gabriel"
                      title="@pedro.gaabriiel"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: 'rgba(168,34,221,0.15)' }}
                    >
                      <InstagramIcon className="w-5 h-5" style={{ color: 'rgba(196,181,253,0.8)' }} />
                    </Link>
                  </motion.div>

                  {/* GitHub */}
                  <motion.div whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="https://github.com/SynkPedrin"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: 'rgba(168,34,221,0.15)' }}
                    >
                      <GithubIcon className="w-5 h-5 text-white" />
                    </Link>
                  </motion.div>

                  {/* LinkedIn */}
                  <motion.div whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="#"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: 'rgba(168,34,221,0.15)' }}
                    >
                      <LinkedinIcon className="w-5 h-5 text-white" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Produtos */}
              <div>
                <h3
                  className="font-display font-semibold text-sm mb-4 tracking-widest uppercase"
                  style={{ color: '#f2f0fc' }}
                >
                  Produtos
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Rulles IA', href: 'https://rulles-ia-pn5f.vercel.app/' },
                    { name: 'Arber Flow', href: 'https://github.com/SynkPedrin' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors duration-300 hover:text-white font-light"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Empresa */}
              <div>
                <h3
                  className="font-display font-semibold text-sm mb-4 tracking-widest uppercase"
                  style={{ color: '#f2f0fc' }}
                >
                  Empresa
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Sobre Nós', href: '#sobre' },
                    { name: 'Contato', href: '#contato' },
                    { name: 'Blog', href: '#' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm transition-colors duration-300 hover:text-white font-light"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contato */}
              <div>
                <h3
                  className="font-display font-semibold text-sm mb-4 tracking-widest uppercase"
                  style={{ color: '#f2f0fc' }}
                >
                  Contato
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:orvynsistemas@outlook.com"
                    className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-white font-light"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="break-all">orvynsistemas@outlook.com</span>
                  </a>

                  <div className="space-y-2 pt-1">
                    <Link
                      href="https://www.instagram.com/orvyn.ia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-white font-light group"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      <InstagramIcon className="w-4 h-4 flex-shrink-0 group-hover:text-purple-400 transition-colors" />
                      <span>@orvyn.ia</span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(168,34,221,0.3)', color: '#c4b5fd' }}
                      >
                        empresa
                      </span>
                    </Link>
                    <Link
                      href="https://www.instagram.com/pedro.gaabriiel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-white font-light group"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      <InstagramIcon className="w-4 h-4 flex-shrink-0 group-hover:text-purple-400 transition-colors" />
                      <span>@pedro.gaabriiel</span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(168,34,221,0.2)', color: '#c4b5fd' }}
                      >
                        ceo
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="my-8 sm:my-12"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            />

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p
                className="text-xs text-center sm:text-left font-light"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                © 2026 ORVYN Sistemas. Todos os direitos reservados.
              </p>
              <div className="flex gap-6">
                <Link
                  href="#"
                  className="text-xs transition-colors duration-300 hover:text-white font-light"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Privacidade
                </Link>
                <Link
                  href="#"
                  className="text-xs transition-colors duration-300 hover:text-white font-light"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Termos de Serviço
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
