"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealTextProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

export function RevealText({ children, className = "", delay = 0, once = true }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const words = children.split(" ")

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

interface CharRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}

export function CharReveal({ children, className = "", delay = 0, stagger = 0.02, once = true }: CharRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-50px" })

  const chars = children.split("")

  return (
    <div ref={ref} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%", opacity: 0, rotateX: 90 }}
          animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : { y: "100%", opacity: 0, rotateX: 90 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

interface LineRevealProps {
  children: string[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}

export function LineReveal({ children, className = "", lineClassName = "", delay = 0, stagger = 0.15 }: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className={className}>
      {children.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            className={lineClassName}
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
