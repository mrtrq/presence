import { Navbar } from './components/Navbar';
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Muhammad Tarreq',
  description: 'Navigating Through',
  icons: {
    icon: '/favicon.ico'
  },
  keywords: [
    'Muhammad Tarreq',
    'Tarreq Maulana',
    'BEM Fasilkom UI',
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
