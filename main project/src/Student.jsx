import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Student.css";

export default function Student() {
  const [className, setClassName] = useState("");

  async function add() {
    if (className === "") {
      toast.error("empty");
    } else {
      const item = { className };
      const resp = await axios.post(`http://localhost:4000/students`, item);
      setClassName("");
      toast.success("class added");
    }
  }

  return (
    <div className="student_main">
      <div className="form">
        <label>Class Name</label>
        <input
          type="text"
          placeholder="ClassName"
          onChange={(e) => setClassName(e.target.value)}
          value={className}
        />
        <br />
        <button onClick={add}>Submit</button>
      </div>
      <ToastContainer />
    </div>
  );
}
