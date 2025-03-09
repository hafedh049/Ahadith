"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Book, Users, Heart, Star, Moon, Coffee, Feather, Award, Shield, Compass, ChevronRight, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

// Sample hadith data with categories
const hadiths = [
  {
    id: 1,
    text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه",
    narrator: "عمر بن الخطاب رضي الله عنه",
    source: "صحيح البخاري",
    category: "niyya",
  },
  {
    id: 2,
    text: "من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة",
    narrator: "أبو هريرة رضي الله عنه",
    source: "صحيح مسلم",
    category: "ilm",
  },
  {
    id: 3,
    text: "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه",
    narrator: "عبد الله بن عمرو رضي الله عنهما",
    source: "صحيح البخاري",
    category: "akhlaq",
  },
  {
    id: 4,
    text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
    narrator: "أنس بن مالك رضي الله عنه",
    source: "صحيح البخاري",
    category: "iman",
  },
  {
    id: 5,
    text: "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه",
    narrator: "أبو هريرة رضي الله عنه",
    source: "صحيح البخاري",
    category: "akhlaq",
  },
  {
    id: 6,
    text: "اللهم إني أسألك الهدى والتقى والعفاف والغنى",
    narrator: "عبد الله بن مسعود رضي الله عنه",
    source: "صحيح مسلم",
    category: "dhikr",
  },
  {
    id: 7,
    text: "الطهور شطر الإيمان، والحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن -أو تملأ- ما بين السماوات والأرض",
    narrator: "أبو مالك الأشعري رضي الله عنه",
    source: "صحيح مسلم",
    category: "ibadat",
  },
  {
    id: 8,
    text: "خيركم من تعلم القرآن وعلمه",
    narrator: "عثمان بن عفان رضي الله عنه",
    source: "صحيح البخاري",
    category: "ilm",
  },
  {
    id: 9,
    text: "إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم",
    narrator: "أبو هريرة رضي الله عنه",
    source: "صحيح مسلم",
    category: "akhlaq",
  },
  {
    id: 10,
    text: "من حسن إسلام المرء تركه ما لا يعنيه",
    narrator: "أبو هريرة رضي الله عنه",
    source: "سنن الترمذي",
    category: "adab",
  },
  {
    id: 11,
    text: "الدين النصيحة، قلنا: لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم",
    narrator: "تميم الداري رضي الله عنه",
    source: "صحيح مسلم",
    category: "iman",
  },
  {
    id: 12,
    text: "كان رسول الله صلى الله عليه وسلم يعلمنا الاستخارة في الأمور كلها كما يعلمنا السورة من القرآن",
    narrator: "جابر بن عبد الله رضي الله عنهما",
    source: "صحيح البخاري",
    category: "dhikr",
  },
  {
    id: 13,
    text: "خير الناس أنفعهم للناس",
    narrator: "جابر بن عبد الله رضي الله عنهما",
    source: "صحيح الجامع",
    category: "akhlaq",
  },
  {
    id: 14,
    text: "ما نقصت صدقة من مال، وما زاد الله عبدا بعفو إلا عزا، وما تواضع أحد لله إلا رفعه الله",
    narrator: "أبو هريرة رضي الله عنه",
    source: "صحيح مسلم",
    category: "muamalat",
  },
  {
    id: 15,
    text: "كان النبي صلى الله عليه وسلم أحسن الناس خلقا",
    narrator: "أنس بن مالك رضي الله عنه",
    source: "صحيح البخاري",
    category: "sira",
  },
]

// Define the categories with their icons and descriptions
const categories = [
  {
    id: "iman",
    name: "الإيمان",
    icon: Heart,
    description: "أحاديث تتعلق بأركان الإيمان والعقيدة الإسلامية",
    count: 42,
    color: "amber",
  },
  {
    id: "ibadat",
    name: "العبادات",
    icon: Moon,
    description: "أحاديث تتعلق بالصلاة والصوم والزكاة والحج وغيرها من العبادات",
    count: 67,
    color: "blue",
  },
  {
    id: "akhlaq",
    name: "الأخلاق",
    icon: Award,
    description: "أحاديث تتعلق بمكارم الأخلاق والسلوك الحسن",
    count: 53,
    color: "green",
  },
  {
    id: "muamalat",
    name: "المعاملات",
    icon: Users,
    description: "أحاديث تتعلق بالبيع والشراء والتجارة والعقود",
    count: 38,
    color: "purple",
  },
  {
    id: "ilm",
    name: "العلم",
    icon: Book,
    description: "أحاديث تتعلق بفضل العلم وطلبه وآداب المتعلم",
    count: 29,
    color: "cyan",
  },
  {
    id: "dhikr",
    name: "الذكر والدعاء",
    icon: Feather,
    description: "أحاديث تتعلق بالأذكار والأدعية المأثورة",
    count: 45,
    color: "pink",
  },
  {
    id: "niyya",
    name: "النية والإخلاص",
    icon: Star,
    description: "أحاديث تتعلق بالنية وإخلاص العمل لله تعالى",
    count: 21,
    color: "yellow",
  },
  {
    id: "family",
    name: "الأسرة",
    icon: Shield,
    description: "أحاديث تتعلق بالزواج والأسرة وتربية الأبناء",
    count: 34,
    color: "red",
  },
  {
    id: "sira",
    name: "السيرة النبوية",
    icon: Compass,
    description: "أحاديث تتعلق بسيرة النبي صلى الله عليه وسلم وشمائله",
    count: 56,
    color: "indigo",
  },
  {
    id: "adab",
    name: "الآداب",
    icon: Coffee,
    description: "أحاديث تتعلق بآداب الطعام والشراب واللباس وغيرها",
    count: 31,
    color: "orange",
  },
]

