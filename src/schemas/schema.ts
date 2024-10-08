import { mergeTypeDefs } from '@graphql-tools/merge'
import rootSchema from './rootSchema'
import scheduleSchema from './scheduleSchema'
import taskSchema from './taskSchema'

const schema = mergeTypeDefs([rootSchema, scheduleSchema, taskSchema])

export default schema
