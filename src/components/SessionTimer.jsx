import { useEffect, useState } from 'react'

const SessionTimer = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => setSeconds((s) => s + 1), 1000)
    console.log('⏱️ SessionTimer: intervalo creado', intervalId)
    return () => {
      clearInterval(intervalId)
      console.log('🧹 SessionTimer: cleanup ejecutado, intervalo limpiado', intervalId)
    }
  }, [])

  return <p className="timer">Tiempo en sesión: {seconds}s</p>
}

export default SessionTimer