// Helper function to get color classes based on category color and theme
const getColorClasses = (color: string, isDark: boolean) => {
  const colorMap: Record<
    string,
    {
      bg: string
      text: string
      border: string
      hoverBg: string
      darkBg: string
      darkText: string
      darkBorder: string
      darkHoverBg: string
    }
  > = {
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      hoverBg: "hover:bg-amber-100",
      darkBg: "bg-amber-900/20",
      darkText: "text-amber-400",
      darkBorder: "border-amber-800",
      darkHoverBg: "hover:bg-amber-800/30",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      hoverBg: "hover:bg-blue-100",
      darkBg: "bg-blue-900/20",
      darkText: "text-blue-400",
      darkBorder: "border-blue-800",
      darkHoverBg: "hover:bg-blue-800/30",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      hoverBg: "hover:bg-green-100",
      darkBg: "bg-green-900/20",
      darkText: "text-green-400",
      darkBorder: "border-green-800",
      darkHoverBg: "hover:bg-green-800/30",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      hoverBg: "hover:bg-purple-100",
      darkBg: "bg-purple-900/20",
      darkText: "text-purple-400",
      darkBorder: "border-purple-800",
      darkHoverBg: "hover:bg-purple-800/30",
    },
    cyan: {
      bg: "bg-cyan-50",
      text: "text-cyan-700",
      border: "border-cyan-200",
      hoverBg: "hover:bg-cyan-100",
      darkBg: "bg-cyan-900/20",
      darkText: "text-cyan-400",
      darkBorder: "border-cyan-800",
      darkHoverBg: "hover:bg-cyan-800/30",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-700",
      border: "border-pink-200",
      hoverBg: "hover:bg-pink-100",
      darkBg: "bg-pink-900/20",
      darkText: "text-pink-400",
      darkBorder: "border-pink-800",
      darkHoverBg: "hover:bg-pink-800/30",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      hoverBg: "hover:bg-yellow-100",
      darkBg: "bg-yellow-900/20",
      darkText: "text-yellow-400",
      darkBorder: "border-yellow-800",
      darkHoverBg: "hover:bg-yellow-800/30",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      hoverBg: "hover:bg-red-100",
      darkBg: "bg-red-900/20",
      darkText: "text-red-400",
      darkBorder: "border-red-800",
      darkHoverBg: "hover:bg-red-800/30",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      hoverBg: "hover:bg-indigo-100",
      darkBg: "bg-indigo-900/20",
      darkText: "text-indigo-400",
      darkBorder: "border-indigo-800",
      darkHoverBg: "hover:bg-indigo-800/30",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
      hoverBg: "hover:bg-orange-100",
      darkBg: "bg-orange-900/20",
      darkText: "text-orange-400",
      darkBorder: "border-orange-800",
      darkHoverBg: "hover:bg-orange-800/30",
    },
  }

  const colorClasses = colorMap[color] || colorMap.amber

  return isDark
    ? `${colorClasses.darkBg} ${colorClasses.darkText} ${colorClasses.darkBorder} ${colorClasses.darkHoverBg}`
    : `${colorClasses.bg} ${colorClasses.text} ${colorClasses.border} ${colorClasses.hoverBg}`
}

