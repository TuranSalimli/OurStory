import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Lock, Unlock, HelpCircle } from 'lucide-react'
import { secretQuiz } from '../data/memories'
import SectionHeading from './SectionHeading'

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, '')
}

export default function SecretQuiz() {
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('idle') // idle | wrong | correct
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const isCorrect = secretQuiz.acceptedAnswers.some((a) => normalize(a) === normalize(answer))
    if (isCorrect) {
      setStatus('correct')
      confetti({
        particleCount: 130,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#C5788A', '#F3C9C6', '#CBA46B'],
      })
    } else {
      setStatus('wrong')
    }
  }

  return (
    <section id="quiz" className="relative mx-auto max-w-xl px-6 py-24">
      <SectionHeading eyebrow="Gizli sürpriz" title="Yadındadırmı?" />

      <div className="mt-10 rounded-3xl border border-blush/60 bg-white/50 p-8 text-center shadow-soft backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {status !== 'correct' ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Lock className="mx-auto mb-4 text-rose-dark" size={30} />
              <p className="font-display text-2xl text-plum">{secretQuiz.question}</p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-3">
                <input
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value)
                    if (status === 'wrong') setStatus('idle')
                  }}
                  placeholder="Cavabını bura yaz..."
                  className="w-full max-w-xs rounded-full border border-blush bg-cream px-5 py-3 text-center text-sm text-plum placeholder:text-plum-light/60 focus:outline-none focus:ring-2 focus:ring-rose"
                />
                <button
                  type="submit"
                  className="rounded-full bg-rose px-6 py-2.5 text-sm font-medium text-cream shadow-petal transition hover:bg-rose-dark"
                >
                  Aç
                </button>
              </form>

              {status === 'wrong' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-rose-dark"
                >
                  Bir daha düşün, əminəm ki, xatırlayacaqsan 💭
                </motion.p>
              )}

              <button
                type="button"
                onClick={() => setShowHint((s) => !s)}
                className="mt-4 inline-flex items-center gap-1 text-xs text-plum-light hover:text-rose-dark"
              >
                <HelpCircle size={13} /> İpucu göstər
              </button>
              {showHint && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 font-hand text-lg text-rose-dark"
                >
                  {secretQuiz.hint}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 18 }}
            >
              <Unlock className="mx-auto mb-4 text-sage" size={30} />
              <h3 className="font-display text-3xl font-semibold text-plum">
                {secretQuiz.unlockedContent.title}
              </h3>
              <img
                src={secretQuiz.unlockedContent.image}
                alt="sürpriz"
                className="mx-auto mt-5 h-56 w-full max-w-sm rounded-2xl object-cover shadow-petal"
              />
              <p className="mx-auto mt-5 max-w-sm font-hand text-2xl leading-snug text-plum">
                {secretQuiz.unlockedContent.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
