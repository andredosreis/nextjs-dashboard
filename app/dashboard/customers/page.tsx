
import { fetchFilteredCustomers } from "@/app/lib/data";
import type { FormattedCustomersTable } from '@/app/lib/definitions'

export const dynamic = 'force-dynamic' // Force dynamic rendering for this page

export default async function CustomersPage() {
  const customers = await fetchFilteredCustomers('');
  console.log(customers);



  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Total Invoces</th>
            <th className="px-4 py-2 text-left">panding</th>
            <th className="px-4 py-2 text-left">Paid</th>

          </tr> 
          </thead>
          <tbody>

          {customers.map((customer: any, i: number) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.total_invoices}</td>
              <td className="px-4 py-2">{customer.total_pending}</td>
              <td className="px-4 py-2">{customer.total_paid}</td>
            </tr>
          ))}
          </tbody>

      </table>
    </div>
     )
  
}

// This file is for the customers page in the application.