"use client"

import { motion } from "framer-motion"
import { Heart, Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const footerLinks = [
    {
      title: "روابط سريعة",
      links: [
        { name: "الرئيسية", href: "#home" },
        { name: "الأحاديث", href: "#hadiths" },
        { name: "التصنيفات", href: "#categories" }, // This link will now point to the categories section
        { name: "عن الموقع", href: "#about" },
      ],
    },
    {
      title: "المصادر",
      links: [
        { name: "صحيح البخاري", href: "https://sunnah.com/bukhari" },
        { name: "صحيح مسلم", href: "https://sunnah.com/muslim" },
        { name: "سنن الترمذي", href: "https://sunnah.com/tirmidhi" },
        { name: "سنن أبي داود", href: "https://sunnah.com/abudawud" },
      ],
    },
    {
      title: "تواصل معنا",
      links: [
        { name: "اتصل بنا", href: "#contact" },
        { name: "الأسئلة الشائعة", href: "/faq" },
        { name: "سياسة الخصوصية", href: "/privacy" },
        { name: "شروط الاستخدام", href: "/terms" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 mb-4"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <div className="bg-amber-600 p-1.5 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white font-arabic">أحاديث الرسول</span>
            </Link>
            <p className="text-gray-400 mb-4 font-arabic">
              موقع يهدف إلى نشر الأحاديث النبوية الشريفة وتيسير الوصول إليها للمسلمين في جميع أنحاء العالم
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-bold mb-4 font-arabic">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-amber-500 transition-colors duration-300 font-arabic relative group"
                      onClick={(e) => {
                        // Handle smooth scroll for hash links
                        if (link.href.startsWith("#")) {
                          e.preventDefault()
                          const element = document.getElementById(link.href.substring(1))
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" })
                          } else if (link.href === "#") {
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        }
                      }}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute right-0 left-0 bottom-0 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-gray-900 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 font-arabic">
            &copy; {new Date().getFullYear()} أحاديث الرسول - جميع الحقوق محفوظة
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

