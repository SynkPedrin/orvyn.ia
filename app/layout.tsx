import React from "react"
import type { Metadata, Viewport } from 'next'
import { Oswald, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CustomCursor } from '@/components/custom-cursor'
import { ClientShell } from '@/components/client-shell'
import { ImmersiveWrapper } from '@/components/immersive-wrapper'
import './globals.css'

const oswald = Oswald({
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700']
});

const lato = Lato({
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['100', '300', '400', '700', '900']
});

export const metadata: Metadata = {
  title: 'ORVYN — Automação, IA e Estratégia',
  description: 'Inteligência que automatiza. Estratégia que converte. Rulles IA (CRM jurídico), gestão de tráfego, IA para atendimento e desenvolvimento de software.',
  keywords: ['IA', 'automação', 'CRM', 'tráfego pago', 'captação de leads', 'advocacia', 'gestão empresarial', 'landing page', 'webdesign'],
  authors: [{ name: 'ORVYN Sistemas' }],
  creator: 'ORVYN Sistemas',
  icons: {
    icon: '/images/orvyn-gem.png',
    apple: '/images/orvyn-gem.png',
  },
  openGraph: {
    title: 'ORVYN — Tecnologia de Elite',
    description: 'Soluções digitais premium que transformam negócios.',
    type: 'website',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#A822DD',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${oswald.variable} ${lato.variable} font-sans antialiased`}>
        <CustomCursor />
        {/* Film grain noise overlay */}
        <div className="noise-overlay" aria-hidden />
        {/* 3D immersive layer — lazy loaded, fixed behind all DOM */}
        <ImmersiveWrapper />
        <ClientShell>
          {children}
        </ClientShell>
        <Analytics />
      </body>
    </html>
  )
}
