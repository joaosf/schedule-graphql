interface CreateScheduleInput {
  accountId: number
  agentId: number
  startTime: string
  endTime: string
}

interface UpdateScheduleInput {
  accountId?: number
  agentId?: number
  startTime?: string
  endTime?: string
}

export { CreateScheduleInput, UpdateScheduleInput }
