import { CreateTaskInput, UpdateTaskInput } from '../../src/interfaces/taskInterface'

const mockTaskType: any = 'WORK'

describe('CreateTaskInput', () => {
  it('should create a valid CreateTaskInput object', () => {
    const input: CreateTaskInput = {
      accountId: 1,
      scheduleId: 'sched-123',
      startTime: '2024-10-08T09:00:00Z',
      duration: 60,
      type: mockTaskType,
    }

    expect(input.accountId).toBe(1)
    expect(input.scheduleId).toBe('sched-123')
    expect(input.startTime).toBe('2024-10-08T09:00:00Z')
    expect(input.duration).toBe(60)
    expect(input.type).toBe(mockTaskType)
  })
})

describe('UpdateTaskInput', () => {
  it('should create a valid UpdateTaskInput object with all fields', () => {
    const input: UpdateTaskInput = {
      accountId: 1,
      scheduleId: 'sched-123',
      startTime: '2024-10-08T09:00:00Z',
      duration: 60,
      type: mockTaskType,
    }

    expect(input.accountId).toBe(1)
    expect(input.scheduleId).toBe('sched-123')
    expect(input.startTime).toBe('2024-10-08T09:00:00Z')
    expect(input.duration).toBe(60)
    expect(input.type).toBe(mockTaskType)
  })

  it('should create a valid UpdateTaskInput object with only some fields', () => {
    const input: UpdateTaskInput = {
      startTime: '2024-10-08T09:00:00Z',
      duration: 60,
    }

    expect(input.accountId).toBeUndefined()
    expect(input.scheduleId).toBeUndefined()
    expect(input.startTime).toBe('2024-10-08T09:00:00Z')
    expect(input.duration).toBe(60)
    expect(input.type).toBeUndefined()
  })

  it('should create a valid UpdateTaskInput object with no fields', () => {
    const input: UpdateTaskInput = {}

    expect(input.accountId).toBeUndefined()
    expect(input.scheduleId).toBeUndefined()
    expect(input.startTime).toBeUndefined()
    expect(input.duration).toBeUndefined()
    expect(input.type).toBeUndefined()
  })
})
