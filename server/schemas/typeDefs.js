const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input JournalInput {
        entryId: ID
        title: String
        thoughts: String
    }
    type User  {
        _id: ID
        username: String
        email: String
        entryCount: Int
        savedEntries: [Journal]!
    }

    type Journal {
        entryId: ID!
        title: String!
        thoughts: String!
    }

    type Auth{
        token: ID!
        user: User
    }
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveEntry(thoughtData: JournalInput): User
        removeEntry(entryId: ID): User
    }
    `;

    module.exports = typeDefs;