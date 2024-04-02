import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Data.css";

export default function Student_Data() {
  const [className, setClassName] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [rmvId, setRmvId] = useState("");

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [classN, setClassN] = useState([]);
  const [id, setId] = useState("");

  //Class View
  async function class_view() {
    try {
      const resp = await axios.get(`http://localhost:4000/students`);
      setClassName(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  //View All Student
  async function view() {
    try {
      const resp = await axios.get(`http://localhost:5000/datas`);
      setData(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  //View perticular student
  async function view_icon(id) {
    setViewOpen(true);
    const resp = await axios.get(`http://localhost:5000/datas/${id}`);
    setName(resp.data.name);
    setRollNumber(resp.data.rollNumber);
    setPhone(resp.data.phone);
    setEmail(resp.data.email);
    setClassN(resp.data.classN);
  }
  function viewClose() {
    setUpdateOpen(false);
    setViewOpen(false);
    setAddOpen(false);
    setName("");
    setRollNumber("");
    setPhone("");
    setEmail("");
    setClassN("");
  }

  //Add Function
  async function add() {
    setAddOpen(false);
    const payLoad = {
      name,
      rollNumber,
      phone,
      email,
      classN,
    };
    try {
      const resp = await axios.post(`http://localhost:5000/datas`, payLoad);
      view();
      setName("");
      setEmail("");
      setPhone("");
      setRollNumber("");
      setClassN("");
    } catch (err) {
      console.log(err);
    }
  }

  //Delete Function
  function remove(id) {
    setRmvId(id);
    setDelOpen(true);
  }
  async function remDel() {
    const resp = await axios.delete(`http://localhost:5000/datas/${rmvId}`);
    view();
    setDelOpen(false);
    setRmvId("");
  }

  // Update Function
  async function edit_icon(id) {
    setUpdateOpen(true);
    const resp = await axios.get(`http://localhost:5000/datas/${id}`);
    setName(resp.data.name);
    setRollNumber(resp.data.rollNumber);
    setPhone(resp.data.phone);
    setEmail(resp.data.email);
    setClassN(resp.data.classN);
    setId(resp.data._id);
  }
  async function update() {
    const payLoad = {
      name,
      rollNumber,
      phone,
      email,
      classN,
      id,
    };
    setUpdateOpen(false);
    const resp = await axios.put(`http://localhost:5000/datas/${id}`, payLoad);
    view();
    setName("");
    setRollNumber("");
    setPhone("");
    setEmail("");
    setClassN("");
  }

  useEffect(() => {
    class_view();
    view();
  }, []);

  return (
    <div className="main">
      <div className="btn">
        <Button variant="outlined" onClick={() => setAddOpen(true)}>
          <AddIcon />
          Add
        </Button>
      </div>
      <div className="two">
        <table className="table" border="1px">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el._id}>
                <td>{el.name}</td>
                <td>{el.rollNumber}</td>
                <td>{el.phone}</td>
                <td>{el.email}</td>
                <td>{el.classN}</td>
                <td>
                  <button
                    className="act btn_del"
                    onClick={() => remove(el._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="act btn_edit"
                    onClick={() => edit_icon(el._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="act btn_view"
                    onClick={() => view_icon(el._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={addOpen} className="data_add">
        <CloseIcon className="cross_icon" onClick={viewClose} />
        <Form>
          <FormGroup>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(el) => setName(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="rollnumber"
              name="roolnumber"
              placeholder="Roll Number"
              type="text"
              value={rollNumber}
              onChange={(el) => setRollNumber(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="number"
              name="number"
              placeholder="Phone Number"
              type="text"
              value={phone}
              onChange={(el) => setPhone(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(el) => setEmail(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              bsSize="sm"
              className="mb-3"
              type="select"
              onChange={(el) => setClassN(el.target.value)}
            >
              <option>Select</option>
              {className.map((el) => (
                <option value={el.className}>{el.className}</option>
              ))}
            </Input>
          </FormGroup>{" "}
          <Button variant="outlined" onClick={add}>
            Submit
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={viewOpen} className="data_add">
        <CloseIcon className="cross_icon" onClick={viewClose} />
        <Form>
          <FormGroup>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              value={name}
              readOnly
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="rollnumber"
              name="roolnumber"
              placeholder="Roll Number"
              type="text"
              value={rollNumber}
              readOnly
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="number"
              name="number"
              placeholder="Phone Number"
              type="text"
              value={phone}
              readOnly
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              readOnly
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Class"
              type="email"
              value={classN}
              readOnly
            />
          </FormGroup>{" "}
        </Form>
      </Modal>

      <Modal isOpen={updateOpen} className="data_add">
        <CloseIcon className="cross_icon" onClick={viewClose} />
        <Form>
          <FormGroup>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(el) => setName(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="rollnumber"
              name="roolnumber"
              placeholder="Roll Number"
              type="text"
              value={rollNumber}
              onChange={(el) => setRollNumber(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="number"
              name="number"
              placeholder="Phone Number"
              type="text"
              value={phone}
              onChange={(el) => setPhone(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(el) => setEmail(el.target.value)}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Input
              bsSize="sm"
              className="mb-3"
              type="select"
              onChange={(el) => setClassN(el.target.value)}
            >
              <option>{classN}</option>
              {className.map((el) => (
                <option value={el.className}>{el.className}</option>
              ))}
            </Input>
          </FormGroup>{" "}
          <Button variant="outlined" onClick={update}>
            Update
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={delOpen}>
        <ModalHeader>Are you sure ?</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={remDel}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={() => setDelOpen(false)}>
            close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
