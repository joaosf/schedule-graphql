import { gql } from 'apollo-server-express'

const scheduleSchema = gql`
  scalar DateTime

  type Schedule {
    id: String!
    accountId: Int!
    agentId: Int!
    startTime: DateTime!
    endTime: DateTime!
    tasks: [Task!]!
  }

  extend type Query {
    schedules: [Schedule!]!
    schedule(id: String!): Schedule
  }

  extend type Mutation {
    createSchedule(data: CreateScheduleInput!): Schedule!
    updateSchedule(id: String!, data: UpdateScheduleInput!): Schedule!
    deleteSchedule(id: String!): Schedule!
  }

  input CreateScheduleInput {
    accountId: Int!
    agentId: Int!
    startTime: DateTime!
    endTime: DateTime!
  }

  input UpdateScheduleInput {
    accountId: Int
    agentId: Int
    startTime: DateTime
    endTime: DateTime
  }
`

export default scheduleSchema
