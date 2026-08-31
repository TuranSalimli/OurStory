import { useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookHeart } from 'lucide-react'
import { scrapbookPages } from '../data/memories'
import SectionHeading from './SectionHeading'

const Page = ({ page, pageNumber }) => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-cream p-6">
    <div className="relative w-full max-w-xs rotate-[-1.5deg] rounded-sm bg-white p-3 shadow-soft">
      <img src={page.image} alt={page.title || 'xatirə'} className="h-56 w-full rounded-sm object-cover" />
      <span className="absolute -right-3 -top-3 text-3xl drop-shadow">{page.sticker}</span>
    </div>
    <p className="mt-6 max-w-xs rotate-[0.6deg] text-center font-hand text-2xl leading-snug text-plum">
      {page.note}
    </p>
    <span className="mt-4 text-xs text-plum-light/60">{pageNumber}</span>
  </div>
)

export default function Scrapbook() {
  const bookRef = useRef(null)
  const [page, setPage] = useState(0)

  const goNext = () => bookRef.current?.pageFlip()?.flipNext()
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev()

  return (
    <section id="scrapbook" className="relative mx-auto max-w-4xl px-6 py-24">
      <SectionHeading eyebrow="Vərəq-vərəq xatirələr" title="Rəqəmsal Xatirə Jurnalımız" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mt-12 flex flex-col items-center"
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={goPrev}
            aria-label="Əvvəlki səhifə"
            className="rounded-full bg-white/70 p-2 text-rose-dark shadow-petal transition hover:bg-white"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="overflow-hidden rounded-2xl shadow-soft">
            <HTMLFlipBook
              ref={bookRef}
              width={300}
              height={400}
              size="stretch"
              minWidth={260}
              maxWidth={340}
              minHeight={360}
              maxHeight={440}
              showCover={false}
              onFlip={(e) => setPage(e.data)}
              className="scrapbook-flip"
            >
              {scrapbookPages.map((p, i) => (
                <div key={p.id}>
                  <Page page={p} pageNumber={i + 1} />
                </div>
              ))}
            </HTMLFlipBook>
          </div>

          <button
            onClick={goNext}
            aria-label="Növbəti səhifə"
            className="rounded-full bg-white/70 p-2 text-rose-dark shadow-petal transition hover:bg-white"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <p className="mt-5 flex items-center gap-1.5 text-sm text-plum-light">
          <BookHeart size={14} />
          Səhifə {page + 1} / {scrapbookPages.length} — səhifəni sürüşdürərək də çevirə bilərsən
        </p>
      </motion.div>
    </section>
  )
}
