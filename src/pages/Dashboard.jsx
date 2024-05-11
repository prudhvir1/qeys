import { Outlet, useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";
import { useNotesContext } from "../context/ContextProvider";
import { EditNote, Header, ShareNote, Sidebar, ViewNote } from "../components";
import { useEffect } from "react";
import { editNotes } from "../context/actions";

function Dashboard() {
  const { editModalState, editNotes, shareModalState } = useNotesContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!editNotes) {
      navigate("/Notes", { replace: true });
    }
  }, []);
  return (
    <div className="Dashboard">
      <Header />
      <div className="Dashboard__Content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
