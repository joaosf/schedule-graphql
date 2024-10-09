import request from 'supertest'
import prisma from '../../src/prisma/client'
import { app, startServer } from './utils'

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
