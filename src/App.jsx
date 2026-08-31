import { Heart } from 'lucide-react'
import Hero from './components/Hero'
import StoryMap from './components/StoryMap'
import Timeline from './components/Timeline'
import Scrapbook from './components/Scrapbook'
import SecretQuiz from './components/SecretQuiz'
import CountdownLock from './components/CountdownLock'
import MusicPlayer from './components/MusicPlayer'
import LoveNotesJar from './components/LoveNotesJar'
import { coupleInfo } from './data/memories'

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <StoryMap />
      <Timeline />
      <Scrapbook />
      <SecretQuiz />
      <LoveNotesJar />
      <CountdownLock />

      <footer className="relative px-6 py-14 text-center">
        <p className="flex items-center justify-center gap-1.5 font-hand text-xl text-rose-dark">
          {coupleInfo.nameOne} <Heart size={16} fill="currentColor" /> {coupleInfo.nameTwo}
        </p>
        <p className="mt-2 text-xs text-plum-light/60">Sevgiylə hazırlandı, sadəcə sənin üçün.</p>
      </footer>

      <MusicPlayer />
    </div>
  )
}
