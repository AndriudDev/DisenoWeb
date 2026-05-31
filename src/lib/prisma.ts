import 'dotenv/config'
//import { PrismaLibSql } from '@prisma/adapter-libsql'
import {PrismaPg} from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

//const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? 'file:./dev.db' })
const adapter = new PrismaPg ({ connectionString: process.env.DATABASE_URL!})
const prisma = new PrismaClient({ adapter })

export default prisma
