import { Task as TaskModel } from '@prisma/client'
import prisma from '../prisma/client'
import { CreateTaskInput, UpdateTaskInput } from '../interfaces/taskInterface'

const taskResolvers = {
  Query: {
    tasks: async (): Promise<TaskModel[]> => await prisma.task.findMany(),
    task: async (_: unknown, { id }: { id: string }): Promise<TaskModel | null> =>
      await prisma.task.findUnique({
        where: { id },
      }),
  },

  Mutation: {
    createTask: async (_: unknown, { data }: { data: CreateTaskInput }): Promise<TaskModel> =>
      await prisma.task.create({
        data: {
          accountId: data.accountId,
          scheduleId: data.scheduleId,
          startTime: new Date(data.startTime),
          duration: data.duration,
          type: data.type,
        },
      }),
    updateTask: async (_: unknown, { id, data }: { id: string; data: UpdateTaskInput }): Promise<TaskModel> =>
      await prisma.task.update({
        where: { id },
        data: {
          accountId: data.accountId || undefined,
          scheduleId: data.scheduleId || undefined,
          startTime: data.startTime ? new Date(data.startTime) : undefined,
          duration: data.duration || undefined,
          type: data.type || undefined,
        },
      }),
    deleteTask: async (_: unknown, { id }: { id: string }): Promise<TaskModel> =>
      await prisma.task.delete({
        where: { id },
      }),
  },
}

export default taskResolvers
