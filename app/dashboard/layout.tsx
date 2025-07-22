'use client';
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import { usePathname } from "next/navigation";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    const path = usePathname();
    const linkClass = (href: string) => 
        href === path ? 'font-bold text-blue-600' : 'text-gray-700';
    return (
        <div className="flex min-h-screen">
            <nav className=" flex flex-col w-1/4 bg-gray-100 p-4 space-y-4">
            <Link href="/dashboard" className={linkClass('/dashboard')}>
                <span className={lusitana.className}>Dashboard</span>
            </Link>
            <Link href="/dashboard/customers" className={linkClass('/dashboard/customers')}>
                <span className={lusitana.className}>Customers</span>
            </Link>
            <Link href="/dashboard/invoices" className={linkClass('/dashboard/invoices')}>
                <span className={lusitana.className}> Invoices </span>
            </Link>
            </nav>
            <main className="flex-1 p-6">
                {children}
            </main>

        </div>
    );
}


