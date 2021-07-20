// setup de express
const express = require("express");
const app = express();
const tasks = require("./taskAPI.json");

// Get toutes les tâches
app.get("/task", (req, res) => {
	res.status(200).json(tasks);
});

// Get tâche par id
app.get("/task/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const task = tasks.find((task) => task.id === id);
	res.status(200).json(task);
});

// Get tâche non checké (à faire / non complétées)
app.get("/task.todo", (req, res) => {
	console.log("ici");
	const task = tasks.filter((task) => task.checked === false);
	res.status(200).json(task);
});
// Get tâche checkées (faites / complétées)
app.get("/task.done", (req, res) => {
	console.log("ici");
	const task = tasks.filter((task) => task.checked === true);
	res.status(200).json(task);
});

// Ajout d'une tâche
app.post("/task", (req, res) => {
	tasks.push(req.body);
	res.status(200).json(tasks);
});

// Modification d'une tâche
app.patch("/task/:id", (req, res) => {
	const id = parseInt(req.params.id);
	let task = tasks.find((task) => task.id === id);
	(task.title = req.body.title),
		(task.content = req.body.content),
		(task.checked = req.body.checked),
		(task.image = req.body.image),
		res.status(200).json(task);
});

// Suppression d'une tâche
app.delete("/task/:id", (req, res) => {
	const id = parseInt(req.params.id);
	let task = tasks.find((task) => task.id === id);
	tasks.splice(tasks.indexOf(task), 1);
	res.status(200).json(tasks);
});

// Serveur lancé
app.listen(8080, () => {
	console.log("Serveur à l'écoute");
});
