import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, ChevronDown } from 'lucide-react'
import Counter from './Counter'
import FloatingHearts from './FloatingHearts'
import { coupleInfo } from '../data/memories'

function fireConfetti() {
  const colors = ['#C5788A', '#F3C9C6', '#CBA46B', '#A9B79C']
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 38,
    origin: { y: 0.65 },
    colors,
    scalar: 0.9,
    ticks: 220,
  })
}

export default function Hero() {
  return (
    <FloatingHearts className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Organik fon fiqurları */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-sage-light/50 blur-3xl animate-float"
        style={{ animationDelay: '1.5s' }}
      />
      <div className="pointer-events-none absolute right-1/3 top-1/4 h-32 w-32 rounded-full bg-gold/20 blur-2xl animate-float" />

      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-4 font-hand text-2xl text-rose-dark sm:text-3xl"
      >
        {coupleInfo.nameOne} &amp; {coupleInfo.nameTwo}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="max-w-3xl font-display text-5xl font-medium leading-[1.1] text-plum sm:text-7xl"
      >
        {coupleInfo.heroTitle}
      </motion.h1>

      <motion.svg
        width="220"
        height="20"
        viewBox="0 0 220 20"
        className="mt-3 text-rose"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M4 14 C 50 2, 90 20, 130 8 S 200 2, 216 12"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1, transition: { duration: 1.1, delay: 0.7, ease: 'easeInOut' } },
          }}
        />
      </motion.svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-5 max-w-md text-balance text-base text-plum-light sm:text-lg"
      >
        {coupleInfo.heroSubtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="mt-10"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-plum-light/70">bərabər keçən vaxt</p>
        <Counter since={coupleInfo.relationshipStart} />
      </motion.div>

      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          fireConfetti()
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-medium text-cream shadow-petal transition-colors hover:bg-rose-dark"
      >
        <Sparkles size={16} />
        Bir az sevgi buraxaq
      </motion.button>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-8 text-plum-light/60"
      >
        <ChevronDown size={22} />
      </motion.div>
    </FloatingHearts>
  )
}
