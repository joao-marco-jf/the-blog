import type { Metadata } from 'next'
import { Montserrat, Oswald, Playfair_Display, Kanit, DM_Sans } from 'next/font/google'
import './globals.css'

const font = DM_Sans({ subsets: ['latin'], weight: ["200", "300", "400", "500", "600", "700"] })

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
