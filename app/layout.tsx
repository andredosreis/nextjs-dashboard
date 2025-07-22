import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import ogImage from '@/app/assets/opengraph-image.png'

export const metadata = {
  title: 'Acme Dashboard',
  description: 'Acme Dashboard built with Next.js',
  openGraph: {
    title: 'Acme Dashboard',
    description: 'Acme Dashboard built with Next.js',
    images: [ogImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
       
      </body>
    </html>
  );
}
