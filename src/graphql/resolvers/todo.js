const Todo = require("../../schema/todo");

const todoResolver = {
    Query: {
        todoList: async (_, { pageInfo }) => {
            if (pageInfo) {
                const { pageSize, currentPage } = pageInfo;
                return await Todo.find({})
                                 .skip((currentPage - 1) * pageSize)
                                 .limit(pageSize);
            }
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
            return { success: !!newTodo };
        },
        setCompleted: async (_, { _id, completed }) => {
            const state = await Todo.updateOne({ _id }, { completed });
            return { success: !!state.ok };
        },
        deleteTodo: async (_, { _id }) => {
            const state = await Todo.deleteMany({ _id: { $in: _id } });
            return { success: !!state.ok };
        },
        editTodo: async (_, { _id, content }) => {
            const state = await Todo.updateOne({ _id }, { content });
            return { success: !!state.ok };
        }
    }
};
module.exports = todoResolver;
