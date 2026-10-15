// Acceso seguro a localStorage (puede fallar en modo privado o con JSON corrupto).
export const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Cuota excedida o storage bloqueado: la app sigue funcionando sin persistencia.
  }
}
