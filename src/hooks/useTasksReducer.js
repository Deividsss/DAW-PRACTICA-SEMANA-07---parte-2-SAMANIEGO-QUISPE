import { useReducer, useEffect } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

// Tipos de acción
export const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  TOGGLE: 'TOGGLE',
  FILTER: 'FILTER',
  SORT: 'SORT',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
}

export const initialState = { items: [], filter: 'all', sort: 'asc' }

const STORAGE_KEY = 'dashboard:tasks'

// Reducer PURO: sin efectos secundarios (el id y la fecha llegan en el payload).
function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const title = action.payload.title.trim()
      if (!title) return state
      return { ...state, items: [...state.items, { ...action.payload, title, done: false }] }
    }
    case ACTIONS.REMOVE:
      return { ...state, items: state.items.filter((task) => task.id !== action.payload) }
    case ACTIONS.TOGGLE:
      return {
        ...state,
        items: state.items.map((task) =>
          task.id === action.payload ? { ...task, done: !task.done } : task,
        ),
      }
    case ACTIONS.FILTER:
      return { ...state, filter: action.payload }
    case ACTIONS.SORT:
      return { ...state, sort: action.payload }
    case ACTIONS.CLEAR_COMPLETED:
      return { ...state, items: state.items.filter((task) => !task.done) }
    default:
      return state
  }
}

// Inicialización perezosa desde localStorage
const init = () => ({ ...initialState, ...readStorage(STORAGE_KEY, {}) })

/** Hook que encapsula useReducer + persistencia de la lista. */
export function useTasksReducer() {
  const [state, dispatch] = useReducer(tasksReducer, undefined, init)

  useEffect(() => {
    writeStorage(STORAGE_KEY, state)
  }, [state])

  return [state, dispatch]
}

export default tasksReducer
