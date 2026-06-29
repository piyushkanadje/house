import { useInView } from '../hooks/useInView'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  align = 'center',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={`mb-10 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left'} ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      } ${className}`}
    >
      {eyebrow && (
        <div className={align === 'center' ? 'flex flex-col items-center' : ''}>
          <p className={`eyebrow mb-3 ${light ? 'text-gold-light' : ''}`}>{eyebrow}</p>
          <span className={`eyebrow-rule ${light ? 'eyebrow-rule-light' : ''}`} />
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-5xl font-serif leading-tight ${
          light ? 'text-white' : 'text-forest'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}
