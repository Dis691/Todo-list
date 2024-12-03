import { saveTodosToLocalStorage } from './storage.js'
import { createTodoItem } from './tasks.js'

export function createAppTitle() {
	const header = document.createElement("h1")
	header.textContent = "Список дел"
	header.classList.add("my-4", "text-center")

	return header
}

export function createTodoList() {
	const ul = document.createElement("ul")
	ul.classList.add("list-group", "my-4")
	ul.id = "todo-list"

	return ul
}

export function createTodoItemForm() {
	const form = document.createElement("form")
	form.classList.add("input-group", "mb-3")

	const input = document.createElement("input")
	input.classList.add("form-control")
	input.placeholder = "Введите название"
	input.id = "input-id"

	const buttonContainer = document.createElement("div")
	buttonContainer.classList.add("input-group-append")

	const button = document.createElement("button")
	button.classList.add("btn", "btn-primary")
	button.textContent = "Добавить дело"

	button.addEventListener("click", function (event) {
		event.preventDefault()

		const todoText = input.value.trim()

		if (todoText) {
			createTodoItem(todoText)
			saveTodosToLocalStorage()
			input.value = ''
		}
	})

	buttonContainer.appendChild(button)

	form.appendChild(input)
	form.appendChild(buttonContainer)

	return form
}