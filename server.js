const fastify = require('fastify');
const { ApolloServer } = require('apollo-server-fastify');
const typeDefs = require('./typeDefs');

const app = fastify({
    logger: true
});
const authors = new Map([
    [1, {
        id: 1,
        name: 'Tolkien, J. R. R.'
    }],
    [2, {
        id: 2,
        name: 'Austen, Jane'
    }]
]);
const books = [{
    isbn: '9788381162647',
    title: 'Hobbit',
    authorID: 1
}, {
    isbn: '9788376480756',
    title: 'Pride and Prejudice',
    authorID: 2
}];
const db = { authors, books };

const apollo = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            async books() {
                return db.books;
            },
            book(isbn) {
                const matchingBooks = books.filter((book) => book.isbn === isbn);
                return matchingBooks[0];
            },
            async authors() {
                return Array.from(db.authors.values());
            }
        },
        Book: {
            author(parent) {
                return authors.get(parent.authorID);
            }
        }
    },
    playground: true
});
app.register(apollo.createHandler());
app.listen(3032);
