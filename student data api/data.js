const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require(`cors`);
const { boolean } = require('webidl-conversions');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ngtiq:ngtiq12345@ngtiq.q2dcccm.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define Schema and Model
const dataSchema = new mongoose.Schema({
    // title: String,
    // completed: Boolean
    classN: String,
    name: String,
    rollNumber: Number,
    phone: Number,
    email: String,
});
const Data = mongoose.model('Data', dataSchema);

// Routes
app.get('/datas', async (req, res) => {
    const data = await Data.find();
    res.json(data);
});

app.post('/datas', async (req, res) => {
    const data = new Data({
        // title: req.body.title,
        // completed: req.body.completed
        classN: req.body.classN,
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        phone: req.body.phone,
        email: req.body.email
    });
    await data.save();
    res.json(data);
});

app.get('/datas/:id', async (req, res) => {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
});

app.put('/datas/:id', async (req, res) => {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
});

app.delete('/datas/:id', async (req, res) => {
    const data = await Data.findByIdAndDelete(req.params.id);
    res.json(data);
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));