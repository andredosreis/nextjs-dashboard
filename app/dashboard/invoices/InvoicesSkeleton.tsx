// app/dashboard/invoices/InvoicesSkeleton.tsx
export default function InvoicesSkeleton() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Invoices</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Customer</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="border-t animate-pulse">
              <td className="px-4 py-2 bg-gray-200 text-transparent">Loading</td>
              <td className="px-4 py-2 bg-gray-200 text-transparent">Loading</td>
              <td className="px-4 py-2 bg-gray-200 text-transparent">Loading</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
