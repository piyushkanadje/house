import type { ExperienceTranslation } from '../i18n/types'
import { indoorExperienceIcons, outdoorExperienceIcons } from '../data/experiences'
import { useLanguage } from '../i18n/LanguageContext'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'

function ExperienceCard({ exp, Icon }: { exp: ExperienceTranslation; Icon: LucideIcon }) {
  return (
    <div className="group flex items-center gap-3 p-4 rounded-xl border border-forest/10 bg-white/90 hover:bg-forest hover:border-forest transition-all duration-300 h-full">
      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-forest/10 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
        <Icon className="w-5 h-5 text-forest group-hover:text-gold transition-colors" />
      </div>
      <div className="min-w-0">
        <p className="font-sans font-medium text-sm sm:text-base text-forest group-hover:text-white transition-colors leading-tight">
          {exp.title}
        </p>
        {exp.tag && (
          <p className="text-xs text-sage group-hover:text-white/60 mt-0.5 transition-colors">
            {exp.tag}
          </p>
        )}
      </div>
    </div>
  )
}

function ExperienceGroup({
  title,
  items,
  icons,
  variant,
}: {
  title: string
  items: ExperienceTranslation[]
  icons: LucideIcon[]
  variant: 'outdoor' | 'indoor'
}) {
  const isOutdoor = variant === 'outdoor'

  return (
    <div
      className={`flex flex-col h-full rounded-2xl p-5 lg:p-6 border ${
        isOutdoor ? 'bg-white/70 border-forest/10' : 'bg-forest/5 border-forest/15'
      }`}
    >
      <h3 className="font-serif text-xl text-forest mb-4">{title}</h3>
      <div className="grid gap-2 flex-1">
        {items.map((exp, i) => (
          <ExperienceCard key={exp.title} exp={exp} Icon={icons[i]} />
        ))}
      </div>
    </div>
  )
}

export default function Experiences() {
  const { t } = useLanguage()

  return (
    <section id="experiences" className="section-padding bg-cream-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.experiences.title} />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <ExperienceGroup
            title={t.experiences.outdoorTitle}
            items={t.experiences.outdoor}
            icons={outdoorExperienceIcons}
            variant="outdoor"
          />
          <ExperienceGroup
            title={t.experiences.indoorTitle}
            items={t.experiences.indoor}
            icons={indoorExperienceIcons}
            variant="indoor"
          />
        </div>
      </div>
    </section>
  )
}
