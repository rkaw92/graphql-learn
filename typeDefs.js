const { gql } = require('apollo-server-fastify');

module.exports = gql`
    type Book {
        title: String!
        isbn: String!
        authorID: Int
        author: Author!
    }
    type Author {
        id: Int
        name: String!
    }

    type Query {
        book(isbn: String!): Book
        books: [Book]
        authors: [Author]
    }
`;
