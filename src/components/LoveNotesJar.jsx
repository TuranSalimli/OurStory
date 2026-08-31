import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenLine, X } from 'lucide-react'
import { loveNotes } from '../data/memories'
import SectionHeading from './SectionHeading'

// Bükülmüş kağız qeydlər üçün jar (banka) daxilində üzən kiçik "vərəqlər".
// Hər klikdə bir qeyd çəkilir, bükülü vəziyyətdən açılaraq tam görünür.
const floatingNotes = [
  { top: '18%', left: '28%', rotate: -12, delay: 0 },
  { top: '32%', left: '58%', rotate: 8, delay: 0.4 },
  { top: '50%', left: '22%', rotate: 14, delay: 0.9 },
  { top: '58%', left: '62%', rotate: -6, delay: 1.3 },
  { top: '40%', left: '42%', rotate: 3, delay: 0.6 },
]

export default function LoveNotesJar() {
  const [drawnNote, setDrawnNote] = useState(null)
  const remainingRef = useRef([...loveNotes.keys()])

  const drawNote = () => {
    if (remainingRef.current.length === 0) {
      remainingRef.current = [...loveNotes.keys()]
    }
    const pool = remainingRef.current
    const pickIndex = Math.floor(Math.random() * pool.length)
    const noteIndex = pool[pickIndex]
    remainingRef.current = pool.filter((_, i) => i !== pickIndex)
    setDrawnNote(loveNotes[noteIndex])
  }

  return (
    <section id="notes-jar" className="relative mx-auto max-w-xl px-6 py-24 text-center">
      <SectionHeading eyebrow="Sözlə deyilməyən" title="Sevgi Sözləri Qutusu" />
      <p className="mx-auto mt-4 max-w-sm text-sm text-plum-light">
        Bu balaca qutuda sənə demək istədiyim sözlər bükülü şəkildə gözləyir. Birini çək.
      </p>

      {/* Jar illüstrasiyası */}
      <div className="relative mx-auto mt-10 h-56 w-48">
        {/* Jar qapağı */}
        <div className="absolute left-1/2 top-0 h-4 w-20 -translate-x-1/2 rounded-t-md bg-rose-dark/80" />
        {/* Jar gövdəsi */}
        <div
          className="absolute inset-x-0 top-3 bottom-0 overflow-hidden border-2 border-white/60 bg-white/25 backdrop-blur-[2px]"
          style={{ borderRadius: '18px 18px 30px 30px' }}
        >
          {floatingNotes.map((n, i) => (
            <motion.div
              key={i}
              className="absolute h-5 w-7 rounded-sm bg-blush shadow-sm"
              style={{ top: n.top, left: n.left, rotate: `${n.rotate}deg` }}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: n.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>

      <motion.button
        onClick={drawNote}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-medium text-cream shadow-petal transition hover:bg-rose-dark"
      >
        <PenLine size={16} />
        Bir qeyd çək
      </motion.button>

      <AnimatePresence>
        {drawnNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawnNote(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-plum/50 px-6 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scaleY: 0.12, opacity: 0.4 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0.12, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="relative w-full max-w-sm rounded-md bg-white px-8 py-10 shadow-soft"
            >
              <button
                onClick={() => setDrawnNote(null)}
                className="absolute right-3 top-3 rounded-full bg-plum/70 p-1.5 text-cream hover:bg-plum"
                aria-label="Bağla"
              >
                <X size={14} />
              </button>
              {/* Qırışıq kağız xətləri */}
              <div className="pointer-events-none absolute inset-x-6 top-1/3 h-px bg-plum/10" />
              <div className="pointer-events-none absolute inset-x-6 top-2/3 h-px bg-plum/10" />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="font-hand text-2xl leading-snug text-plum"
              >
                {drawnNote}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
