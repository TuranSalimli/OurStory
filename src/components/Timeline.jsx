import { motion } from 'framer-motion'
import { timelineEvents } from '../data/memories'
import SectionHeading from './SectionHeading'

export default function Timeline() {
  return (
    <section id="timeline" className="relative mx-auto max-w-3xl px-6 py-24">
      <SectionHeading eyebrow="Addım-addım" title="Zaman Tünelimiz" />

      <div className="relative mt-16">
        {/* Mərkəzi xətt */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blush via-rose/50 to-sage sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-14">
          {timelineEvents.map((event, i) => (
            <TimelineItem key={event.id} event={event} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ event, reverse }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative flex flex-col gap-4 pl-12 sm:flex-row sm:items-center sm:gap-0 sm:pl-0 ${
        reverse ? 'sm:flex-row-reverse' : ''
      }`}
    >
      {/* Nöqtə markeri */}
      <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-rose ring-4 ring-blush/50 sm:left-1/2" />

      <div className={`sm:w-1/2 ${reverse ? 'sm:pl-10 sm:text-left' : 'sm:pr-10 sm:text-right'}`}>
        <p className="text-xs uppercase tracking-wide text-rose-dark">{event.date}</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-plum">{event.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-plum-light">{event.description}</p>
      </div>

      <div className={`sm:w-1/2 ${reverse ? 'sm:pr-10' : 'sm:pl-10'}`}>
        <img
          src={event.image}
          alt={event.title}
          className="h-48 w-full rounded-2xl object-cover shadow-petal sm:h-56"
        />
      </div>
    </motion.div>
  )
}
