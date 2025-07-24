// app/seed/route.ts
import { NextResponse } from 'next/server'
import postgres from 'postgres'
import { invoices, customers, revenue, users } from '../lib/placeholder-data'
import bcrypt from 'bcrypt'

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

export async function GET() {
  try {
    await sql.begin(async (tx) => {
      // 1. Extensão de UUID
      await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

      // 2. Criação de tabelas
      await tx`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )
      `
      await tx`
        CREATE TABLE IF NOT EXISTS customers (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          image_url VARCHAR(255) NOT NULL
        )
      `
      await tx`
        CREATE TABLE IF NOT EXISTS invoices (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          customer_id UUID NOT NULL REFERENCES customers(id),
          amount INT NOT NULL,
          status VARCHAR(255) NOT NULL,
          date DATE NOT NULL
        )
      `
      await tx`
        CREATE TABLE IF NOT EXISTS revenue (
          month VARCHAR(4) NOT NULL UNIQUE,
          revenue INT NOT NULL
        )
      `

      // 3. Seed de dados
      await Promise.all(
        users.map(async (u) => {
          const pw = await bcrypt.hash(u.password, 10)
          await tx`
            INSERT INTO users (id, name, email, password)
            VALUES (${u.id}, ${u.name}, ${u.email}, ${pw})
            ON CONFLICT (id) DO NOTHING
          `
        })
      )

      await Promise.all(
        customers.map((c) =>
          tx`
            INSERT INTO customers (id, name, email, image_url)
            VALUES (${c.id}, ${c.name}, ${c.email}, ${c.image_url})
            ON CONFLICT (id) DO NOTHING
          `
        )
      )

      await Promise.all(
        invoices.map((i) =>
          tx`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${i.customer_id}, ${i.amount}, ${i.status}, ${i.date})
            ON CONFLICT (id) DO NOTHING
          `
        )
      )

      await Promise.all(
        revenue.map((r) =>
          tx`
            INSERT INTO revenue (month, revenue)
            VALUES (${r.month}, ${r.revenue})
            ON CONFLICT (month) DO NOTHING
          `
        )
      )
    })

    return NextResponse.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
