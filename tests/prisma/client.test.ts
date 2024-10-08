import prisma from '../../src/prisma/client'

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    log: ['query', 'info', 'warn', 'error'],
  }
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  }
})

describe('Prisma Client', () => {
  it('should call $connect and $disconnect', async () => {
    await prisma.$connect()
    expect(prisma.$connect).toHaveBeenCalledTimes(1)

    await prisma.$disconnect()
    expect(prisma.$disconnect).toHaveBeenCalledTimes(1)
  })
})
