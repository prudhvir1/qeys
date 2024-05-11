import { nanoid } from "nanoid";
import {
  generateDate,
  generateRandomHexCode,
  getDecryptedNotesFromLS,
  setEcryptedNotesToLS,
} from "./utils";
import { LOCAL_KEY } from "./constants";

export function handleAddNotes({ title, text }) {
  const newNote = {
    id: nanoid(),
    title,
    text,
    date: generateDate(),
    color: generateRandomHexCode(),
  };

  const Notes = [...getDecryptedNotesFromLS().Notes, newNote];
  setEcryptedNotesToLS({ Notes });
  return getDecryptedNotesFromLS();
}

export function handleEditNotes(editedNote) {
  const data = getDecryptedNotesFromLS();
  const filteredNotes = data.Notes.filter((note) => note.id !== editedNote.id);

  const updatedNotes = [
    ...filteredNotes,
    { ...editedNote, date: generateDate() },
  ];
  setEcryptedNotesToLS({ Notes: updatedNotes });
  return getDecryptedNotesFromLS();
}

export function handleRemoveNotes(id) {
  const data = getDecryptedNotesFromLS();
  const Notes = data.Notes.filter((note) => note.id !== id);
  const deletedItem = data.Notes.find((note) => note.id === id);
  const Trash = [...data.Trash, deletedItem];
  setEcryptedNotesToLS({ Notes, Trash });
  return getDecryptedNotesFromLS();
}

export function handlePermanentlyRemoveNotes(id) {
  const data = getDecryptedNotesFromLS();
  const updatedTrash = data.Trash.filter((note) => note.id !== id);
  setEcryptedNotesToLS({ Trash: updatedTrash });
  return getDecryptedNotesFromLS();
}

export function handleRestoreNotes(note) {
  const data = getDecryptedNotesFromLS();
  const updatesNotes = [...data.Notes, note];
  const updatedTrash = data.Trash.filter((notes) => notes.id !== note.id);

  setEcryptedNotesToLS({ Notes: updatesNotes, Trash: updatedTrash });
  return getDecryptedNotesFromLS();
}

export function handleRemoveAllNotes() {
  const data = getDecryptedNotesFromLS();
  const Notes = [];
  const Trash = [...data.Trash, ...data.Notes];
  setEcryptedNotesToLS({ Notes, Trash });
  return getDecryptedNotesFromLS();
}

export function handlePermanentlyRemoveAllNotes() {
  const Trash = [];
  setEcryptedNotesToLS({ Trash });
  return getDecryptedNotesFromLS();
}
