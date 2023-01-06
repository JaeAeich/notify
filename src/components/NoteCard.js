import React from "react";
import NoteContext from "../context/notes/NoteContext";
import { useState, useContext, useRef } from "react";

function NoteCard(props) {
	const updateNote = props.updateNote;
	const context = useContext(NoteContext);
	const { note, fetchAllNotes, deleteNote } = context;
	const modalBtn = useRef(null);
	const getDate = new Date(props.date);
	const [newNote, setNewNote] = useState({
		title: props.title,
		describe: props.description,
		tag: props.tag,
	});

	// const handleChange = (e) => {};
	// const handleUpdate = () => {};
	const handleChange = (e) => {
		setNewNote({ ...newNote, [e.target.name]: e.target.value });
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		updateNote(props.id, newNote.title, newNote.description, newNote.tag);
	};

	const handleClick = (e) => {
		e.preventDefault();
		// setNewNote(props);
		modalBtn.current.click();
		console.log(props);
	};

	const date = getDate.toLocaleString();
	return (
		<div>
			<>
				{/* Button trigger modal */}
				<button
					ref={modalBtn}
					type="button "
					className="btn btn-primary d-none"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				>
					launches Modal(hidden btn)
				</button>
				{/* Modal */}
				<div
					className="modal fade"
					id="exampleModal"
					tabIndex={-1}
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">
									Modal title
								</h1>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>
							<div className="modal-body">
								{/* form starts here */}

								<form>
									<div className="mb-3">
										<label htmlFor="exampleInputEmail1" className="form-label">
											title
										</label>
										<input
											onChange={handleChange}
											value={newNote.title}
											name="title"
											id="title"
											type="text"
											className="form-control"
											aria-describedby="emailHelp"
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleInputPassword1"
											className="form-label"
										>
											description
										</label>
										<input
											value={newNote.description}
											onChange={handleChange}
											name="description"
											type="text"
											className="form-control"
											id="description"
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleInputPassword1"
											className="form-label"
										>
											tag
										</label>
										<input
											value={newNote.tag}
											onChange={handleChange}
											name="tag"
											type="text"
											className="form-control"
											id="tag"
										/>
									</div>
									<button
										onClick={handleUpdate}
										type="submit"
										className="btn btn-primary"
									>
										Update Note
									</button>
								</form>

								{/* form ends here */}
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="button" className="btn btn-primary">
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
			{/* modal ends here */}
			<div className="card my-3 mx-3 position-relative">
				<span
					style={{ zIndex: "1" }}
					className=" position-absolute top-0 start-100  translate-middle badge rounded-pill bg-danger"
				>
					{props.tag}
				</span>
				<div className="card-body">
					<h2 className="card-title">{props.title}</h2>
					<p className="card-text">{props.description} </p>
					<small>
						<i>Date: {date}</i>
					</small>
					<button
						// ref={ref}
						type="button"
						className="btn btn-primary d-none"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
					></button>
					<div className="d-flex justify-content-between">
						<i className="fa-solid fa-pen" onClick={handleClick}></i>
						<i
							className="fa-solid fa-trash"
							onClick={(e) => {
								e.preventDefault();
								deleteNote(props.id);
							}}
						></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NoteCard;
