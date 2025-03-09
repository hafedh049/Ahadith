"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Add this hadiths data
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

const categories = ["الإيمان", "العبادات", "الأخلاق", "المعاملات", "العلم", "الذكر والدعاء", "النية والإخلاص"]

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  // Add these new states
  const [filteredHadiths, setFilteredHadiths] = useState<typeof hadiths>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Add this search function
  const handleSearch = () => {
    setIsSearching(true)

    // Simulate a search delay
    setTimeout(() => {
      const results = hadiths.filter((hadith) => {
        const matchesSearchTerm =
          searchTerm === "" || hadith.text.includes(searchTerm) || hadith.narrator.includes(searchTerm)

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(hadith.category)

        return matchesSearchTerm && matchesCategory
      })

      setFilteredHadiths(results)
      setHasSearched(true)
      setIsSearching(false)
    }, 500)
  }

  // Add this effect to reset search results when search criteria change
  useEffect(() => {
    if (hasSearched) {
      setHasSearched(false)
    }
  }, [searchTerm, selectedCategories])

  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-arabic">ابحث في الأحاديث</h2>
            <p className="text-gray-400 font-arabic">
              يمكنك البحث عن الأحاديث النبوية بالكلمات المفتاحية أو تصفية النتائج حسب التصنيف
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث عن حديث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-950 border-gray-800 h-12 text-right pr-4 font-arabic"
                dir="rtl"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 gap-2 bg-gray-950 border-gray-800 hover:bg-gray-900 font-arabic"
                >
                  <Filter className="h-4 w-4" />
                  <span>التصنيف</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-950 border-gray-800">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    className="font-arabic text-right"
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="h-12 bg-amber-600 hover:bg-amber-700 font-arabic"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "جاري البحث..." : "بحث"}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 font-arabic ${
                  selectedCategories.includes(category)
                    ? "bg-amber-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Add search results section */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-8 border-t border-gray-800 pt-6"
            >
              <h3 className="text-xl font-bold mb-4 font-arabic text-center">
                {filteredHadiths.length > 0 ? `نتائج البحث (${filteredHadiths.length})` : "لا توجد نتائج مطابقة"}
              </h3>

              <div className="space-y-4">
                {filteredHadiths.map((hadith) => (
                  <motion.div
                    key={hadith.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-950 border border-gray-800 rounded-lg p-4"
                  >
                    <p className="text-white mb-3 font-arabic">{hadith.text}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 text-sm font-arabic">{hadith.narrator}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs font-arabic">{hadith.source}</span>
                        <span className="bg-amber-900/30 text-amber-300 text-xs px-2 py-0.5 rounded-full font-arabic">
                          {hadith.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

