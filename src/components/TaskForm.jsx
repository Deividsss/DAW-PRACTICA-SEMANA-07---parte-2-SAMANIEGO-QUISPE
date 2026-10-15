import { memo, useEffect, useRef, useState } from 'react'

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('') 
  const inputRef = useRef(null) // acceso al nodo DOM sin re-render


  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
    inputRef.current?.focus() 
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Nueva tarea..."
        aria-label="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default memo(TaskForm)
