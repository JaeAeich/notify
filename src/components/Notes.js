import React, { useContext, useEffect } from "react";
import NoteCard from "./NoteCard";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";

function Notes() {
	const context = useContext(NoteContext);
	const { note, fetchAllNotes, updateNote } = context;
	useEffect(() => {
		fetchAllNotes();
	}, []);

	return (
		<>
			<AddNote />
			<div className="row">
				{note.reverse().map((note) => (
					<div className="col-4" key={note._id}>
						<NoteCard
							updateNote={updateNote}
							id={note._id}
							title={note.title}
							description={note.description}
							tag={note.tag}
							date={note.date}
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default Notes;
