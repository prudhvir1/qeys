/* eslint-disable react/prop-types */
import "./styles/Note.css";
import {
  MdiDeleteForeverOutline,
  MdiRestore,
  SolarPenNewSquareOutline,
  SolarShareOutline,
  SolarTrashBinTrashOutline,
} from "../utils/icons";
import { useNotesContext } from "../context/ContextProvider";
import {
  permanentlyRemoveNotes,
  removeNotes,
  restoreNotes,
} from "../context/actions";
import { useLocation, useNavigate } from "react-router-dom";

function Note({ note }) {
  const { dispatch, setEditNote } = useNotesContext();

  const location = useLocation();
  const navigate = useNavigate();

  function handleViewNote() {
    setEditNote(note);
    location.pathname !== "/Trash"
      ? navigate(`/Notes/${note.id}`)
      : navigate(`/Trash/${note.id}`);
  }

  function handleEditNote() {
    setEditNote(note);
    navigate(`/Notes/Edit/${note.id}`);
  }

  function handleNoteDelete() {
    dispatch(removeNotes(note.id));
  }

  function handleRestore() {
    dispatch(restoreNotes(note));
  }

  function handlePermanentlyDelete() {
    dispatch(permanentlyRemoveNotes(note.id));
  }

  function handleShareNote() {
    setEditNote(note);
    navigate(`/Notes/Share/${note.id}`);
  }

  return (
    <div
      className="NoteContainer"
      style={{
        backgroundImage: `linear-gradient(225deg, ${note.color}, ${note.color}44)`,
      }}
    >
      <div className="NoteContainer__Header">
        <div className="NoteContainer__Header__Title">
          <h2>{note.title}</h2>
        </div>
        <div className="NoteContainer__Header__Date">
          <p>{note.date.toUpperCase().split(",")[0]}</p>
        </div>
      </div>
      <div
        className="NoteContainer__Main cursor-pointer"
        onClick={handleViewNote}
      >
        <p>{note.text}</p>
        {note.text?.length > 55 && (
          <button>
            <em>...read more</em>
          </button>
        )}
      </div>
      <div className="NoteContainer__Footer">
        {location.pathname !== "/Trash" ? (
          <div className="NoteContainer__Footer__btns">
            <button
              className="NoteContainer__Footer__btn1"
              onClick={handleEditNote}
            >
              <SolarPenNewSquareOutline />
            </button>
            <button
              className="NoteContainer__Footer__btn2"
              onClick={handleShareNote}
            >
              <SolarShareOutline />
            </button>
            <button
              className="NoteContainer__Footer__btn3"
              onClick={handleNoteDelete}
            >
              <SolarTrashBinTrashOutline />
            </button>
          </div>
        ) : (
          <div className="NoteContainer__Footer__btns">
            <button
              className="NoteContainer__Footer__btn1"
              onClick={handleRestore}
            >
              <MdiRestore />
            </button>
            <button
              className="NoteContainer__Footer__btn2"
              onClick={handlePermanentlyDelete}
            >
              <MdiDeleteForeverOutline />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Note;
