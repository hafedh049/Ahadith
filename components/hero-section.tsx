"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const xPercent = x / rect.width
      const yPercent = y / rect.height

      containerRef.current.style.setProperty("--mouse-x", `${xPercent}`)
      containerRef.current.style.setProperty("--mouse-y", `${yPercent}`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Different styles based on theme
  const backgroundStyle = isDark
    ? {
        backgroundImage:
          "radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(234, 179, 8, 0.15), transparent 25%)",
      }
    : {
        backgroundImage:
          "radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(234, 179, 8, 0.1), transparent 25%)",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)",
        backdropFilter: "blur(10px)",
      }

  const tagClass = isDark
    ? "inline-flex items-center gap-2 bg-amber-900/30 text-amber-300 px-4 py-1 rounded-full mb-6"
    : "inline-flex items-center gap-2 bg-white/50 text-amber-700 px-4 py-1 rounded-full mb-6 shadow-[3px_3px_6px_#d1d1d1,-3px_-3px_6px_#ffffff] backdrop-blur-sm"

  const titleClass = isDark
    ? "text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 font-arabic"
    : "text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 font-arabic"

  const descriptionClass = isDark
    ? "max-w-2xl mx-auto text-lg text-gray-300 mb-8 font-arabic"
    : "max-w-2xl mx-auto text-lg text-gray-700 mb-8 font-arabic"

  const buttonClass = isDark
    ? "bg-gradient-to-r from-amber-500 to-amber-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1 font-arabic"
    : "bg-white/80 text-amber-700 px-8 py-3 rounded-lg font-medium shadow-[5px_5px_10px_#d1d1d1,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,inset_-5px_-5px_10px_#ffffff] transition-all duration-300 transform hover:-translate-y-1 font-arabic backdrop-blur-sm border border-white/50"

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={backgroundStyle}
    >
      <div className={`absolute inset-0 bg-[url('/pattern.svg')] ${isDark ? "opacity-10" : "opacity-5"}`} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          className={tagClass}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">مجموعة مختارة من الأحاديث النبوية</span>
        </motion.div>

        <h1 className={titleClass}>أحاديث الرسول</h1>

        <motion.p
          className={descriptionClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          مجموعة من الأحاديث النبوية الشريفة التي تنير طريق المسلمين وترشدهم إلى الخير والفلاح في الدنيا والآخرة
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button
            className={buttonClass}
            onClick={() => {
              const element = document.getElementById("hadiths")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            استكشف الأحاديث
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>اكتشف المزيد</span>
          <div
            className={`w-0.5 h-10 ${isDark ? "bg-gradient-to-b from-amber-500 to-transparent" : "bg-gradient-to-b from-amber-600 to-transparent"} animate-pulse`}
          />
        </div>
      </motion.div>
    </div>
  )
}

