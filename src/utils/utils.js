import { AES, enc } from "crypto-js";
import { LOCAL_KEY, MONTHS, NEW_AC } from "./constants";

export function setEcryptedNotesToLS({ Notes, Trash }) {
  const hash = localStorage.getItem(LOCAL_KEY);
  const data = getDecryptedNotesFromLS();

  localStorage.setItem(
    hash,
    AES.encrypt(
      JSON.stringify({
        Notes: Notes ? Notes : data.Notes,
        Trash: Trash ? Trash : data.Trash,
      }),
      hash
    ).toString()
  );

  return true;
}

export function getDecryptedNotesFromLS() {
  const data = AES.decrypt(
    localStorage.getItem(localStorage.getItem(LOCAL_KEY)),
    localStorage.getItem(LOCAL_KEY)
  ).toString(enc.Utf8);

  return data === NEW_AC ? { Notes: [], Trash: [] } : JSON.parse(data);
}

export function generateRandomHexCode() {
  const characters = "0123456789ABCDEF";
  const hex = Array.from(
    { length: 6 },
    () => characters[Math.floor(Math.random() * 16)]
  ).join("");

  return "#" + hex;
}

export function generateDate() {
  return `${
    MONTHS[new Date().getMonth() - 1]
  } ${new Date().getDate()}, ${new Date().getFullYear()}`;
}
