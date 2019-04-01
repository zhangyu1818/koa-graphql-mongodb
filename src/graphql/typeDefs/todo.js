const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { gql } = require("apollo-server-koa");

const Date = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue (value) {
        return new Date(value); // value from the client
    },
    serialize (value) {
        return value.getTime(); // value sent to the client
    },
    parseLiteral (ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value); // ast value is always in string format
        }
        return null;
    }
});

const todoTypeDef = gql`
    scalar Date
    input pageInfo {
        currentPage: Int!
        pageSize: Int!
    }
    type todo {
        _id: ID!
        content: String!
        completed: Boolean!
        createAt:Date!
    }
    type Query {
        todoList: [todo]!
        todo(content: String!): [todo]!
    }
    type updateResponse {
        success: Boolean!
        todoList:[todo]!
    }
    type Mutation {
        addTodo(content: String): updateResponse!
        setCompleted(_id: ID!, completed: Boolean): updateResponse!
        deleteTodo(_id: [ID]!): updateResponse!
        editTodo(_id:ID!,content:String!):updateResponse!
    }
`;
module.exports = todoTypeDef;
