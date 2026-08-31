import { motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'

const units = [
  { key: 'days', label: 'Gün' },
  { key: 'hours', label: 'Saat' },
  { key: 'minutes', label: 'Dəqiqə' },
  { key: 'seconds', label: 'Saniyə' },
]

export default function Counter({ since }) {
  const time = useCountdown(since)

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {units.map((u, i) => (
        <motion.div
          key={u.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * i, duration: 0.6 }}
          className="flex w-20 flex-col items-center rounded-2xl bg-white/50 py-4 shadow-petal backdrop-blur-sm sm:w-24"
        >
          <span className="font-display text-3xl font-semibold text-plum sm:text-4xl tabular-nums">
            {String(time[u.key]).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[11px] tracking-wide text-plum-light sm:text-xs">{u.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
