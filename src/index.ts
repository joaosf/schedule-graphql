import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import schema from './schemas/schema'
import resolver from './resolvers/resolver'
import prisma from './prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  context: ({ req }) => ({
    prisma,
  }),
})

const startServer = async () => {
  await server.start()
  // @ts-ignore
  server.applyMiddleware({ app, path: '/graphql' })
}

startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`)
  })
})
