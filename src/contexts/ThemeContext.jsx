import { createContext, useEffect, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const ThemeContext = createContext(null)

// Respeta la preferencia del sistema operativo.
const getDefaultTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useLocalStorage('theme', getDefaultTheme)

  useEffect(() => {
    document.body.classList.add(theme)
    return () => document.body.classList.remove(theme)
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    [setTheme],
  )

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
