import dotenv from 'dotenv'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from '../../src/schemas/schema'
import resolver from '../../src/resolvers/resolver'
import prisma from '../../src/prisma/client'

dotenv.config({ path: '.env.test' })

const app: any = express()
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  context: () => ({
    prisma,
  }),
})

const startServer = async () => {
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })
}

export { app, startServer }
