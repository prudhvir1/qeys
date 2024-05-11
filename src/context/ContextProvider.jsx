/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";
import { actionType } from "./actions";
import {
  handleAddNotes,
  handleEditNotes,
  handlePermanentlyRemoveAllNotes,
  handlePermanentlyRemoveNotes,
  handleRemoveAllNotes,
  handleRemoveNotes,
  handleRestoreNotes,
} from "../utils/handleEvents";
import { getDecryptedNotesFromLS } from "../utils/utils";

const NotesContext = createContext();

function ContextProvider({ children }) {
  const initialState = { Notes: [], Trash: [] };

  const notesReducer = (state, action) => {
    switch (action.type) {
      case actionType.onInit:
        return getDecryptedNotesFromLS();

      case actionType.addNote:
        return handleAddNotes(action.payload);

      case actionType.editNote:
        return handleEditNotes(action.payload);

      case actionType.removeNote:
        return handleRemoveNotes(action.payload);

      case actionType.permanentlyRemoveNote:
        return handlePermanentlyRemoveNotes(action.payload);

      case actionType.restoreNote:
        return handleRestoreNotes(action.payload);

      case actionType.removeAllNotes:
        return handleRemoveAllNotes(action.payload);

      case actionType.permanentlyRemoveAllNotes:
        return handlePermanentlyRemoveAllNotes(action.payload);

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(notesReducer, initialState);
  const [editNote, setEditNote] = useState({});

  return (
    <NotesContext.Provider
      value={{
        state,
        dispatch,
        editNote,
        setEditNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export const useNotesContext = () => useContext(NotesContext);

export default ContextProvider;
