"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"

// Sample hadith data
const hadiths = [
  {
    id: 1,
    text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه",
    narrator: "عمر بن الخطاب رضي الله عنه",
    source: "صحيح البخاري",
    category: "النية والإخلاص",
  },
  {
    id: 2,
    text: "من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة",
    narrator: "أبو هريرة رضي الله عنه",
    source: "صحيح مسلم",
    category: "العلم",
  },
  {
    id: 3,
    text: "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه",
    narrator: "عبد الله بن عمرو رضي الله عنهما",
    source: "صحيح البخاري",
    category: "الأخلاق",
  },
  {
    id: 4,
    text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
    narrator: "أنس بن مالك رضي الله عنه",
    source: "صحيح البخاري",
    category: "الإيمان",
  },
  {
    id: 5,
    text: "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه",
    narrator: "أبو هريرة رضي الله عنه",
    source: "صحيح البخاري",
    category: "الأخلاق",
  },
]

export default function HadithSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const nextHadith = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % hadiths.length)
  }

  const prevHadith = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + hadiths.length) % hadiths.length)
  }

  const currentHadith = hadiths[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="hadiths" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 font-arabic">
            أحاديث مختارة
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-arabic">
            مجموعة من الأحاديث النبوية الشريفة المختارة التي تحمل الحكمة والنور
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center">
                  <div className="mb-6">
                    <Quote className="h-12 w-12 text-amber-500 opacity-50" />
                  </div>

                  <p className="text-xl md:text-2xl text-center leading-relaxed mb-8 font-arabic">
                    {currentHadith.text}
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="h-0.5 w-16 bg-amber-500/50 mb-4"></div>
                    <p className="text-amber-300 font-medium mb-1 font-arabic">{currentHadith.narrator}</p>
                    <p className="text-gray-400 text-sm font-arabic">{currentHadith.source}</p>
                  </div>

                  <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-amber-900/30 text-amber-300">
                    <span className="text-xs font-arabic">{currentHadith.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevHadith}
              className="p-3 rounded-full bg-gray-800 hover:bg-amber-900 transition-colors duration-300"
              aria-label="Previous hadith"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={nextHadith}
              className="p-3 rounded-full bg-gray-800 hover:bg-amber-900 transition-colors duration-300"
              aria-label="Next hadith"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-full h-96 -translate-y-1/2 bg-amber-500/5 blur-3xl -z-10 rounded-full"></div>
    </section>
  )
}

