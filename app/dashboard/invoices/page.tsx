// app/dashboard/invoices/page.tsx
import { Suspense } from "react"
import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data'
import Link from 'next/link'
import type { InvoicesTable } from '@/app/lib/definitions'
import { InvoiceSkeleton } from '@/app/ui/skeletons'
import InvoicesList from '@/app/dashboard/invoices/InvoicesList'

export const dynamic = 'force-dynamic' // Force dynamic rendering for this page

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function InvoicesPage({ searchParams }: Props) {
  // 1) Aguarde searchParams resolver e extraia 'page'
  const { page } = await searchParams
  const currentPage = Number(page ?? '1')
return (
    <Suspense fallback={<InvoiceSkeleton  />}>
      {/* 2) @ts-expect-error Async Server Component */}
      <InvoicesList page={currentPage} />
    </Suspense>
  )
}