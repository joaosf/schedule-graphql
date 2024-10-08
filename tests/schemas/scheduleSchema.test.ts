import request from 'supertest'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import resolver from '../../src/resolvers/resolver'
import prisma from '../../src/prisma/client'
import schema from '../../src/schemas/schema'
import dotenv from 'dotenv'

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

beforeAll(async () => {
  await startServer()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Schedule Schema', () => {
  it('should return a list of schedules', async () => {
    const response = await request(app).post('/graphql').send({
      query: '{ schedules { id accountId agentId startTime endTime tasks { id } } }',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data.schedules')
  })

  it('should create a new schedule', async () => {
    const newSchedule = {
      accountId: 1,
      agentId: 2,
      startTime: new Date().toISOString(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    }

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
        mutation {
          createSchedule(data: {
            accountId: ${newSchedule.accountId},
            agentId: ${newSchedule.agentId},
            startTime: "${newSchedule.startTime}",
            endTime: "${newSchedule.endTime}"
          }) {
            id
            accountId
            agentId
            startTime
            endTime
          }
        }
      `,
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data.createSchedule')
    expect(response.body.data.createSchedule.accountId).toBe(newSchedule.accountId)
  })
})
