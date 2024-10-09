import { ICreateSchedule, IUpdateSchedule } from '../interfaces/scheduleInterface'
import prisma from '../prisma/client'

const scheduleResolvers = {
  Query: {
    schedules: async () => {
      return prisma.schedule.findMany({
        include: {
          tasks: true,
        },
      })
    },

    schedule: async (_parent: any, args: { id: string }) => {
      return prisma.schedule.findUnique({
        where: {
          id: args.id,
        },
        include: {
          tasks: true,
        },
      })
    },
  },

  Mutation: {
    createSchedule: async (_parent: any, args: { data: ICreateSchedule }) => {
      const { accountId, agentId, startTime, endTime } = args.data
      return prisma.schedule.create({
        data: {
          accountId,
          agentId,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      })
    },

    updateSchedule: async (_parent: any, args: { id: string; data: IUpdateSchedule }) => {
      const { accountId, agentId, startTime, endTime } = args.data
      return prisma.schedule.update({
        where: { id: args.id },
        data: {
          accountId: accountId || undefined,
          agentId: agentId || undefined,
          startTime: startTime ? new Date(startTime) : undefined,
          endTime: endTime ? new Date(endTime) : undefined,
        },
      })
    },

    deleteSchedule: async (_parent: any, args: { id: string }) => {
      return prisma.schedule.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
}

export default scheduleResolvers
