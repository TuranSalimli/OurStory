import { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin as MapPinIcon } from 'lucide-react'
import { mapPins } from '../data/memories'
import SectionHeading from './SectionHeading'

// Xüsusi ürək-formalı marker ikonu
const heartIcon = L.divIcon({
  html: `<div class="marker-pin"></div>`,
  className: 'custom-heart-marker',
  iconSize: [34, 34],
  iconAnchor: [17, 30],
})

const markerStyleTag = (
  <style>{`
    .custom-heart-marker .marker-pin {
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      background: #C5788A;
      border: 2px solid #FBF3EE;
      transform: rotate(-45deg);
      box-shadow: 0 4px 12px rgba(74,46,59,0.35);
    }
  `}</style>
)

export default function StoryMap() {
  const [active, setActive] = useState(null)
  
  // Bakı mərkəzinin koordinatları
  const bakuCenter = [40.4093, 49.8671]

  return (
    <section id="map" className="relative mx-auto max-w-5xl px-6 py-24">
      {markerStyleTag}
      <SectionHeading eyebrow="Xatirələr xəritəsi" title="Bizim Xəritəmiz" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mt-10 overflow-hidden rounded-3xl border border-blush/60 shadow-soft"
      >
        {/* Zoom səviyyəsi 12 edilərək Bakı şəhərinə yaxınlaşdırıldı */}
        <MapContainer 
          center={bakuCenter} 
          zoom={12} 
          scrollWheelZoom={false} 
          style={{ height: '480px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapPins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={heartIcon}
              eventHandlers={{ click: () => setActive(pin) }}
            />
          ))}
        </MapContainer>
      </motion.div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-plum-light">
        <MapPinIcon size={14} /> Xəritədəki nöqtələrə klikləyib xatirələri kəşf et
      </p>

      <AnimatePresence>
        {active && <MemoryModal pin={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function MemoryModal({ pin, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      /* z-50 Tailwind sinfi z-[9999] ilə əvəz edildi ki, Leaflet z-index laylarının üstündə qalsın */
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-plum/50 px-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-cream shadow-soft"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-plum/70 p-1.5 text-cream hover:bg-plum"
          aria-label="Bağla"
        >
          <X size={16} />
        </button>
        <img src={pin.image} alt={pin.title} className="h-56 w-full object-cover" />
        <div className="p-6">
          <p className="text-xs uppercase tracking-wide text-rose-dark">{pin.date}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-plum">{pin.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-plum-light">{pin.memory}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}