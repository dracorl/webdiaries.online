import {Button} from "@/components/ui/button"
import {motion, useAnimation} from "framer-motion"
import {useModal} from "../../contexts/ModalContext"
import SignUpForm from "../forms/SignUpForm"
import {useAuth} from "@/contexts/AuthContext"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {Card, CardContent} from "@/components/ui/card"
import {
  Pen,
  FileText,
  BarChart3,
  Calendar,
  Clock,
  ArrowUpRight
} from "lucide-react"

const blogs = [
  {
    title: "Retro Tutkunları İçin: Commodore 64 Tamiri Nasıl Yapılır?",
    description:
      "Commodore 64'ünüzü Hayata Döndürmek: Adım Adım Tamir Rehberi...",
    date: "Dec 22, 2024",
    readTime: "5 min read",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Commodore-64-Computer-FL.png",
    link: "https://enginyuksel.webdiaries.online/blog/retro-tutkunlar-iin-commodore-64-tamiri-nasl-yaplr"
  },
  {
    title: "Best Anytime Baked Chicken Meatballs",
    description: "These baked chicken meatballs are the BEST!",
    date: "Sep 7, 2024",
    readTime: "7 min read",
    imageUrl:
      "https://pinchofyum.com/cdn-cgi/image/width=680,height=99999,fit=scale-down/wp-content/uploads/Baked-Chicken-Meatballs-with-Sauce.jpg",
    link: "https://enginyuksel.webdiaries.online/blog/best-anytime-baked-chicken-meatballs"
  },
  {
    title: "Tibet Travel Tips: A First-Timer's Guide",
    description: "Everything you need to know before visiting Tibet",
    date: "Sep 10, 2024",
    readTime: "7 min read",
    imageUrl: "https://media.odynovotours.com/article/30000/tibet_27710.jpg",
    link: "https://enginyuksel.webdiaries.online/blog/tibet-travel-tips-a-firsttimers-guide"
  }
]

export default function Landing() {
  const {loggedIn} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) navigate("/posts")
  }, [loggedIn])
  const {openModal} = useModal()
  const signUpAction = () => {
    openModal("Sign Up", "Create an account to start writing", <SignUpForm />)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8}}
              className="mb-4 md:mb-6"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                <span className="font-arOne">Share Your Thoughts</span>
                <span className="font-vibes text-gray-900 block mt-2 md:mt-5">
                  Freely
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.5}}
              className="mb-6 md:mb-8"
            >
              <WritingHandSVG className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80" />
            </motion.div>

            <div className="space-y-4">
              <Button
                onClick={signUpAction}
                className="relative z-10 text-base md:text-lg px-6 py-4 md:px-8 md:py-6 font-arOne"
              >
                Start for Free
              </Button>
              <p className="text-gray-600 text-xs md:text-sm mt-2 font-arOne">
                Creating an account takes just 30 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Pen className="w-12 h-12" />}
            title="Easy Writing"
            description="Simple and fast writing experience with Markdown support"
          />
          <FeatureCard
            icon={<FileText className="w-12 h-12" />}
            title="Customizable Blog"
            description="Create your unique blog with theme and layout tools"
          />
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12" />}
            title="Detailed Analytics"
            description="Track reader statistics and performance metrics"
          />
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-arOne">
          Featured Blogs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-arOne">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </section>
    </div>
  )
}

const WritingHandSVG = ({className}) => {
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // çizgiyi oluştur
        await controls.start({
          pathLength: 1,
          opacity: 1,
          transition: {duration: 3, ease: "easeInOut"}
        })
        // kısa bekle
        await new Promise(r => setTimeout(r, 800))
        // çizgiyi çöz
        await controls.start({
          pathLength: 0,
          opacity: 0,
          transition: {duration: 1.2, ease: "easeInOut"}
        })
        await new Promise(r => setTimeout(r, 1000))
      }
    }
    sequence()
  }, [controls])

  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      fill="none"
      strokeWidth="2"
    >
      <defs>
        <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* dalgalı çizgi */}
      <motion.path
        d="M10 60 Q40 30 70 60 T130 60 T190 40"
        stroke="url(#flowGradient)"
        strokeLinecap="round"
        animate={controls}
        initial={{pathLength: 0, opacity: 0}}
      />

      {/* fikir noktaları */}
      {[...Array(4)].map((_, i) => (
        <motion.circle
          key={i}
          cx={60 + i * 30}
          cy={40 - i * 5}
          r="2"
          fill="url(#flowGradient)"
          initial={{opacity: 0, scale: 0, y: 10}}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 1.2],
            y: [-10, -20 - i * 5]
          }}
          transition={{
            duration: 2,
            delay: 1 + i * 0.3,
            repeat: Infinity,
            repeatDelay: 2.5
          }}
        />
      ))}
    </svg>
  )
}

// FeatureCard Component
const FeatureCard = ({icon, title, description}) => (
  <motion.div whileHover={{scale: 1.05}}>
    <Card className="font-arOne bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-black h-full">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="mb-4">{icon}</div>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)

const BlogCard = ({title, description, date, readTime, imageUrl, link}) => (
  <motion.div whileHover={{scale: 1.05}} className="h-full">
    <Card className="h-full overflow-hidden group cursor-pointer border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Blog Image */}
          <div className="relative overflow-hidden border-b-2 border-gray-300">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
              {description}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </a>
    </Card>
  </motion.div>
)
