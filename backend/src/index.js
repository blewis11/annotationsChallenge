import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import typeDefs from "./api/schema"
import resolvers from "./api/resolvers"

const app = express()

const PORT = 4000

const SERVER = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true, 
})

SERVER.applyMiddleware(
    { 
        app,
        cors: true,
    }
)

app.listen(PORT, () => console.log(`🚀 GraphQL playground is running at http://localhost:4000${SERVER.graphqlPath}`))
