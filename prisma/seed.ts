import 'dotenv/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '../src/generated/prisma/client'

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

const pacientes = [
  { firstName: 'John', lastName: 'Doe', precio: 80000, email: 'john.doe@example.com', membershipType: 'Basic' },
  { firstName: 'Jane', lastName: 'Smith', precio: 80000, email: 'jane.smith@example.com', membershipType: 'Premium' },
  { firstName: 'Alice', lastName: 'Johnson', precio: 80000, email: 'alice.johnson@example.com', membershipType: 'Gold' },
  { firstName: 'Bob', lastName: 'Brown', precio: 80000, email: 'bob.brown@example.com', membershipType: 'Silver' },
  { firstName: 'Charlie', lastName: 'Davis', precio: 80000, email: 'charlie.davis@example.com', membershipType: 'Basic' },
  { firstName: 'Eve', lastName: 'Miller', precio: 80000, email: 'eve.miller@example.com', membershipType: 'Premium' },

  /* { name: 'Pro Laptop', price: 999990, description: 'High-performance laptop with 32GB RAM and 1TB SSD.' },
  { name: 'Wireless Mouse', price: 29990, description: 'Ergonomic wireless mouse with adjustable DPI.' },
  { name: 'Mechanical Keyboard', price: 79990, description: 'Mechanical keyboard with blue switches and RGB.' },
  { name: 'Monitor 27" 4K', price: 349990, description: '27-inch 4K UHD monitor with HDR support.' },
  { name: 'USB-C Hub', price: 45990, description: '7-in-1 USB-C hub with HDMI, SD card and USB 3.0.' },
  { name: 'Webcam HD', price: 59990, description: '1080p webcam with built-in microphone and privacy shutter.' },
  { name: 'Noise Canceling Headphones', price: 149990, description: 'Over-ear Bluetooth headphones with active noise cancellation.' },
  { name: 'Desk Lamp LED', price: 39990, description: 'Adjustable LED desk lamp with 5 brightness levels.' }, */
]

async function main() {
  console.log('Seeding database...')

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
