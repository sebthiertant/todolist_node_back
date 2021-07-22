// setup de express et des packages
const express = require("express");
const app = express();
const tasks = require("./models/taskAPI.json");
const postsRoute = require("./routes/postsController");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("./models/dbConfig");

// Middlewares
mongoose.set("useFindAndModify", false);
app.use(bodyParser.json());
// Ouvre les portes de l'API permettant un appel de n'importe quelle source
app.use(cors());

app.use("/tasks", postsRoute);

// Serveur lancé
app.listen(5500, () => {
	console.log("Serveur à l'écoute");
});
