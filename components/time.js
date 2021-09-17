import { parseISO, format } from 'date-fns'

export default function Time({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'HH:mm')}</time>
}
