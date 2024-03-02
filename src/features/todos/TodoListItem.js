import React from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availableColors, capitalize } from '../filters/colors'
import { useDispatch, useSelector } from 'react-redux'

const todoSelector = (state, todoId) => {
  return state.todos.find(todo => todo.id === todoId)
}

const TodoListItem = ({  id }) => {
  const todo = useSelector(state => todoSelector(state, id))
  
  const { text, completed, color } = todo
  const dispatch = useDispatch()

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  const onDelete = () => { dispatch({ type: 'todos/todoDeleted', payload: todo.id }) }
  const onColorChange = (value) => { dispatch({ type: 'todos/colorSelected', payload: { todoId: todo.id, color: value } }) }
  const onCompletedChange = () => { dispatch({ type: 'todos/todoToggled', payload: todo.id }) }

  const handleCompletedChanged = (e) => {
     onCompletedChange(e.target.checked)
  }

  const handleColorChanged = (e) => {
    onColorChange(e.target.value)
  }


  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
