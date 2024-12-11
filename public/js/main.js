import { createTodoItem } from './tasks.js'
import { createAppTitle, createTodoItemForm, createTodoList } from './ui.js'

document.addEventListener('DOMContentLoaded', function () {
	const appContainer = document.getElementById('app-container')

	// Добавляем заголовок
	const title = createAppTitle()
	appContainer.appendChild(title)

	// Создаем форму для добавления задач
	const todoForm = createTodoItemForm()
	appContainer.appendChild(todoForm)

	// Создаем список для отображения задач
	const todoList = createTodoList()
	appContainer.appendChild(todoList)

	// Загружаем задачи из базы данных
	loadTodosFromDatabase()

	// Обработчик добавления новой задачи
	todoForm.addEventListener('submit', function (event) {
		event.preventDefault()

		const input = todoForm.querySelector('input')
		const todoText = input.value.trim()

		if (todoText) {
			// Отправляем новую задачу на сервер
			fetch('/api/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: todoText })
			})
				.then(response => response.json())
				.then(todo => {
					// Создаем задачу на основе ответа от сервера
					createTodoItem(todo.title, todo.completed)
				})
				.catch(error => console.error('Ошибка добавления задачи:', error))

			// Очищаем поле ввода
			input.value = ''
		}
	})
})

// Загрузка задач с базы данных и отображение их на странице
function loadTodosFromDatabase() {
	fetch('/api/todos')
		.then(response => response.json())
		.then(todos => {
			todos.forEach(todo => {
				// Создаем каждый элемент задачи
				createTodoItem(todo.title, todo.completed)
			})
		})
		.catch(error => console.error('Ошибка загрузки задач:', error))
}
