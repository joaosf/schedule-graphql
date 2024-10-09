interface ICreateSchedule {
  accountId: number
  agentId: number
  startTime: string
  endTime: string
}

interface IUpdateSchedule {
  accountId?: number
  agentId?: number
  startTime?: string
  endTime?: string
}

export { ICreateSchedule, IUpdateSchedule }
