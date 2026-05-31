import 'dotenv/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '../src/generated/prisma/client'

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  const users = await Promise.all([
    prisma.user.create({ data: { email: 'user1@example.com', password: 'password1' } }),
    prisma.user.create({ data: { email: 'user2@example.com', password: 'password2' } }),
    prisma.user.create({ data: { email: 'user3@example.com', password: 'password3' } }),
  ])

  const pacientes = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', membershipType: 'Gold', userId: users[0].id },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', membershipType: 'Gold', userId: users[0].id },
    { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', membershipType: 'Silver', userId: users[1].id },
    { firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', membershipType: 'Silver', userId: users[1].id },
    { firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@example.com', membershipType: 'Platinum', userId: users[2].id },
    { firstName: 'Eve', lastName: 'Miller', email: 'eve.miller@example.com', membershipType: 'Platinum', userId: users[2].id },
  ]

  await prisma.paciente.createMany({ data: pacientes })

  const count = await prisma.paciente.count()
  console.log(`Inserted ${count} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })