const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require(`cors`);
const { boolean } = require('webidl-conversions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ngtiq:ngtiq12345@ngtiq.q2dcccm.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define Schema and Model
const bookSchema = new mongoose.Schema({
    // title: String,
    // completed: Boolean
    id: Number,
    bookname: String,
    authorname: String,
    title: String,
    writer: String,
    publishdate: String,
    className: String
});
const Book = mongoose.model('Book', bookSchema);

// Routes
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.post('/books', async (req, res) => {
    const book = new Book({
        // title: req.body.title,
        // completed: req.body.completed
        id: req.body.id,
        bookname: req.body.bookname,
        authorname: req.body.authorname,
        title: req.body.title,
        writer: req.body.writer,
        publishdate: req.body.publishdate,
        isactive: req.body.isactive,
        className: req.body.className
    });
    await book.save();
    res.json(book);
});

app.get('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
});

app.put('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
});

app.delete('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.json(book);
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));