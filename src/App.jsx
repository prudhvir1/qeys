import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, Hero } from "./pages";
import { EditNote, NoteBoard, ShareNote, Trash, ViewNote } from "./components";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Hero />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="Notes" element={<NoteBoard />}>
              <Route path=":id" element={<ViewNote />} />
              <Route path="Edit/:id" element={<EditNote />} />
              <Route path="Share/:id" element={<ShareNote />} />
            </Route>
            <Route path="Trash" element={<Trash />} />
            <Route path="Trash/:id" element={<ViewNote />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
