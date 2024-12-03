import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from './storage.js'
import { createTodoItem } from './tasks.js'
import { createAppTitle, createTodoItemForm, createTodoList } from './ui.js'

document.addEventListener('DOMContentLoaded', function () {
	const appContainer = document.getElementById('app-container')

	const title = createAppTitle()
	appContainer.appendChild(title)

	const todoForm = createTodoItemForm()
	appContainer.appendChild(todoForm)

	const todoList = createTodoList()
	appContainer.appendChild(todoList)

	const todos = loadTodosFromLocalStorage()
	todos.forEach(todo => createTodoItem(todo.text, todo.completed))

	todoForm.addEventListener('submit', function (event) {
		event.preventDefault()

		const input = todoForm.querySelector('input')
		const todoText = input.value.trim()

		if (todoText) {
			createTodoItem(todoText)
			saveTodosToLocalStorage()
			input.value = ''
		}
	})
})