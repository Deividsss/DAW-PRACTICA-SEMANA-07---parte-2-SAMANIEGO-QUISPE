import { memo, useMemo } from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, filter, sort, search, onRemove, onToggle }) => {
  // useMemo
  const processedTasks = useMemo(() => {
    const term = search.trim().toLowerCase()
    return tasks
      .filter((task) => (filter === 'done' ? task.done : filter === 'pending' ? !task.done : true))
      .filter((task) => task.title.toLowerCase().includes(term))
      .sort((a, b) => {
        const order = a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
        return sort === 'asc' ? order : -order
      }) 
  }, [tasks, filter, sort, search])

  if (processedTasks.length === 0) {
    return <p className="empty">No hay tareas para mostrar. Agrega una arriba.</p>
  }

  return (
    <ul className="task-list">
      {processedTasks.map((task) => (
        <TaskItem key={task.id} task={task} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </ul>
  )
}

export default memo(TaskList)
