import { useEffect, useState } from 'react'

function diffParts(ms) {
  const abs = Math.max(ms, 0)
  const totalSeconds = Math.floor(abs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

/**
 * targetDate ötəndirsə (keçmişdə) -> "bu tarixdən bəri keçən vaxt" hesablayır (count-up)
 * targetDate gələcəkdirsə -> "bu tarixə qədər qalan vaxt" hesablayır (count-down)
 */
export function useCountdown(targetDate) {
  const target = new Date(targetDate).getTime()
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const isFuture = target > now
  const diff = isFuture ? target - now : now - target

  return { ...diffParts(diff), isFuture, isPast: !isFuture, reached: now >= target }
}
