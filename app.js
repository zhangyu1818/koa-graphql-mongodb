const Koa = require("koa");
const { ApolloServer, gql } = require("apollo-server-koa");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose
    .connect("mongodb://localhost/test", { useNewUrlParser: true })
    .then(() => console.log("🚀 connect mongodb success"))
    .catch(() => console.log("connect mongodb failed"));

const todoSchema = new Schema({
    content: String,
    completed: Boolean
});
const Todo = mongoose.model("todo", todoSchema);

const typeDefs = gql`
    scalar ObjectId
    type todo {
        _id:String!
        content: String!
        completed: Boolean!
    }
    type Query {
        todoList: [todo]!
    }
    type Mutation {
        addTodo(content: String): [todo]!
        setCompleted(_id:String,completed:Boolean):[todo]!
    }
`;

const resolvers = {
    Query: {
        todoList: async () => {
            return await Todo.find({});
        }
    },
    Mutation: {
        addTodo: async (_, {content}) => {
            const newTodo = await Todo.create({content,completed:false});
            return await Todo.find({});
        },
        setCompleted:async (_,{_id,completed})=>{
            const id = mongoose.Types.ObjectId(_id);
            const state = await Todo.updateOne({_id:id},{completed});
            return await Todo.find({});
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${ server.graphqlPath }`)
);
