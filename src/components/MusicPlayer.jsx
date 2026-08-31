import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Music2 } from 'lucide-react'
import { backgroundMusic } from '../data/memories'

// Künc-de sabit qalan, vinil valı formalı musiqi düyməsi.
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <audio ref={audioRef} src={backgroundMusic.src} loop />
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? 'Musiqini dayandır' : 'Musiqini çal'}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-plum text-cream shadow-soft"
      >
        <motion.div
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
          className="absolute inset-1 rounded-full border-2 border-rose/40"
          style={{
            background:
              'repeating-radial-gradient(circle at center, #4A2E3B 0px, #4A2E3B 2px, #3a2430 3px, #3a2430 4px)',
          }}
        />
        <Music2 size={20} className="relative z-10" />
      </motion.button>
    </div>
  )
}
