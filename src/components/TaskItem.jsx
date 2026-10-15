import { memo } from 'react'

const TaskItem = ({ task, onRemove, onToggle }) => (
  <li className={task.done ? 'done' : ''}>
    <label>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <span>{task.title}</span>
    </label>
    <button onClick={() => onRemove(task.id)}>Eliminar</button>
  </li>
)

// React.memo: solo se re-renderiza si cambia su tarea o sus handlers.
export default memo(TaskItem)
