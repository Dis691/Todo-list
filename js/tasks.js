import { saveTodosToLocalStorage } from './storage.js'

export function createTodoItem(todoText, completed = false) {
	const ul = document.getElementById("todo-list")

	const li = document.createElement("li")
	li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center")

	const textContainer = document.createElement("span")
	textContainer.textContent = todoText

	if (completed) {
		textContainer.style.textDecoration = "line-through"
	}

	const buttonContainer = document.createElement("div")
	buttonContainer.classList.add("d-flex", "gap-2")

	const deleteButton = document.createElement("button")
	deleteButton.classList.add("btn", "btn-danger", "btn-sm")
	deleteButton.textContent = "Удалить"

	deleteButton.addEventListener("click", function () {
		li.remove()
		saveTodosToLocalStorage()
	})

	const doneButton = document.createElement("button")
	doneButton.classList.add("btn", "btn-success", "btn-sm")
	doneButton.textContent = "Готово"

	if (completed) {
		doneButton.style.opacity = "0.5"
		deleteButton.style.opacity = "0.5"
		doneButton.disabled = true
		deleteButton.disabled = true
	}

	doneButton.addEventListener("click", function () {
		textContainer.style.textDecoration = "line-through"

		doneButton.style.opacity = "0.5"
		deleteButton.style.opacity = "0.5"

		doneButton.disabled = true
		deleteButton.disabled = true

		saveTodosToLocalStorage()
	})

	buttonContainer.appendChild(doneButton)
	buttonContainer.appendChild(deleteButton)

	li.appendChild(textContainer)
	li.appendChild(buttonContainer)

	ul.appendChild(li)
}