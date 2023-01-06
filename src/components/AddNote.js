import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
	const context = useContext(NoteContext);
	const { addNote, fetchAllNotes } = context;

	const [note, setNote] = useState({ title: "", description: "", tag: "" });

	const handleChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		fetchAllNotes();
		setNote({ title: "", description: "", tag: "" });
	};

	return (
		<>
			<form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						title
					</label>
					<input
						onChange={handleChange}
						value={note.title}
						name="title"
						id="title"
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						description
					</label>
					<input
						value={note.description}
						onChange={handleChange}
						name="description"
						type="text"
						className="form-control"
						id="description"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						tag
					</label>
					<input
						value={note.tag}
						onChange={handleChange}
						name="tag"
						type="text"
						className="form-control"
						id="tag"
					/>
				</div>
				<button onClick={handleClick} type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</>
	);
}

export default AddNote;
