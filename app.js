const Koa = require("koa");
const { ApolloServer } = require("apollo-server-koa");

const todoTypeDef = require("./src/graphql/typeDefs/todo");
const todoResolver = require("./src/graphql/resolvers/todo");

const helloWorldTypeDef = require("./src/graphql/typeDefs/helloWorld");
const helloWorldResolver = require("./src/graphql/resolvers/helloWorld");

const connect = require("./src/db.js");
connect();

const server = new ApolloServer({
    typeDefs: [todoTypeDef, helloWorldTypeDef],
    resolvers: [todoResolver, helloWorldResolver]
});

const app = new Koa();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${ server.graphqlPath }`)
);
