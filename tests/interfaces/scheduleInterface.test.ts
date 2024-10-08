import { CreateScheduleInput, UpdateScheduleInput } from '../../src/interfaces/scheduleInterface'

describe('CreateScheduleInput', () => {
  it('should create a valid CreateScheduleInput object', () => {
    const input: CreateScheduleInput = {
      accountId: 1,
      agentId: 101,
      startTime: '2024-10-08T09:00:00Z',
      endTime: '2024-10-08T17:00:00Z'
    };
    
    expect(input.accountId).toBe(1);
    expect(input.agentId).toBe(101);
    expect(input.startTime).toBe('2024-10-08T09:00:00Z');
    expect(input.endTime).toBe('2024-10-08T17:00:00Z');
  });
});

describe('UpdateScheduleInput', () => {
  it('should create a valid UpdateScheduleInput object with all fields', () => {
    const input: UpdateScheduleInput = {
      accountId: 1,
      agentId: 101,
      startTime: '2024-10-08T09:00:00Z',
      endTime: '2024-10-08T17:00:00Z'
    };
    
    expect(input.accountId).toBe(1);
    expect(input.agentId).toBe(101);
    expect(input.startTime).toBe('2024-10-08T09:00:00Z');
    expect(input.endTime).toBe('2024-10-08T17:00:00Z');
  });
  
  it('should create a valid UpdateScheduleInput object with some fields omitted', () => {
    const input: UpdateScheduleInput = {
      startTime: '2024-10-08T09:00:00Z'
    };
    
    expect(input.accountId).toBeUndefined();
    expect(input.agentId).toBeUndefined();
    expect(input.startTime).toBe('2024-10-08T09:00:00Z');
    expect(input.endTime).toBeUndefined();
  });
  
  it('should create a valid UpdateScheduleInput object with no fields', () => {
    const input: UpdateScheduleInput = {};
    
    expect(input.accountId).toBeUndefined();
    expect(input.agentId).toBeUndefined();
    expect(input.startTime).toBeUndefined();
    expect(input.endTime).toBeUndefined();
  });
});
