import { gql } from 'apollo-server-express'

const taskSchema = gql`
  scalar DateTime

  type Task {
    id: String!
    accountId: Int!
    scheduleId: String!
    startTime: DateTime!
    duration: Int!
    type: String!
  }

  extend type Query {
    tasks: [Task!]!
    task(id: String!): Task
  }

  extend type Mutation {
    createTask(data: CreateTaskInput!): Task!
    updateTask(id: String!, data: UpdateTaskInput!): Task!
    deleteTask(id: String!): Task!
  }

  input CreateTaskInput {
    accountId: Int!
    scheduleId: String!
    startTime: DateTime!
    duration: Int!
    type: String!
  }

  input UpdateTaskInput {
    accountId: Int
    scheduleId: String
    startTime: DateTime
    duration: Int
    type: String
  }
`

export default taskSchema
