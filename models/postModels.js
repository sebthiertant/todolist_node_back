const mongoose = require("mongoose");

const PostsModel = mongoose.model(
	"todo_list",
	{
		id: {
			type: Number,
			require: true,
		},
		title: {
			type: String,
			require: true,
		},
		content: {
			type: String,
			require: true,
		},
		image: {
			type: String,
			require: false,
		},
		checked: {
			type: Boolean,
			require: true,
			default: false,
		},
	},
	"tasks"
);

module.exports = { PostsModel };
