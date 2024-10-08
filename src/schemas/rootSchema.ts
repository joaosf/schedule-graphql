import { gql } from 'apollo-server-express'

const rootSchema = gql`
  scalar DateTime

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`

export default rootSchema
