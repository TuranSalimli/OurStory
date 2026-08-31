export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="text-center">
      <p className="font-hand text-xl text-rose-dark">{eyebrow}</p>
      <h2 className="mt-1 font-display text-4xl font-medium text-plum sm:text-5xl">{title}</h2>
    </div>
  )
}
