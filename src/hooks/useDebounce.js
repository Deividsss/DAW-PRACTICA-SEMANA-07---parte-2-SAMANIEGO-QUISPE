import { useState, useEffect } from 'react'

//* Hook personalizado reutilizable//
export const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timerId) // cleanup
  }, [value, delay])

  return debounced
}
