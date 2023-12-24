import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Blog',
  description: 'The Blog, o seu blog sobre tecnologia e programação.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={font.className}>{children}</body>
    </html>
  )
}
