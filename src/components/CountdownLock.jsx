import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'
import { lockedSurprise } from '../data/memories'
import SectionHeading from './SectionHeading'

const units = [
  { key: 'days', label: 'Gün' },
  { key: 'hours', label: 'Saat' },
  { key: 'minutes', label: 'Dəqiqə' },
  { key: 'seconds', label: 'Saniyə' },
]

export default function CountdownLock() {
  const time = useCountdown(lockedSurprise.unlockDate)

  return (
    <section id="locked" className="relative mx-auto max-w-xl px-6 py-24 text-center">
      <SectionHeading eyebrow="Səbrini yoxla" title={lockedSurprise.title} />

      <div className="mt-10 rounded-3xl border border-blush/60 bg-white/50 p-8 shadow-soft backdrop-blur-sm">
        {time.isFuture ? (
          <>
            <motion.div
              animate={{ rotate: [0, -4, 4, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-plum text-cream"
            >
              <Lock size={24} />
            </motion.div>
            <p className="text-sm text-plum-light">{lockedSurprise.lockedMessage}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {units.map((u) => (
                <div key={u.key} className="flex w-20 flex-col items-center rounded-2xl bg-cream py-3 shadow-petal">
                  <span className="font-display text-2xl font-semibold text-plum tabular-nums">
                    {String(time[u.key]).padStart(2, '0')}
                  </span>
                  <span className="mt-0.5 text-[10px] tracking-wide text-plum-light">{u.label}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
            <Mail className="mx-auto mb-4 text-rose-dark" size={30} />
            <h3 className="font-display text-3xl font-semibold text-plum">{lockedSurprise.content.title}</h3>
            <img
              src={lockedSurprise.content.image}
              alt="sürpriz"
              className="mx-auto mt-5 h-56 w-full max-w-sm rounded-2xl object-cover shadow-petal"
            />
            <p className="mx-auto mt-5 max-w-sm font-hand text-2xl leading-snug text-plum">
              {lockedSurprise.content.message}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
