import { TaskType } from '@prisma/client'

interface ICreateTask {
  accountId: number
  scheduleId: string
  startTime: string
  duration: number
  type: TaskType
}

interface IUpdateTask {
  accountId?: number
  scheduleId?: string
  startTime?: string
  duration?: number
  type?: TaskType
}

export { ICreateTask, IUpdateTask }
