import { memo } from 'react'

const FILTERS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'done', label: 'Hechas' },
]

const Controls = ({ filter, sort, onFilter, onSort, onClearCompleted }) => (
  <div className="controls">
    <div className="group" role="group" aria-label="Filtrar">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={filter === value ? 'active' : ''}
          aria-pressed={filter === value}
          onClick={() => onFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
    <div className="group">
      <button onClick={() => onSort(sort === 'asc' ? 'desc' : 'asc')}>
        Orden: {sort === 'asc' ? 'A → Z' : 'Z → A'}
      </button>
      <button onClick={onClearCompleted}>Limpiar hechas</button>
    </div>
  </div>
)

export default memo(Controls)
