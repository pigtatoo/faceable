import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

function Button({ children, className, ...props }: any) {
  return (
    <button className={cn("px-4 py-2 rounded", className)} {...props}>
      {children}
    </button>
  )
}

interface NavbarProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement>
}

export default function Navbar({ scrollContainerRef }: NavbarProps) {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const container = scrollContainerRef?.current || window
    const getScrollY = () =>
      scrollContainerRef?.current ? scrollContainerRef.current.scrollTop : window.scrollY
    const handleScroll = () => {
      const currentScrollY = getScrollY()
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsAtTop(currentScrollY <= 0)
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false)
          } else {
            setIsVisible(true)
          }
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [scrollContainerRef])

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 mx-auto w-11/12 max-w-6xl -translate-x-1/2 rounded-full px-4 transition-transform duration-300 ease-in-out border border-gray-300 shadow-md backdrop-blur-md bg-white/90",
        isVisible || isAtTop ? "translate-y-0" : "-translate-y-[150%]",
        !isAtTop && "shadow-lg border-gray-400"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <span className="text-lg font-semibold">Cluely</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            How it works
          </a>
          <a
            href="#use-cases"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Use cases
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Pricing
          </a>
          <a
            href="#help"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Help
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Log in
          </Link>
          <Button className="rounded-full bg-black text-white hover:bg-black/90 flex items-center">
            Sign up <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
