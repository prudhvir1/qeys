/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./styles/NoteBoard.css";
import { actionType } from "../context/actions";
import { useNotesContext } from "../context/ContextProvider";
import Note from "./Note";

function Trash() {
  const { state, dispatch } = useNotesContext();

  useEffect(() => {
    dispatch({ type: actionType.onInit });
  }, []);

  return (
    <div className="Trash">
      <div className="w-full text-xl font-bold">
        <h1>TRASH</h1>
      </div>
      {state.Trash.length !== 0 ? (
        state.Trash.map((note) => {
          return <Note key={note.id} note={note} />;
        })
      ) : (
        <div className="Trash--Empty">
          <h1>NO TRASH</h1>
        </div>
      )}
    </div>
  );
}

export default Trash;
