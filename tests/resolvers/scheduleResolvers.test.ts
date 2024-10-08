import prisma from '../../src/prisma/client'
import scheduleResolvers from '../../src/resolvers/scheduleResolvers'
import { CreateScheduleInput, UpdateScheduleInput } from '../../src/interfaces/scheduleInterface'

jest.mock('../../src/prisma/client', () => ({
  schedule: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}))

describe('scheduleResolvers', () => {
  describe('Query: schedules', () => {
    it('should fetch all schedules with tasks', async () => {
      const mockSchedules = [
        { id: 'sched-1', accountId: 1, tasks: [] },
        { id: 'sched-2', accountId: 2, tasks: [] },
      ]

      ;(prisma.schedule.findMany as jest.Mock).mockResolvedValue(mockSchedules)

      const result = await scheduleResolvers.Query.schedules()

      expect(prisma.schedule.findMany).toHaveBeenCalledWith({
        include: { tasks: true },
      })
      expect(result).toEqual(mockSchedules)
    })
  })

  describe('Query: schedule', () => {
    it('should fetch a single schedule by ID with tasks', async () => {
      const mockSchedule = { id: 'sched-1', accountId: 1, tasks: [] }

      ;(prisma.schedule.findUnique as jest.Mock).mockResolvedValue(mockSchedule)

      const result = await scheduleResolvers.Query.schedule({}, { id: 'sched-1' })

      expect(prisma.schedule.findUnique).toHaveBeenCalledWith({
        where: { id: 'sched-1' },
        include: { tasks: true },
      })
      expect(result).toEqual(mockSchedule)
    })
  })

  describe('Mutation: createSchedule', () => {
    it('should create a new schedule', async () => {
      const input: CreateScheduleInput = {
        accountId: 1,
        agentId: 2,
        startTime: '2024-10-08T09:00:00Z',
        endTime: '2024-10-08T17:00:00Z',
      }

      const mockSchedule = { id: 'sched-1', ...input }

      ;(prisma.schedule.create as jest.Mock).mockResolvedValue(mockSchedule)

      const result = await scheduleResolvers.Mutation.createSchedule({}, { data: input })

      expect(prisma.schedule.create).toHaveBeenCalledWith({
        data: {
          accountId: 1,
          agentId: 2,
          startTime: new Date('2024-10-08T09:00:00Z'),
          endTime: new Date('2024-10-08T17:00:00Z'),
        },
      })
      expect(result).toEqual(mockSchedule)
    })
  })

  describe('Mutation: updateSchedule', () => {
    it('should update an existing schedule', async () => {
      const input: UpdateScheduleInput = {
        accountId: 1,
        agentId: 2,
        startTime: '2024-10-08T09:00:00Z',
        endTime: '2024-10-08T17:00:00Z',
      }

      const mockUpdatedSchedule = { id: 'sched-1', ...input }

      ;(prisma.schedule.update as jest.Mock).mockResolvedValue(mockUpdatedSchedule)

      const result = await scheduleResolvers.Mutation.updateSchedule({}, { id: 'sched-1', data: input })

      expect(prisma.schedule.update).toHaveBeenCalledWith({
        where: { id: 'sched-1' },
        data: {
          accountId: 1,
          agentId: 2,
          startTime: new Date('2024-10-08T09:00:00Z'),
          endTime: new Date('2024-10-08T17:00:00Z'),
        },
      })
      expect(result).toEqual(mockUpdatedSchedule)
    })
  })

  describe('Mutation: deleteSchedule', () => {
    it('should delete a schedule by ID', async () => {
      const mockDeletedSchedule = { id: 'sched-1', accountId: 1 }

      ;(prisma.schedule.delete as jest.Mock).mockResolvedValue(mockDeletedSchedule)

      const result = await scheduleResolvers.Mutation.deleteSchedule({}, { id: 'sched-1' })

      expect(prisma.schedule.delete).toHaveBeenCalledWith({
        where: { id: 'sched-1' },
      })
      expect(result).toEqual(mockDeletedSchedule)
    })
  })
})
