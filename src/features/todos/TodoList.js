import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'

const idSelector = (state) => {
  return state.todos.map((todo) => todo.id).filter(id => id !== undefined)
}

const statusSelector = (state) => {
  const todos = [...state.todos].filter((todo) => todo.selectedByState)

  return todos
}

const colorSelector = (state) => {
  const selectedTodosByColor = state.todos.filter((todo) => todo.selected)

  return selectedTodosByColor
}


const TodoList = () => {
  const todosId = useSelector(idSelector, shallowEqual);
  const selectedTodos = useSelector(state => statusSelector(state));
  const selectedByColor = useSelector(state => colorSelector(state));

  let renderedListItems

  if (selectedTodos.length > 0 && todosId.length > 0) {
    const todoIds = selectedTodos.map((todo) => todo.selectedByState.map(todo => todo.id))

    renderedListItems = todoIds[0].map((todoId) => {
      return <
        TodoListItem key={todoId}
        id={todoId}
      />
    })

  } else if (selectedByColor.length > 0 && todosId.length > 0) {
    const todosColoredIds = selectedByColor[0].selected.map(todo => todo.id);

    renderedListItems = todosColoredIds.map((todoId) => {
      return <
        TodoListItem key={todoId}
        id={todoId}
      />
    })
  } else {
    renderedListItems = todosId.map((todoId) => {
      return <
        TodoListItem key={todoId}
        id={todoId}
      />
    })
  }

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList

