export const actionType = {
  onInit: "INIT",
  addNote: "ADD_NOTE",
  editNote: "EDIT_NOTE",
  removeNote: "REMOVE_NOTE",
  permanentlyRemoveNote: "PERMANENTLY_REMOVE_NOTE",
  restoreNote: "RESTORE_NOTE",
  removeAllNotes: "REMOVE_ALL_NOTES",
  permanentlyRemoveAllNotes: "PERMANENTLY_REMOVE_ALL_NOTES",
};

export function addNotes(note) {
  return {
    type: actionType.addNote,
    payload: note,
  };
}

export function editNotes(note) {
  return {
    type: actionType.editNote,
    payload: note,
  };
}

export function removeNotes(id) {
  return {
    type: actionType.removeNote,
    payload: id,
  };
}

export function permanentlyRemoveNotes(id) {
  return {
    type: actionType.permanentlyRemoveNote,
    payload: id,
  };
}

export function restoreNotes(note) {
  return {
    type: actionType.restoreNote,
    payload: note,
  };
}

export function removeAllNotes() {
  return {
    type: actionType.removeAllNotes,
  };
}

export function clearAllNotes() {
  return {
    type: actionType.permanentlyRemoveAllNotes,
  };
}
