const { gql } = require("apollo-server-koa");

const helloWorldTypeDef = gql`
    extend type Query {
        hello: String!
    }
`;

module.exports = helloWorldTypeDef;
