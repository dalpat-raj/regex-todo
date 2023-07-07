const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: String,
    date: String,
    taskDone: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String
    }
})

const Task = new mongoose.model("task", taskSchema);

module.exports = Task;