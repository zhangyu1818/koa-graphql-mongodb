const Todo = require("../../schema/todo");

const todoResolver = {
    Query: {
        todoList: async () => {
            return await Todo.find({});
        },
        todo: async (_, { content }) => {
            const data = await Todo.find({ content: { $regex: content } });
            return data || [];
        }
    },
    Mutation: {
        addTodo: async (_, { content }) => {
            const newTodo = await Todo.create({ content });
            const todoList = await Todo.find({});
            return { success: !!newTodo, todoList };
        },
        setCompleted: async (_, { _id, completed }) => {
            const state = await Todo.updateOne({ _id }, { completed });
            const todoList = await Todo.find({});
            return { success: !!state.ok, todoList };
        },
        deleteTodo: async (_, { _id }) => {
            const state = await Todo.deleteMany({ _id: { $in: _id } });
            const todoList = await Todo.find({});
            return { success: !!state.ok, todoList };
        },
        editTodo: async (_, { _id, content }) => {
            const state = await Todo.updateOne({ _id }, { content });
            const todoList = await Todo.find({});
            return { success: !!state.ok, todoList };
        }
    }
};
module.exports = todoResolver;
