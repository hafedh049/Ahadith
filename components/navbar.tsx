"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, BookOpen } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeSection, setActiveSection] = useState("")
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الأحاديث", href: "#hadiths" },
    { name: "التصنيفات", href: "#categories" },
    { name: "عن الموقع", href: "#about" },
    { name: "اتصل بنا", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .map((link) => (link.href.startsWith("#") ? link.href.substring(1) : null))
        .filter(Boolean)
        .map((id) => document.getElementById(id as string))
        .filter(Boolean)

      const scrollPosition = window.scrollY + 100 // Offset for navbar height

      for (const section of sections) {
        if (!section) continue

        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
          return
        }
      }

      // If we're at the top of the page, set home as active
      if (scrollPosition < 300) {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount to set initial active section

    return () => window.removeEventListener("scroll", handleScroll)
  }, [navLinks])

  // Apply different styles based on theme
  const headerClasses = isDark
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-md border-b border-gray-200" : "bg-white/30 backdrop-blur-sm"
      }`

  // Neomorphism styles for light theme
  const logoContainerClass = isDark
    ? "bg-amber-600 p-1.5 rounded-lg"
    : "bg-white/80 p-1.5 rounded-lg shadow-[5px_5px_10px_#d1d1d1,-5px_-5px_10px_#ffffff] backdrop-blur-sm"

  const logoIconClass = isDark ? "h-5 w-5 text-white" : "h-5 w-5 text-amber-600"

  const navItemClass = isDark
    ? "px-3 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 font-arabic"
    : "px-3 py-2 text-gray-700 hover:text-amber-600 transition-colors duration-300 font-arabic"

  const mobileMenuClass = isDark
    ? "md:hidden bg-gray-900 border-b border-gray-800"
    : "md:hidden bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg"

  const mobileNavItemClass = isDark
    ? "block px-3 py-2 text-base font-medium text-gray-300 hover:text-amber-400 hover:bg-gray-800 rounded-md transition-colors duration-300 font-arabic"
    : "block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-100/50 rounded-md transition-colors duration-300 font-arabic backdrop-blur-sm"

  const mobileDividerClass = isDark ? "pt-4 pb-3 border-t border-gray-800" : "pt-4 pb-3 border-t border-gray-200"

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className={logoContainerClass}>
                <BookOpen className={logoIconClass} />
              </div>
              <span className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-800"} font-arabic`}>
                أحاديث الرسول
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => {
              const isActive = activeSection === (link.href.startsWith("#") ? link.href.substring(1) : "")
              const isHovered = hoveredLink === link.name

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 font-arabic rounded-md transition-all duration-300 overflow-hidden ${
                    isActive
                      ? isDark
                        ? "text-amber-400 font-medium"
                        : "text-amber-600 font-medium"
                      : isDark
                        ? "text-gray-300 hover:text-amber-400"
                        : "text-gray-700 hover:text-amber-600"
                  }`}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={(e) => {
                    // Handle smooth scroll for hash links
                    if (link.href.startsWith("#")) {
                      e.preventDefault()
                      const element = document.getElementById(link.href.substring(1))
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                        setActiveSection(link.href.substring(1))
                      }
                    }
                  }}
                >
                  {/* Background effect on hover */}
                  {isHovered && !isActive && (
                    <motion.div
                      className={`absolute inset-0 -z-10 rounded-md ${
                        isDark ? "bg-gray-800/50" : "bg-white/80 shadow-[3px_3px_6px_#d1d1d1,-3px_-3px_6px_#ffffff]"
                      }`}
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Text with subtle scale effect on hover */}
                  <motion.span
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      y: isHovered ? -1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link.name}
                  </motion.span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{
                        background: isDark
                          ? "linear-gradient(90deg, rgba(251,191,36,0) 0%, rgba(251,191,36,1) 50%, rgba(251,191,36,0) 100%)"
                          : "linear-gradient(90deg, rgba(217,119,6,0) 0%, rgba(217,119,6,1) 50%, rgba(217,119,6,0) 100%)",
                      }}
                      initial={{ width: "30%", x: "35%" }}
                      animate={{ width: "80%", x: "10%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Subtle dot indicator above the text for active state */}
                  {isActive && (
                    <motion.div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full ${
                        isDark ? "bg-amber-400" : "bg-amber-600"
                      }`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <button
            className={`md:hidden p-2 rounded-md ${isDark ? "text-gray-400 hover:text-white" : "text-gray-700 hover:text-amber-600"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={mobileMenuClass}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === (link.href.startsWith("#") ? link.href.substring(1) : "")

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${mobileNavItemClass} ${
                      isActive ? (isDark ? "text-amber-400 bg-gray-800/50" : "text-amber-600 bg-gray-100/30") : ""
                    }`}
                    onClick={(e) => {
                      setIsOpen(false)
                      // Handle smooth scroll for hash links
                      if (link.href.startsWith("#")) {
                        e.preventDefault()
                        const element = document.getElementById(link.href.substring(1))
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                          setActiveSection(link.href.substring(1))
                        }
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

