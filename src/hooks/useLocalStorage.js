import { useState, useEffect, useCallback, useRef } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

const resolve = (value) => (typeof value === 'function' ? value() : value)

/**
  * * @param {string} key           
 * @param {*|Function} defaultValue 
 * @returns {[*, Function]}    
 */
export const useLocalStorage = (key, defaultValue) => {
  const defaultRef = useRef(defaultValue)

  const [value, setStoredValue] = useState(() => readStorage(key, resolve(defaultValue)))

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.storageArea !== window.localStorage || event.key !== key) return
      try {
        setStoredValue(
          event.newValue === null ? resolve(defaultRef.current) : JSON.parse(event.newValue),
        )
      } catch {
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage) 
  }, [key])

  const setValue = useCallback((next) => {
    setStoredValue((prev) => (typeof next === 'function' ? next(prev) : next))
  }, [])

  return [value, setValue]
}
