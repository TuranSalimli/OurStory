import { useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Klikləndikdə kursorun ətrafında balaca ürəklər uçuran wrapper.
// Uşaqları (children) əhatə edib, onClick zamanı effekti tetikləyir.
export default function FloatingHearts({ children, className = '' }) {
  const [hearts, setHearts] = useState([])
  const idRef = useRef(0)

  const spawn = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newHearts = Array.from({ length: 5 }).map(() => ({
      id: idRef.current++,
      x: x + (Math.random() - 0.5) * 40,
      y,
      drift: (Math.random() - 0.5) * 90,
      scale: 0.6 + Math.random() * 0.6,
      duration: 1 + Math.random() * 0.6,
    }))
    setHearts((h) => [...h, ...newHearts])
    setTimeout(() => {
      setHearts((h) => h.filter((heart) => !newHearts.some((n) => n.id === heart.id)))
    }, 1800)
  }, [])

  return (
    <div className={`relative ${className}`} onClick={spawn}>
      {children}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ opacity: 1, x: h.x, y: h.y, scale: h.scale }}
            animate={{ opacity: 0, y: h.y - 140, x: h.x + h.drift }}
            exit={{ opacity: 0 }}
            transition={{ duration: h.duration, ease: 'easeOut' }}
            className="pointer-events-none absolute text-rose"
            style={{ left: 0, top: 0 }}
          >
            <Heart fill="currentColor" size={22} />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
