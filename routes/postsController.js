const express = require("express");
const router = express.Router();
const ObjectID = require("mongoose").Types.ObjectId;

const { PostsModel } = require("../models/postModels");

// Requête pour afficher l'ensemble des tâches
router.get("/", (req, res) => {
	PostsModel.find((err, data) => {
		if (!err) res.send(data);
		else console.log("Error to get data :" + err);
	});
});

// Poster une nouvelle tâche
router.post("/", (req, res) => {
	const newTask = new PostsModel({
		title: req.body.title,
		content: req.body.content,
	});

	newTask.save((err, data) => {
		if (!err) res.send(data);
		else console.log("Error creating new data" + err);
	});
});

// Modification d'une tâche
router.put("/:id", (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	const updateTask = {
		title: req.body.title,
		content: req.body.content,
		checked: req.body.checked,
	};

	PostsModel.findByIdAndUpdate(
		req.params.id,
		{ $set: updateTask },
		{ new: true },
		(err, data) => {
			if (!err) res.send(data);
			else console.log("Update failed : " + err);
		}
	);
});

// Suppression d'une tâche
router.delete("/:id", (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	PostsModel.findByIdAndRemove(req.params.id, (err, data) => {
		if (!err) res.send(data);
		else console.log("Error on delete : " + err);
	});
});

// Suppression de toutes les tâches
router.delete("/", (req, res) => {
	PostsModel.deleteMany((err, data) => {
		if (!err) res.send(data);
		else console.log("Error on delete : " + err);
	});
});

module.exports = router;
