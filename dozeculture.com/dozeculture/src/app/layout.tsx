import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const touchPro = localFont({
  src: '../../public/fonts/touchpadpro.ttf',
  display: 'swap',
})


export const metadata: Metadata = {
  title: 'DOZE CULTURE',
  description: 'break the box',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${touchPro.className} `}>{children}</body>
    </html>
  )
}
