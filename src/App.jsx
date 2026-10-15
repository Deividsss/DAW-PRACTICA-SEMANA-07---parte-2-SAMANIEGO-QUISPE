import { useCallback, useContext, useState } from 'react'
import { ACTIONS, useTasksReducer } from './hooks/useTasksReducer'
import { useDebounce } from './hooks/useDebounce'
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext'
import TaskForm from './components/TaskForm'
import Controls from './components/Controls'
import TaskList from './components/TaskList'
import SessionTimer from './components/SessionTimer'

const Dashboard = () => {
  const [state, dispatch] = useTasksReducer()
  const { theme, toggleTheme } = useContext(ThemeContext)

  const [search, setSearch] = useState('')
  const [showTimer, setShowTimer] = useState(true)
  const debouncedSearch = useDebounce(search, 300) 

  // useCallback
  const handleAdd = useCallback(
    (title) =>
      dispatch({
        type: ACTIONS.ADD,
        payload: { id: crypto.randomUUID(), title, createdAt: Date.now() },
      }),
    [dispatch],
  )
  const handleRemove = useCallback((id) => dispatch({ type: ACTIONS.REMOVE, payload: id }), [dispatch])
  const handleToggle = useCallback((id) => dispatch({ type: ACTIONS.TOGGLE, payload: id }), [dispatch])
  const handleFilter = useCallback((value) => dispatch({ type: ACTIONS.FILTER, payload: value }), [dispatch])
  const handleSort = useCallback((value) => dispatch({ type: ACTIONS.SORT, payload: value }), [dispatch])
  const handleClearCompleted = useCallback(() => dispatch({ type: ACTIONS.CLEAR_COMPLETED }), [dispatch])

  const doneCount = state.items.filter((task) => task.done).length

  return (
    <div className={`dashboard ${theme}`}>
      <header>
        <h1>Gestor de Tareas</h1>
        <button onClick={toggleTheme}>Cambiar Tema ({theme === 'light' ? 'claro' : 'oscuro'})</button>
      </header>

      <p className="stats">
        {state.items.length} tareas · {doneCount} hechas · {state.items.length - doneCount} pendientes
      </p>

      <TaskForm onAdd={handleAdd} />

      <input
        className="search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar tareas..."
        aria-label="Buscar tareas"
      />

      <Controls
        filter={state.filter}
        sort={state.sort}
        onFilter={handleFilter}
        onSort={handleSort}
        onClearCompleted={handleClearCompleted}
      />

      <TaskList
        tasks={state.items}
        filter={state.filter}
        sort={state.sort}
        search={debouncedSearch}
        onRemove={handleRemove}
        onToggle={handleToggle}
      />

      <footer>
        <button onClick={() => setShowTimer((visible) => !visible)}>
          {showTimer ? 'Ocultar' : 'Mostrar'} temporizador
        </button>
        {showTimer && <SessionTimer />}
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}
