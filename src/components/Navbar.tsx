import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowUpRight, Menu, X } from "lucide-react"
import facelogo from "../../src/components/facelogo.png"

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
  alwaysShow?: boolean // Add alwaysShow prop
}

const NAV_LINKS = [
  {
    name: "How it works",
    path: "/#how-it-works",
    isScroll: true,
  },
  { name: "Upload", path: "/upload" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Product", path: "#product" },
]

export default function Navbar({ scrollContainerRef, alwaysShow }: NavbarProps) {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (alwaysShow) {
      setIsVisible(true)
      setIsAtTop(true)
      return
    }
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
  }, [scrollContainerRef, alwaysShow])

  // Close mobile menu on route change or scroll
  useEffect(() => {
    if (!mobileMenuOpen) return
    const closeMenu = () => setMobileMenuOpen(false)
    window.addEventListener("resize", closeMenu)
    return () => window.removeEventListener("resize", closeMenu)
  }, [mobileMenuOpen])

  // Helper for handling nav link clicks
  function handleNavLinkClick(link: any, e: React.MouseEvent) {
    if (link.isScroll) {
      e.preventDefault()
      if (location.pathname === "/") {
        // Already on homepage, scroll
        const el = document.getElementById("how-it-works")
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // Navigate to homepage, then scroll after navigation
        navigate("/", { state: { scrollTo: "how-it-works" } })
      }
    }
  }

  useEffect(() => {
    // If navigated with scrollTo state, scroll after render
    if (location.pathname === "/" && (location.state as any)?.scrollTo) {
      const el = document.getElementById((location.state as any).scrollTo)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" })
        }, 100) // wait for render
      }
    }
  }, [location])

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 mx-auto w-11/12 max-w-6xl -translate-x-1/2 rounded-full px-4 transition-transform duration-300 ease-in-out",
        alwaysShow ? "translate-y-0" : (isVisible || isAtTop ? "translate-y-0" : "-translate-y-[150%]"),
        !isAtTop && "shadow-lg border border-foreground bg-background/90 backdrop-blur-md",
        isAtTop && "bg-transparent border-none shadow-none backdrop-blur-none"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-medium text-foreground">
          <img src={facelogo} alt="Faceable Logo" className="h-8 w-8" />
          <span className="text-lg" style={{ color: "#4285f4", fontFamily: 'Cal Sans, sans-serif' }}>Faceable</span>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link =>
            link.path.startsWith("/") ? (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-foreground hover:text-accent-foreground"
                onClick={link.isScroll ? (e) => handleNavLinkClick(link, e) : undefined}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.path}
                className="text-sm font-medium text-foreground hover:text-accent-foreground"
              >
                {link.name}
              </a>
            )
          )}
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-foreground"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
        <div className="hidden md:flex items-center gap-4">
          <Button
            to="/login"
            className="text-sm font-medium text-foreground hover:text-accent-foreground"
          >
            Login
          </Button>
          <Button className="rounded-full bg-foreground text-sm font-medium text-background flex items-center hover:text-background/70">
            Sign up <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Mobile menu overlay - ensure it closes menu and is fully hidden when closed */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />
      {/* Mobile menu dropdown with close button inside */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background shadow-md transition-transform duration-300 md:hidden flex flex-col gap-4 p-6 pt-20",
          mobileMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        )}
        style={{ borderRadius: "0 0 1.5rem 1.5rem" }}
        aria-label="Mobile menu"
      >
        {/* Close button inside dropdown */}
        <button
          className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-foreground"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="h-6 w-6 text-foreground" />
        </button>
        {NAV_LINKS.map(link =>
          link.path.startsWith("/") ? (
            <Link
              key={link.name}
              to={link.path}
              className="text-base font-medium text-foreground hover:text-accent-foreground py-2"
              onClick={link.isScroll ? (e) => { handleNavLinkClick(link, e); setMobileMenuOpen(false); } : () => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={link.name}
              href={link.path}
              className="text-base font-medium text-foreground hover:text-accent-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          )
        )}
        <Link
          to="/login"
          className="text-base font-medium text-foreground hover:text-accent-foreground py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          Log in
        </Link>
        <Button
          className="rounded-full bg-foreground text-background hover:bg-foreground/90 flex items-center w-full justify-center mt-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          Sign up <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </nav>
    </header>
  )
}
