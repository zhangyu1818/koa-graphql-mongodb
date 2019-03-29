const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    content: String,
    completed: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
