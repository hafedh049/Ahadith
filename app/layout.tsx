import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "احاديث الرسول",
  description: "موقع احاديث الرسول - مجموعة من الأحاديث النبوية الشريفة",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'