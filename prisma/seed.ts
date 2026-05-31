import 'dotenv/config'
//import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

//const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? 'file:./dev.db' })
//const prisma = new PrismaClient({ adapter })
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })
//const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

    await prisma.paciente.deleteMany()
  await prisma.user.deleteMany()

  const hash = await bcrypt.hash('123456', 10)

  const users = await Promise.all([
    prisma.user.create({ data: { email: 'user1@example.com', password: hash } }),
    prisma.user.create({ data: { email: 'user2@example.com', password: hash } }),
    prisma.user.create({ data: { email: 'user3@example.com', password: hash } }),
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
  console.log(`Inserted ${count} pacientes.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })