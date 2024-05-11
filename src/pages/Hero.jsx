/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import bcrypt from "bcryptjs";
import "./styles/Hero.css";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "../context/ContextProvider";
import { actionType } from "../context/actions";
import { AES, enc } from "crypto-js";
import { LOCAL_KEY, NEW_AC } from "../utils/constants";

function Hero() {
  const [name, setName] = useState("");
  const { dispatch, setHash } = useNotesContext();
  const navigate = useNavigate();

  function handleLogin() {
    if (checkUserExists()) {
      navigate("/Notes");
    } else if (checkLocalKeysLength() < 5) {
      const hash = bcrypt.hashSync(name, 10);
      localStorage.setItem(LOCAL_KEY, hash);
      localStorage.setItem(hash, AES.encrypt(NEW_AC, hash).toString());
      navigate("/Notes");
    } else {
      alert("Login & Delete an Account to Continue");
    }

    function checkLocalKeysLength() {
      let localLength = 0;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith("$2a$10$")) {
          localLength++;
        }
      }
      return localLength;
    }

    function checkUserExists() {
      for (let i = 0; i < localStorage.length; i++) {
        const hash = localStorage.key(i);
        const comparison = bcrypt.compareSync(name, hash);
        if (comparison) {
          localStorage.setItem(LOCAL_KEY, hash);
          // setHash(hash);
          dispatch({ type: actionType.onInit });
          return true;
        }
      }
    }
  }

  return (
    <div className="Hero h-full w-full flex flex-col justify-center items-center text-4x">
      <div className="Hero__Container">
        <input
          type="text"
          name="username"
          placeholder="Your Key"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn text-lg font-bold pb-3" onClick={handleLogin}>
          Let's Note
        </button>
      </div>
    </div>
  );
}

export default Hero;
