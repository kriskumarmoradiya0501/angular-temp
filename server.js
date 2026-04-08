const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve all files from same folder

let tasks = [
    {taskID: 'Task1', taskName: 'Submit Assignment', status: 'Started'},
    {taskID: 'Task2', taskName: 'Set Question Paper', status: 'In Progress'}
];

// Load HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/view.html");
});

// Read tasks
app.get('/api/taskData', (req, res) => {
    res.json(tasks);
});

// Add task
app.post('/api/addTask', (req, res) => {
    tasks.push(req.body);
    res.json({message: 'Task Added'});
});

// Delete task
app.delete('/api/deleteTask/:id', (req, res) => {
    let index = tasks.findIndex(t => t.taskID == req.params.id);
    if (index !== -1) {
        tasks.splice(index, 1);
        res.json({message: 'Task Deleted'});
    } else {
        res.status(404).json({message: 'Task Not Found'});
    }
});

// Update task
app.put('/api/updateTask/:id', (req, res) => {
    let index = tasks.findIndex(t => t.taskID == req.params.id);
    if (index !== -1) {
        tasks[index] = req.body;
        res.json({message: 'Task Updated'});
    } else {
        res.status(404).json({message: 'Task Not Found'});
    }
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});