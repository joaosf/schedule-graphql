import { Task as TaskModel } from '@prisma/client'
import taskResolvers from '../../src/resolvers/taskResolvers'
import { CreateTaskInput, UpdateTaskInput } from '../../src/interfaces/taskInterface'
import prisma from '../../src/prisma/client'

jest.mock('../../src/prisma/client', () => ({
  task: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}))

describe('taskResolvers', () => {
  describe('Query: tasks', () => {
    it('should fetch all tasks', async () => {
      const mockTasks: TaskModel[] = [
        { id: 'task-1', accountId: 1, scheduleId: 'sched-1', startTime: new Date(), duration: 60, type: 'work' },
        { id: 'task-2', accountId: 2, scheduleId: 'sched-2', startTime: new Date(), duration: 30, type: 'break' },
      ]

      ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

      const result = await taskResolvers.Query.tasks()

      expect(prisma.task.findMany).toHaveBeenCalled()
      expect(result).toEqual(mockTasks)
    })
  })

  describe('Query: task', () => {
    it('should fetch a task by ID', async () => {
      const mockTask: TaskModel = {
        id: 'task-1',
        accountId: 1,
        scheduleId: 'sched-1',
        startTime: new Date(),
        duration: 60,
        type: 'work',
      }

      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

      const result = await taskResolvers.Query.task({}, { id: 'task-1' })

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: 'task-1' },
      })
      expect(result).toEqual(mockTask)
    })
  })

  describe('Mutation: createTask', () => {
    it('should create a new task', async () => {
      const input: CreateTaskInput = {
        accountId: 1,
        scheduleId: 'sched-1',
        startTime: '2024-10-08T09:00:00Z',
        duration: 60,
        type: 'work',
      }

      const mockTask: TaskModel = {
        id: 'task-1',
        accountId: 1,
        scheduleId: 'sched-1',
        startTime: new Date(input.startTime),
        duration: 60,
        type: 'work',
      }

      ;(prisma.task.create as jest.Mock).mockResolvedValue(mockTask)

      const result = await taskResolvers.Mutation.createTask({}, { data: input })

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          accountId: 1,
          scheduleId: 'sched-1',
          startTime: new Date(input.startTime),
          duration: 60,
          type: 'work',
        },
      })
      expect(result).toEqual(mockTask)
    })
  })

  describe('Mutation: updateTask', () => {
    it('should update an existing task', async () => {
      const input: UpdateTaskInput = {
        accountId: 1,
        scheduleId: 'sched-1',
        startTime: '2024-10-08T09:00:00Z',
        duration: 60,
        type: 'work',
      }

      const mockUpdatedTask: TaskModel = {
        id: 'task-1',
        accountId: 1,
        scheduleId: 'sched-1',
        startTime: input.startTime ? new Date(input.startTime) : new Date(),
        duration: 60,
        type: 'work',
      }

      ;(prisma.task.update as jest.Mock).mockResolvedValue(mockUpdatedTask)

      const result = await taskResolvers.Mutation.updateTask({}, { id: 'task-1', data: input })

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 'task-1' },
        data: {
          accountId: 1,
          scheduleId: 'sched-1',
          startTime: input.startTime ? new Date(input.startTime) : new Date(),
          duration: 60,
          type: 'work',
        },
      })
      expect(result).toEqual(mockUpdatedTask)
    })
  })

  describe('Mutation: deleteTask', () => {
    it('should delete a task by ID', async () => {
      const mockDeletedTask: TaskModel = {
        id: 'task-1',
        accountId: 1,
        scheduleId: 'sched-1',
        startTime: new Date(),
        duration: 60,
        type: 'work',
      }

      ;(prisma.task.delete as jest.Mock).mockResolvedValue(mockDeletedTask)

      const result = await taskResolvers.Mutation.deleteTask({}, { id: 'task-1' })

      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: 'task-1' },
      })
      expect(result).toEqual(mockDeletedTask)
    })
  })
})
