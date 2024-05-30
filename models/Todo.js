const mongoose = require('mongoose');

// Schema and Model
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);