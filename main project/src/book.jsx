import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Model from "react-modal";
import "./Book.css";

export default function Book() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [del_page, setDel_page] = useState(false);
  const [deletedId, setDeleteId] = useState("");
  const [_class, setClass] = useState([]);

  const [id, setId] = useState("");
  const [bookname, setBookName] = useState("");
  const [authorname, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [publishdate, setPublishDate] = useState("");
  const [className, setClassName] = useState([]);
  const [_id, set_id] = useState("");

  async function class_view() {
    try {
      const resp = await axios.get(`http://localhost:4000/students`);
      setClass(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function view() {
    try {
      const response = await axios.get(`http://localhost:3000/books`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function add() {
    if (
      id === "" ||
      bookname === "" ||
      authorname === "" ||
      title === "" ||
      writer === "" ||
      publishdate === ""
    ) {
      setIsOpen(false);
      toast.error(" plz fill the data in form!");
    } else {
      setIsOpen(false);
      toast.success("Data Added");
      const payload = {
        id,
        bookname,
        authorname,
        title,
        writer,
        publishdate,
        className,
      };
      const resp = await axios.post(`http://localhost:3000/books`, payload);
      console.log(payload);
      view();
      setId("");
      setId("");
      setBookName("");
      setAuthorName("");
      setTitle("");
      setWriter("");
      setPublishDate("");
      setClassName("");
    }
  }

  function viewUser(id) {
    fetch(`http://localhost:3000/books/${id}`, {
      method: `GET`,
    }).then((res) => {
      res.json().then((resp) => {
        setIsView(true);
        setId(resp.id);
        setBookName(resp.bookname);
        setAuthorName(resp.authorname);
        setTitle(resp.title);
        setWriter(resp.writer);
        setPublishDate(resp.publishdate);
        setClassName(resp.className);
      });
    });
  }

  function u_icon(id) {
    fetch(`http://localhost:3000/books/${id}`, {
      method: `GET`,
    }).then((res) => {
      res.json().then((resp) => {
        setIsUpdate(true);
        setId(resp.id);
        setBookName(resp.bookname);
        setAuthorName(resp.authorname);
        setTitle(resp.title);
        setWriter(resp.writer);
        setPublishDate(resp.publishdate);
        set_id(resp._id);
        setClassName(resp.className);
      });
    });
  }

  function update() {
    const item = {
      id,
      bookname,
      authorname,
      title,
      writer,
      publishdate,
      className,
    };
    fetch(`http://localhost:3000/books/${_id}`, {
      method: `PUT`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => {
      res.json().then((resp) => {
        view();
        toast.success("Update Succesfull");
        setId("");
        setId("");
        setBookName("");
        setAuthorName("");
        setTitle("");
        setWriter("");
        setPublishDate("");
        setClassName("");
      });
    });
    setIsUpdate(false);
  }

  function view_close() {
    setIsView(false);
    setId("");
    setBookName("");
    setAuthorName("");
    setTitle("");
    setWriter("");
    setPublishDate("");
    setIsUpdate(false);
  }

  function d_icon(id) {
    setDel_page(true);
    setDeleteId(id);
  }

  function yes_del() {
    const id = deletedId;
    fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
    }).then((res) => {
      res.json().then((resp) => {
        setDel_page(false);
        view();
      });
    });
    toast.error("Deleted Sucessful");
  }

  useEffect(() => {
    view();
    class_view();
  }, []);

  return (
    <div className="main_book">
      <div className="main_1">
        <Button
          variant="outlined"
          className="btn"
          onClick={() => setIsOpen(true)}
        >
          <AddIcon />
          ADD
        </Button>
      </div>

      <div className="main_2">
        <table border="1px">
          <thead>
            <tr className="heading">
              <th>ID</th>
              <th>BOOK NAME</th>
              <th>AUTHOR NAME</th>
              <th>TITLE</th>
              <th>WRITER</th>
              <th>CLASS NAME</th>
              <th>PUBLISH DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el._id}>
                <th>{el.id}</th>
                <td>{el.bookname}</td>
                <td>{el.authorname}</td>
                <td>{el.title}</td>
                <td>{el.writer}</td>
                <td>{el.className}</td>
                <td>{el.publishdate}</td>
                <td className="icon">
                  <EditNoteIcon
                    className="e_icon"
                    onClick={() => u_icon(el._id)}
                  />
                  <DeleteIcon
                    className="d_icon"
                    onClick={() => d_icon(el._id)}
                  />
                  <RemoveRedEyeIcon
                    className="r_icon"
                    onClick={() => viewUser(el._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <ToastContainer />
        </table>
      </div>

      <Model isOpen={isOpen} className="add_page">
        <h2>Book Create</h2>
        <form action="">
          <div className="inp">
            <label htmlFor="id">ID</label>
            <br />
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="book_name">BOOK NAME</label>
            <br />
            <input
              type="text"
              id="book_name"
              value={bookname}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="author_name">AUTHOR NAME</label>
            <br />
            <input
              type="text"
              id="author_name"
              value={authorname}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="title">TITLE</label>
            <br />
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="writer">WRITER</label>
            <br />
            <input
              type="text"
              id="writer"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>

          <div className="inp">
            <label>CLASS</label>
            <br />
            <select
              className="inp"
              onChange={(el) => setClassName(el.target.value)}
            >
              <option>Select</option>
              {_class.map((el) => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select>
          </div>

          <div className="inp">
            <label htmlFor="publish_date">PUBLISH DATE</label>
            <br />
            <input
              type="date"
              id="publish_date"
              value={publishdate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </div>

          <div>
            <button onClick={add} className="add">
              Add
            </button>
            <button onClick={() => setIsOpen(false)} className="close">
              Close
            </button>
          </div>
        </form>
      </Model>

      <Model isOpen={isView} className="view_page">
        <h2>index {id} full details</h2>
        <form action="">
          <div className="inp_view inp">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" value={id} readOnly />
          </div>

          <div className="inp_view inp">
            <label htmlFor="book_name">BOOK NAME</label>
            <input type="text" id="book_name" value={bookname} readOnly />
          </div>

          <div className="inp_view inp">
            <label htmlFor="author_name">AUTHOR NAME</label>
            <input type="text" id="author_name" value={authorname} readOnly />
          </div>

          <div className="inp_view inp">
            <label htmlFor="title">TITLE</label>
            <input type="text" id="title" value={title} readOnly />
          </div>

          <div className="inp_view inp">
            <label htmlFor="writer">WRITER</label>
            <input type="text" id="writer" value={writer} readOnly />
          </div>

          <div className="inp">
            <label htmlFor="writer">CLASS</label>
            <br />
            <input type="text" id="writer" value={className} readOnly />
          </div>

          <div className="inp_view inp">
            <label htmlFor="publish_date">PUBLISH DATE</label>
            <input type="text" id="publish_date" value={publishdate} readOnly />
          </div>

          <div>
            <button onClick={view_close} className="close">
              Close
            </button>
          </div>
        </form>
      </Model>

      <Model isOpen={isUpdate} className="add_page">
        <h2>Book Update</h2>
        <form action="">
          <div className="inp">
            <label htmlFor="id">ID</label>
            <br />
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="book_name">BOOK NAME</label>
            <br />
            <input
              type="text"
              id="book_name"
              value={bookname}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="author_name">AUTHOR NAME</label>
            <br />
            <input
              type="text"
              id="author_name"
              value={authorname}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="title">TITLE</label>
            <br />
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="inp">
            <label htmlFor="writer">WRITER</label>
            <br />
            <input
              type="text"
              id="writer"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>

          <div className="inp">
            <label>CLASS</label>
            <br />
            <select
              className="inp"
              onChange={(el) => setClassName(el.target.value)}
            >
            <option>{className}</option>
              {_class.map((el) => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select>
          </div>

          <div className="inp">
            <label htmlFor="publish_date">PUBLISH DATE</label>
            <br />
            <input
              type="date"
              id="publish_date"
              value={publishdate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </div>

          <div>
            <button onClick={update} className="add">
              UPDATE
            </button>
            <button onClick={view_close} className="close">
              Close
            </button>
          </div>
        </form>
      </Model>

      <Model isOpen={del_page} className="del_page">
        <h1>Are you sure ?</h1>
        <div className="del_btn">
          {/* Call yes_del without passing any parameter */}
          <button onClick={yes_del}>yes</button>
          <button onClick={() => setDel_page(false)}>no</button>
        </div>
      </Model>
    </div>
  );
}
