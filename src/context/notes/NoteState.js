import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
	const host = "http://localhost:5000";
	const notes = [];
	const [note, setNote] = useState(notes);

	const fetchAllNotes = async () => {
		// api call
		const response = await fetch(`${host}/api/notes/fetchNotes`, {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				authtoken:
					"eyJhbGciOiJIUzI1NiJ9.NjNiM2U1YWEwZTk3MTYzMzlkZDVlZjE4.TGSZSTwZsSxfyzsiCGLfktrrNR92qk9xluzTEaKyExM",
			},
		});
		const fetchedNotes = await response.json();
		setNote(fetchedNotes);
		// console.log(fetchedNotes);
	};

	//add note
	const addNote = async (title, description, tag) => {
		// *API call to add note to server [TODO]*

		//api call
		const response = await fetch(`${host}/api/notes/addNote`, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				authtoken:
					"eyJhbGciOiJIUzI1NiJ9.NjNiM2U1YWEwZTk3MTYzMzlkZDVlZjE4.TGSZSTwZsSxfyzsiCGLfktrrNR92qk9xluzTEaKyExM",
			},
			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});
		const jsonMessage = await response.json(); // parses JSON response into native JavaScript objects
		fetchAllNotes();
	};

	//delete note
	const deleteNote = async (id) => {
		// *API call to delete note from server [TODO]*
		//api call
		const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
			method: "DELETE", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				authtoken:
					"eyJhbGciOiJIUzI1NiJ9.NjNiM2U1YWEwZTk3MTYzMzlkZDVlZjE4.TGSZSTwZsSxfyzsiCGLfktrrNR92qk9xluzTEaKyExM",
			},
		});
		const newNote = note.filter((n) => {
			return n._id !== id;
		});
		setNote(newNote);
	};

	//update note
	const updateNote = async (id, title, description, tag) => {
		// *API call to update note to server [TODO]*
		console.log(id);
		//api call
		const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				authtoken:
					"eyJhbGciOiJIUzI1NiJ9.NjNiM2U1YWEwZTk3MTYzMzlkZDVlZjE4.TGSZSTwZsSxfyzsiCGLfktrrNR92qk9xluzTEaKyExM",
			},
			body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
		});
		const jsonMessage = response.json(); // parses JSON response into native JavaScript objects
		for (let index = 0; index < note.length; index++) {
			const tempNote = note[index];
			if (tempNote._id === id) {
				tempNote.title = title;
				tempNote.description = description;
				tempNote.tag = tag;
				setNote(note);
				break;
			}
		}
		fetchAllNotes();
	};

	const state = { note, addNote, deleteNote, updateNote, fetchAllNotes };
	return (
		<NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
	);
};

export default NoteState;
