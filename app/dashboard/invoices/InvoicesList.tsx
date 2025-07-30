import type { InvoicesTable } from '@/app/lib/definitions'
import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data'
import Link from 'next/link'

interface Props {
    page: number
}

export default async function InvoicesList({ page }: Props){
    const [invoices, totalPages] = await Promise.all([
        fetchFilteredInvoices('', page) as Promise<InvoicesTable[]>,
        fetchInvoicesPages(''),
    ])

    return (
        <div className='p-6'> 
        <h1 className='text-2xl font-semibold mb-4'>
            Invoices (Page {page} of {totalPages})

        </h1>
        <table className='min-w-full table-auto mb-4'>
            <thead>
                <tr>
                    <th
                    className='px-4 py-2 text-left'>
                        ID
                    </th>
                    <th
                    className='px-4 py-2 text-left'>
                        Amount
                    </th>
                    <th
                    className='px-4 py-2 text-left'>
                        Customer
                    </th>
                </tr>

            </thead>

            <tbody>
                {invoices.map((invoice: InvoicesTable) => (
                    <tr key={invoice.id} className='border-t'>
                        <td className='px-4 py-2'>{invoice.id}</td>
                        <td className='px-4 py-2'>${(invoice.amount / 100).toFixed(2)}</td>
                        <td className='px-4 py-2'>{invoice.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='flex justify-between'>
            {page > 1 ? (
                <Link
                    href={`/dashboard/invoices?page=${page - 1}`}
                    className='px-4 py-2 bg-gray-200 rounded'
                >
                    Previous
                </Link>
            ) : (
                <span />
            )}
            {page < totalPages && (
                <Link
                    href={`/dashboard/invoices?page=${page + 1}`}
                    className='px-4 py-2 bg-gray-200 rounded'
                >
                    Next
                </Link>
            )}

        </div>

        </div>
    )
}