export default function CategoriesSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter hadiths by selected category
  const filteredHadiths = selectedCategory ? hadiths.filter((hadith) => hadith.category === selectedCategory) : []

  // Find the selected category object
  const selectedCategoryObj = categories.find((cat) => cat.id === selectedCategory)

  // Function to handle category selection
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    // Scroll to the hadith list with a small delay to ensure smooth animation
    setTimeout(() => {
      const element = document.getElementById("category-hadiths")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <section id="categories" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 font-arabic">
            تصنيفات الأحاديث
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-arabic">
            تصفح الأحاديث النبوية الشريفة حسب التصنيفات المختلفة لتسهيل الوصول إلى ما تبحث عنه
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div
                className={`relative h-full rounded-xl border p-6 transition-all duration-300 ${getColorClasses(
                  category.color,
                  isDark,
                )} ${
                  isDark ? "backdrop-blur-sm" : "shadow-md hover:shadow-lg"
                } cursor-pointer transform hover:scale-[1.02]`}
                onClick={() => handleCategoryClick(category.id)}
                role="button"
                tabIndex={0}
                aria-label={`عرض أحاديث ${category.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleCategoryClick(category.id)
                  }
                }}
              >
                {/* Animated background gradient on hover */}
                {hoveredCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-xl opacity-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: `radial-gradient(circle at center, ${
                        isDark ? "rgba(251,191,36,0.3)" : "rgba(217,119,6,0.2)"
                      } 0%, transparent 70%)`,
                    }}
                  />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isDark
                        ? `bg-${category.color}-900/30 text-${category.color}-400`
                        : `bg-${category.color}-100 text-${category.color}-600`
                    }`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 font-arabic">{category.name}</h3>
                    <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-gray-600"} font-arabic`}>
                      {category.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDark
                            ? `bg-${category.color}-900/40 text-${category.color}-400`
                            : `bg-${category.color}-100 text-${category.color}-600`
                        } font-arabic`}
                      >
                        {category.count} حديث
                      </span>
                      <button
                        className={`text-sm font-medium ${
                          isDark ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
                        } transition-colors duration-300 font-arabic flex items-center gap-1`}
                        onClick={(e) => {
                          e.stopPropagation() // Prevent triggering the parent div's onClick
                          handleCategoryClick(category.id)
                        }}
                      >
                        عرض الأحاديث
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hadith list for selected category */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              id="category-hadiths"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <div
                className={`p-4 rounded-xl mb-6 ${
                  isDark
                    ? `bg-${selectedCategoryObj?.color || "amber"}-900/20 border border-${selectedCategoryObj?.color || "amber"}-800/50`
                    : `bg-${selectedCategoryObj?.color || "amber"}-50 border border-${selectedCategoryObj?.color || "amber"}-200`
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    {selectedCategoryObj && (
                      <div
                        className={`p-2 rounded-lg ${
                          isDark
                            ? `bg-${selectedCategoryObj.color}-900/30 text-${selectedCategoryObj.color}-400`
                            : `bg-${selectedCategoryObj.color}-100 text-${selectedCategoryObj.color}-600`
                        }`}
                      >
                        <selectedCategoryObj.icon className="h-5 w-5" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold font-arabic">أحاديث {selectedCategoryObj?.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`p-2 rounded-full ${
                      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
                    } transition-colors duration-300`}
                    aria-label="إغلاق"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"} font-arabic`}>
                  {selectedCategoryObj?.description}
                </p>
                <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"} font-arabic`}>
                  تم العثور على {filteredHadiths.length} حديث
                </div>
              </div>

              <div className="space-y-4">
                {filteredHadiths.length > 0 ? (
                  filteredHadiths.map((hadith, index) => (
                    <motion.div
                      key={hadith.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-6 rounded-xl ${
                        isDark ? "bg-gray-900/70 border border-gray-800" : "bg-white border border-gray-200 shadow-md"
                      }`}
                    >
                      <p className="text-lg mb-4 leading-relaxed font-arabic">{hadith.text}</p>
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <p className={`font-medium ${isDark ? "text-amber-400" : "text-amber-600"} mb-1 font-arabic`}>
                            {hadith.narrator}
                          </p>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} font-arabic`}>
                            {hadith.source}
                          </p>
                        </div>
                        <div
                          className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs ${
                            isDark
                              ? `bg-${selectedCategoryObj?.color || "amber"}-900/30 text-${selectedCategoryObj?.color || "amber"}-400`
                              : `bg-${selectedCategoryObj?.color || "amber"}-100 text-${selectedCategoryObj?.color || "amber"}-700`
                          } font-arabic`}
                        >
                          {selectedCategoryObj?.name}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div
                    className={`p-12 rounded-xl text-center ${
                      isDark ? "bg-gray-900/70 border border-gray-800" : "bg-white border border-gray-200 shadow-md"
                    }`}
                  >
                    <p className="text-lg font-arabic">لا توجد أحاديث في هذا التصنيف حاليًا</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 bg-amber-500/5 blur-3xl -z-10 rounded-full"></div>
      <div className="absolute top-3/4 right-1/4 w-64 h-64 -translate-y-1/2 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
    </section>
  )
}

