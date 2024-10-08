import { TaskType } from '@prisma/client'

interface CreateTaskInput {
  accountId: number
  scheduleId: string
  startTime: string
  duration: number
  type: TaskType
}

interface UpdateTaskInput {
  accountId?: number
  scheduleId?: string
  startTime?: string
  duration?: number
  type?: TaskType
}

export { CreateTaskInput, UpdateTaskInput }
