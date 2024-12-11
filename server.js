const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1331',
	database: 'todolist'
})

db.connect((err) => {
	if (err) {
		console.error('Ошибка подключения к базе данных: ' + err.stack)
		return
	}
	console.log('Подключено к базе данных MySQL как id ' + db.threadId)
})

app.get('/api/todos', (req, res) => {
	db.query('SELECT * FROM todos', (err, results) => {
		if (err) {
			return res.status(500).json({ error: 'Ошибка при запросе к базе данных' })
		}
		res.json(results)
	})
})

app.post('/api/todos', (req, res) => {
	const { title, description } = req.body
	db.query('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description], (err, results) => {
		if (err) {
			return res.status(500).json({ error: 'Ошибка при добавлении задачи' })
		}
		res.status(201).json({ id: results.insertId, title, description })
	})
})

app.put('/api/todos/:id', (req, res) => {
	const { id } = req.params
	const { title, description } = req.body
	db.query('UPDATE todos SET title = ?, description = ? WHERE id = ?', [title, description, id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: 'Ошибка при обновлении задачи' })
		}
		res.json({ id, title, description })
	})
})

app.delete('/api/todos/:id', (req, res) => {
	const { id } = req.params
	db.query('DELETE FROM todos WHERE id = ?', [id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: 'Ошибка при удалении задачи' })
		}
		res.status(204).send()
	})
})

app.listen(port, () => {
	console.log(`Сервер работает на порту ${port}`)
})