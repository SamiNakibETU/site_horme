import Link from 'next/link'
import type { AgendaEntry, Performance } from '@/lib/cms.types'

/** « 12 mars 2026 », calculé à midi UTC pour qu'aucun fuseau ne décale le jour. */
export function formatDate(iso: string, withWeekday = false) {
  return new Intl.DateTimeFormat('fr-FR', {
    ...(withWeekday ? { weekday: 'short' as const } : {}),
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T12:00:00Z`))
}

type Entry = Performance & Partial<Pick<AgendaEntry, 'projectSlug' | 'projectTitle'>>

/**
 * Liste de dates. Une ligne par représentation : date, (création), lieu,
 * réservation. Les dates passées sont gardées, en retrait.
 */
export default function AgendaList({
  entries,
  showProject = false,
  today,
}: {
  entries: Entry[]
  showProject?: boolean
  /** AAAA-MM-JJ ; si fourni, les dates antérieures sont marquées comme passées. */
  today?: string
}) {
  return (
    <ul className="agenda">
      {entries.map((e, i) => {
        const past = today ? e.date < today : false
        return (
          <li key={`${e.date}-${e.venue}-${i}`} className="agenda__row" data-past={past}>
            <time dateTime={e.date} className="agenda__date">
              {formatDate(e.date, !past)}
              {e.time && <span className="agenda__time">{e.time}</span>}
            </time>
            <span className="agenda__what">
              {showProject && e.projectSlug && (
                <Link href={`/projets/${e.projectSlug}`} className="agenda__project">
                  {e.projectTitle}
                </Link>
              )}
              <span className="agenda__venue">
                {[e.venue, e.city].filter(Boolean).join(', ')}
                {e.note && <span className="agenda__note">{e.note}</span>}
              </span>
            </span>
            {e.ticketUrl && !past ? (
              <a href={e.ticketUrl} className="ed-link agenda__ticket" target="_blank" rel="noopener noreferrer">
                Réserver<span className="sr-only"> (nouvel onglet)</span>
              </a>
            ) : (
              <span className="agenda__ticket" aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ul>
  )
}
