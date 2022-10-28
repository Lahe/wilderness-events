import { useEffect, useMemo, useState } from 'react'

export const useMediaQuery = (queryString: string) => {
  const query = useMemo(() => window.matchMedia(queryString), [queryString])
  const [matches, setMatches] = useState(query.matches) // one-time, instantaneous check

  useEffect(() => {
    const listener = (e: any) => setMatches(e.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [query])

  return matches
}
