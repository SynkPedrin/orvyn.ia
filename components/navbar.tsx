'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isExpanded = isHovered || isOpen

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Island Container */}
      <motion.div
        layout
        animate={{
          width: isExpanded ? 'auto' : isScrolled ? 180 : 320,
          borderRadius: 50,
        }}
        style={{ maxWidth: 'calc(100vw - 32px)' }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 30,
          layout: { duration: 0.4 }
        }}
        className="relative overflow-hidden"
        style={{
          background: 'rgba(26, 26, 46, 0.9)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed State
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-3 px-6 py-3"
            >
              <Image
                src="/images/orvyn-gem.png"
                alt="ORVYN"
                width={36}
                height={36}
                className="animate-pulse-glow"
              />
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isScrolled ? 0 : 1,
                  width: isScrolled ? 0 : 'auto'
                }}
                className="font-display font-semibold text-xl tracking-widest text-white whitespace-nowrap overflow-hidden"
              >
                ORVYN
              </motion.span>
            </motion.div>
          ) : (
            // Expanded State
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-3"
            >
              {/* Desktop Expanded */}
              <div className="hidden md:flex items-center gap-2">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 px-3">
                  <Image
                    src="/images/orvyn-gem.png"
                    alt="ORVYN"
                    width={36}
                    height={36}
                  />
                  <span className="font-display font-semibold text-xl tracking-widest text-white">
                    ORVYN
                  </span>
                </Link>

                {/* Divider */}
                <div className="w-px h-6 bg-white/20 mx-2" />

                {/* Nav Links */}
                {['Produtos', 'Sobre', 'Contato'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    {item}
                  </Link>
                ))}

                {/* Divider */}
                <div className="w-px h-6 bg-white/20 mx-2" />

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="mailto:orvynsistemas@outlook.com?subject=Quero%20comecar%20com%20ORVYN"
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-purple-900 transition-all"
                    style={{ 
                      background: 'linear-gradient(135deg, #fff 0%, #e9d5ff 100%)',
                    }}
                  >
                    Comecar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Expanded */}
              <div className="md:hidden">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/images/orvyn-gem.png"
                      alt="ORVYN"
                      width={36}
                      height={36}
                    />
                    <span className="font-display font-semibold text-xl tracking-widest text-white">
                      ORVYN
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    {isOpen ? (
                      <X className="w-5 h-5 text-white" />
                    ) : (
                      <Menu className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 space-y-1">
                        {['Produtos', 'Sobre', 'Contato'].map((item) => (
                          <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                          >
                            {item}
                          </Link>
                        ))}
                        <div className="pt-3 mt-3 border-t border-white/10">
                          <Link
                            href="mailto:orvynsistemas@outlook.com?subject=Quero%20comecar%20com%20ORVYN"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-purple-900 font-semibold"
                            style={{ 
                              background: 'linear-gradient(135deg, #fff 0%, #e9d5ff 100%)',
                            }}
                          >
                            Comecar
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}
