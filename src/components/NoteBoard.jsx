/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNotesContext } from "../context/ContextProvider";
import Note from "./Note";
import "./styles/NoteBoard.css";
import { actionType } from "../context/actions";
import { SolarAddSquareOutline } from "../utils/icons";
import { Outlet } from "react-router-dom";

function NoteBoard() {
  const { state, dispatch } = useNotesContext();

  useEffect(() => {
    dispatch({ type: actionType.onInit });
  }, []);

  return (
    <>
      <Outlet />
      <div className="NoteBoard">
        <div className="w-full text-xl font-bold">
          <h1>NOTES</h1>
        </div>
        {state?.Notes.length !== 0 ? (
          state.Notes.map((note) => <Note key={note.id} note={note} />)
        ) : (
          <div className="NoteBoard--Empty">
            <SolarAddSquareOutline />
            <h1>ADD NOTES</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default NoteBoard;
