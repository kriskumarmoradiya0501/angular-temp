const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mca010DB');

mongoose.connection.on('connected', () => {
    console.log("MongoDB Connected");
});

// Schema
const itemSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    dob: String,
    stream: String,
    english: Number,
    gujarati: Number,
    hindi: Number,
    hobbies: [String],
    total: Number,
percentage: String,
grade: String
});

const itemModel = mongoose.model('item', itemSchema);

// Routes

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/view.html");
});

// READ
app.get('/api/items', (req, res) => {
    itemModel.find().then(data => res.send(data));
});

// ADD
app.post('/api/addItem', (req, res) => {
    itemModel.create(req.body).then(() => {
        res.json({msg: "Added"});
    });
});

// DELETE
app.delete('/api/deleteItem/:id', (req, res) => {
    itemModel.deleteOne({_id: req.params.id}).then(() => {
        res.json({msg: "Deleted"});
    });
});

// UPDATE
app.put('/api/updateItem/:id', (req, res) => {
    itemModel.updateOne({_id: req.params.id}, req.body).then(() => {
        res.json({msg: "Updated"});
    });
});

app.listen(4000, () => {
    console.log("http://localhost:4000");
});
