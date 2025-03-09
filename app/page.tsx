import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import HadithSection from "@/components/hadith-section"
import SearchSection from "@/components/search-section"
import CategoriesSection from "@/components/categories-section"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "احاديث الرسول",
  description: "موقع احاديث الرسول - مجموعة من الأحاديث النبوية الشريفة",
}

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
        <HeroSection />
        <SearchSection />
        <HadithSection />
        <CategoriesSection />
      </main>
    </ThemeProvider>
  )
}

