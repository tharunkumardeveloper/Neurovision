import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NeuroVision CDSS - AI-Powered Alzheimer\'s Detection',
  description: 'Clinical Decision Support System for Early Alzheimer\'s Disease Detection Using Multi-Modal Biomarker Integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}