const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

const colors = []


export default function todosReducer(state = initialState, action) {
  state = state.filter(todo => !todo.selectedByState).filter(todo => !todo.selected)
  switch (action.type) {
    case 'todos/todoAdded': {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    case 'todos/filterByStatus': {
      const { status } = action.payload

      let filterByState

      if (status === 'active') {
        filterByState = state.filter(todo => !todo.completed)

      } else if (status === 'completed') {
        filterByState = state.filter(todo => todo.completed)
      }

      const todosFilterByState = { selectedByState: filterByState }

      if (filterByState && filterByState.length > 0) {
        return [
          ...state,
          todosFilterByState
        ]
      }

      return [...state]
    }
    case 'todos/filterByColor': {
      const color = action.payload

      if (!colors.includes(color)) {
        colors.push(color)
      } else if (colors.includes(color)) {
        let index = colors.indexOf(color)
        colors.splice(index, 1)
      }

      const todosFilterByColor = state.filter((todo) => colors.includes(todo.color))

      const selectedByColor = { selected: todosFilterByColor }

      if (todosFilterByColor.length > 0) {
        return [
          ...state,
          selectedByColor
        ]
      }

      return [
        ...state,
      ]


    }
    default:
      return state
  }
}
