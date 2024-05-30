const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Schema and Model
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: false
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
