export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-semibold text-alabaster mb-3 leading-tight">{title}</h2>
      {description && <p className="text-alabaster/80 text-lg">{description}</p>}
    </div>
  );
}
