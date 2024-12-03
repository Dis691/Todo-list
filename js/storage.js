import { createTodoItem } from './tasks.js'

export function saveTodosToLocalStorage() {
	const ul = document.getElementById("todo-list")

	const todos = Array.from(ul.children).map(li => {
		const text = li.querySelector("span").textContent

		const isCompleted = li.querySelector("span").style.textDecoration === "line-through"

		return { text, completed: isCompleted }
	})

	localStorage.setItem("todos", JSON.stringify(todos))
}

export function loadTodosFromLocalStorage() {
	const todos = JSON.parse(localStorage.getItem("todos")) || [
		{ text: "Первое дело", completed: false },
		{ text: "Второе дело", completed: false },
		{ text: "Третье дело", completed: false }
	]

	todos.forEach(todo => createTodoItem(todo.text, todo.completed))
}