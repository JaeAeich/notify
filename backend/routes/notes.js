const express = require("express");
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");
const router = express.Router();
//express validator is used to validate the inputs in the response field
const { body, validationResult } = require("express-validator");

//fetch all notes  (login required)
router.get("/fetchNotes", fetchUser, async (req, res) => {
	const notes = await Notes.find({ user: req.userData._id });
	if (notes.length) {
		res.send(notes);
	} else {
		res.send("No notes found :(");
	}
});

//add note  (login required)
router.post(
	"/addNote",
	fetchUser,
	[
		// username must be an email
		body("title", "enter a longer title").isLength({ min: 3 }),
		// password must be at least 5 chars long
		body("description", "enter a longer desc").isLength({ min: 5 }),
	],
	async (req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const newNote = await new Notes({
				user: req.userData.id,
				title: req.body.title,
				description: req.body.description,
				tag: req.body.tag,
			});
			console.log(newNote._id, newNote.user);
			const savedNote = await newNote.save();
			res.send(savedNote);
		} catch (e) {
			console.log(e);
			res.send("some error occured!");
		}
	}
);

//update note  (login required)
router.put("/updateNote/:id", fetchUser, async (req, res) => {
	const { title, description, tag } = req.body;
	//create a new note
	const newNote = {};
	if (title) {
		newNote.title = title;
	}
	if (description) {
		newNote.description = description;
	}
	if (tag) {
		newNote.tag = tag;
	}

	let note = await Notes.findById(req.params.id);
	console.log(req.userData._id.toString());
	if (note.user.toString() !== req.userData._id.toString()) {
		return res.status(404).json({ error: "not allowed" });
	}
	if (!note) {
		return res.status(401).json({ error: "not found" });
	}

	note = await Notes.findByIdAndUpdate(
		req.params.id,
		{ $set: newNote },
		{ new: true }
	);
	res.send(note);
});

//update note  (login required)
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
	try {
		//find the note to be deleted
		let note = await Notes.findById(req.params.id);
		console.log(note);
		//if no such note exist say not found
		if (!note) {
			return res.status(401).json({ error: "note not found" });
		}
		//if user from who is logged in is not the same as the note owner then dont allow to delete.
		if (note.user.toString() !== req.userData._id.toString()) {
			return res.status(404).json({ error: "not allowed" });
		}

		note = await Notes.findByIdAndDelete(req.params.id);
		res.send({ success: "note deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).send("some error occured");
	}
});

module.exports = router;
