import { NavLink, useNavigate } from "react-router-dom";
import { useNotesContext } from "../context/ContextProvider";
import {
  SolarAddSquareOutline,
  SolarLoginOutline,
  SolarNotesOutline,
  SolarTrashBinTrashOutline,
} from "../utils/icons";
import "./styles/Sidebar.css";
import { LOCAL_KEY } from "../utils/constants";

function Sidebar() {
  const { setEditNote } = useNotesContext();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(LOCAL_KEY);
    navigate("/Login");
  }

  return (
    <div className="Sidebar">
      <div className="Sidebar__MainMenu">
        <NavLink to="/Notes/Edit/New" className="Sidebar__AddBtn">
          <button
            onClick={() => {
              setEditNote({});
            }}
          >
            <SolarAddSquareOutline />
          </button>
        </NavLink>

        <NavLink
          to="/Notes"
          className={({ isActive }) => (isActive ? "--active" : "")}
        >
          <button className="btn1">
            <SolarNotesOutline />
          </button>
        </NavLink>
        <NavLink
          to="/Trash"
          className={({ isActive }) => (isActive ? "--active" : "")}
        >
          <button className="btn2">
            <SolarTrashBinTrashOutline />
          </button>
        </NavLink>
      </div>
      <div className="Sidebar__Profile">
        <button onClick={handleLogout}>
          <SolarLoginOutline />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
