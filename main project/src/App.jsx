import { Route, Routes, Link } from "react-router-dom";
import Book from "./book";
import Student from "./Student";
import Student_Data from "./Student_Data";
import "./App.css";

function App() {
  return (
    <>
      <div className="nav">
        <Link className="link" to="/book">
          Book
        </Link>
        <Link className="link" to="/student">
          Student
        </Link>
        <Link className="link" to="/data">
          Data
        </Link>
      </div>
      <Routes>
        <Route path="/book" Component={Book} />
        <Route path="/student" Component={Student} />
        <Route path="/data" Component={Student_Data} />
      </Routes>
    </>
  );
}

export default App;

