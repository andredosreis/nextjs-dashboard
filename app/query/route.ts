// app/query/route.ts
import { NextResponse } from 'next/server'
import postgres from 'postgres'

// Cria o client usando a env var
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

// Sua função de dados
async function listInvoices() {
  const data = await sql<{ amount: number; name: string }[]>`
    SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
  `
  return data
}

// Endpoint GET
export async function GET() {
  try {
    const invoices = await listInvoices()
    return NextResponse.json(invoices)
  } catch (error: any) {
    console.error('Error in /query:', error)
    return NextResponse.json(
      { error: error.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}
