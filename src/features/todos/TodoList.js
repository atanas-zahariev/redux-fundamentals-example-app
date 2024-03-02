import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'

const idSelector = (state) => {
  return state.todos.map((todo) => todo.id)
}
const TodoList = () => {
  const todosId = useSelector(idSelector, shallowEqual);

  const renderedListItems = todosId.map((todoId) => {
    return <
      TodoListItem key={todoId}
      id={todoId}

    />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
