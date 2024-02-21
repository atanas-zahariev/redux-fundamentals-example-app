import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'

const selector = state => state.todos

const TodoList = () => {
  const todos = useSelector(selector);
  const dispatch = useDispatch()

  const renderedListItems = todos.map((todo) => {
    return <
      TodoListItem key={todo.id}
      todo={todo}
      onDelete={() => { dispatch({ type: 'todos/todoDeleted', payload: todo.id }) }}
      onCompletedChange={() => { dispatch({ type: 'todos/todoToggled', payload: todo.id }) }}
      onColorChange={(value) => { dispatch({ type: 'todos/colorSelected', payload: { todoId: todo.id, color: value } }) }}
    />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
