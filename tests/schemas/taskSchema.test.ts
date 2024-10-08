import request from 'supertest';
import express from 'express';
import { ApolloServer } from 'apollo-server-express'
import resolver from '../../src/resolvers/resolver'
import prisma from '../../src/prisma/client'
import schema from '../../src/schemas/schema'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' });

const app: any = express();
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  context: () => ({
    prisma,
  }),
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Task Schema', () => {
  it('should return a list of tasks', async () => {
    const response = await request(app).post('/graphql').send({
      query: '{ tasks { id accountId scheduleId startTime duration type } }',
    });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data.tasks');
  });
  
  it('should create a new task', async () => {
    const newTask = {
      accountId: 1,
      scheduleId: '1eab3a76-b8dd-4c14-8b8a-81412f643c92',
      startTime: new Date().toISOString(),
      duration: 60,
      type: 'work',
    };
    
    const response = await request(app).post('/graphql').send({
      query: `
        mutation {
          createTask(data: {
            accountId: ${newTask.accountId},
            scheduleId: "${newTask.scheduleId}",
            startTime: "${newTask.startTime}",
            duration: ${newTask.duration},
            type: "${newTask.type}"
          }) {
            id
            accountId
            scheduleId
            startTime
            duration
            type
          }
        }
      `,
    });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data.createTask');
    expect(response.body.data.createTask.accountId).toBe(newTask.accountId);
    expect(response.body.data.createTask.scheduleId).toBe(newTask.scheduleId);
  });
  
  it('should return a task by id', async () => {
    const response = await request(app).post('/graphql').send({
      query: '{ task(id: "existing-task-id") { id accountId scheduleId } }',
    });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data.task');
  });
  
  it('should return null for invalid task id', async () => {
    const response = await request(app).post('/graphql').send({
      query: '{ task(id: "non-existing-id") { id } }',
    });
    
    expect(response.status).toBe(200);
    expect(response.body.task).toBeUndefined();
  });
});
