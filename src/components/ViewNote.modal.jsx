import { useNavigate } from "react-router-dom";
import { useNotesContext } from "../context/ContextProvider";
import {
  MdiDeleteForeverOutline,
  MdiRestore,
  SolarPenNewSquareOutline,
  SolarRoundAltArrowLeftOutline,
  SolarShareOutline,
  SolarTrashBinTrashOutline,
} from "../utils/icons";
import "./styles/ViewNote.css";
import {
  permanentlyRemoveNotes,
  removeNotes,
  restoreNotes,
} from "../context/actions";

/* eslint-disable react/prop-types */
function ViewNote() {
  const { editNote: note, dispatch } = useNotesContext();
  const navigate = useNavigate();

  function handleEditNote() {
    navigate(`/Notes/Edit/${note.id}`, { replace: true });
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
    navigate(`/Notes/Share/${note.id}`);
  }

  return (
    <div className="ViewNote">
      <div
        className="ViewNote__Background"
        onClick={() =>
          location.pathname.includes("Notes")
            ? navigate("/Notes")
            : navigate("/Trash")
        }
        style={{
          backgroundImage: `linear-gradient(225deg, ${note.color}00, ${note.color}30  )`,
        }}
      ></div>
      <div className="ViewNote__Container">
        <div
          className="ViewNote__Container__Main"
          style={{
            backgroundImage: `linear-gradient(225deg, ${note.color}, ${note.color}44)`,
          }}
        >
          <div className="ViewNote__Header">
            <div
              className="ViewNote__Header__Back"
              onClick={() =>
                location.pathname.includes("Notes")
                  ? navigate("/Notes")
                  : navigate("/Trash")
              }
            >
              <SolarRoundAltArrowLeftOutline />
            </div>
            <div className="ViewNote__Header__Title">
              <h2>{note.title}</h2>
            </div>
          </div>
          <div className="ViewNote__Main">
            <div className="ViewNote__Main__Content">
              <p>{note?.text}</p>
            </div>
          </div>
        </div>
        <div className="ViewNote__Container__Menu">
          {location.pathname.includes("Notes") ? (
            <div className="ViewNote__Menu">
              <button className="ViewNote__Menu--btn" onClick={handleEditNote}>
                <SolarPenNewSquareOutline />
              </button>
              <button className="ViewNote__Menu--btn" onClick={handleShareNote}>
                <SolarShareOutline />
              </button>
              <button
                className="ViewNote__Menu--btn"
                onClick={handleNoteDelete}
              >
                <SolarTrashBinTrashOutline />
              </button>
            </div>
          ) : (
            <div className="ViewNote__Menu">
              <button className="ViewNote__Menu--btn" onClick={handleRestore}>
                <MdiRestore />
              </button>
              <button
                className="ViewNote__Menu--btn"
                onClick={handlePermanentlyDelete}
              >
                <MdiDeleteForeverOutline />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
