const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require(`cors`);
const { boolean } = require('webidl-conversions');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ngtiq:ngtiq12345@ngtiq.q2dcccm.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define Schema and Model
const studentSchema = new mongoose.Schema({
    // title: String,
    // completed: Boolean
    className: String,
});
const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post('/students', async (req, res) => {
    const student = new Student({
        // title: req.body.title,
        // completed: req.body.completed
        className: req.body.className
    });
    await student.save();
    res.json(student);
});

app.get('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
});

app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
});

app.delete('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.json(student);
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));