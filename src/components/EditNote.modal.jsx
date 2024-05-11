/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNotesContext } from "../context/ContextProvider";
import "./styles/EditNote.css";
import { addNotes, editNotes } from "../context/actions";
import {
  IcOutlineCheckCircleOutline,
  PhWarningCircleBold,
  PhXCircleBold,
} from "../utils/icons";
import { useNavigate } from "react-router-dom";

function EditNote() {
  const { dispatch, editNote, setEditNote, setEditModalState } =
    useNotesContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const titleRef = useRef();

  const textRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    editNote.title ? setTitle(editNote.title) : title;
    editNote.text ? setText(editNote.text) : text;
  }, [editNote]);

  function handleTitle() {
    setTitleError(titleRef.current.value.length < 3);
    if (titleRef.current.value.length <= 150) {
      console.log(titleRef.current.value.length < 100);
      setTitle(titleRef.current.value);
    }
  }

  function handleText() {
    setTextError(textRef.current.value.length < 3);
    setText(textRef.current.value);
  }

  function handleSaveNote(e) {
    e.preventDefault();
    if (!titleError && !textError) {
      if (editNote.id) {
        setEditNote((prev) => ({ prev, title, text }));
        dispatch(editNotes({ ...editNote, title, text }));
        navigate("/Notes");
      } else {
        dispatch(addNotes({ title, text }));
        navigate("/Notes");
      }
    }
    setEditModalState(false);
  }

  return (
    <div className="EditNote">
      <div className="EditNote__Background"></div>
      <form className="EditNote__Container">
        <div className="EditNote__Container__Header">
          <div className={`EditNote__Title ${titleError ? "--error" : ""}`}>
            <input
              required
              type="text"
              name="Title"
              value={title}
              placeholder="Title"
              ref={titleRef}
              onChange={handleTitle}
            />
            <div
              className={
                titleError
                  ? "EditNote__Title--error"
                  : "EditNote__Title--noError"
              }
            >
              <p>Minimum 3 characters </p>
              <PhWarningCircleBold />
            </div>
          </div>
          <div className="EditNote__Options">
            <button
              type="submit"
              onClick={handleSaveNote}
              className="text-green-700 hover:text-green-500"
            >
              <IcOutlineCheckCircleOutline />
            </button>
            <button
              type="button"
              onClick={() => navigate("/Notes")}
              className="text-red-700 hover:text-red-600"
            >
              <PhXCircleBold />
            </button>
          </div>
        </div>

        <div className={`EditNote__Text ${textError ? "--error" : ""}`}>
          <textarea
            name="text"
            placeholder="Enter Notes Here..."
            value={text}
            required
            onChange={handleText}
            ref={textRef}
          ></textarea>
          <div
            className={
              textError ? "EditNote__Text--error" : "EditNote__Text--noError"
            }
          >
            <p>Minimum 3 characters</p>
            <PhWarningCircleBold />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
