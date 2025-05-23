import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#features", label: "How it works" },
  { href: "/#usage", label: "Upload" },
  { href: "/pricing", label: "Dashboard" },
  { href: "/help-center", label: "Products" },
];

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && visible && currentScrollY > 100) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY && !visible) {
        setVisible(true);
      }

      setScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const throttledScroll = () => {
      if (!timeout) {
        timeout = setTimeout(() => {
          handleScroll();
          timeout = null;
        }, 100);
      }
    };

  }, [lastScrollY, visible]);

  return (
    <nav
      className={`fixed w-full bg-background/80 backdrop-blur-sm transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
        } ${scrolled ? "shadow-sm" : ""} top-0 z-50`}
    >
      <div className="flex items-center justify-between p-3 lg:p-2">
        {/* Logo Section */}
        <div className="flex lg:flex-1 ml-2 -mt-0.5">
          <Link
            to="/"
            className="flex items-center gap-x-0.5 transition border-b border-transparent hover:border-black font-aeonik"
          >
            <span className="mt-1.5 text-lg font-medium transition font-aeonik">
              faceable
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <X className="size-5.5 mr-1 outline-none" />
            ) : (
              <Menu className="size-5.5 mr-1 outline-none" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12 font-aeonik">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm/6 font-semibold text-foreground/60 transition hover:text-foreground ${pathname === link.href.split("#")[0] ? "border-black" : ""
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-5 font-aeonik">
          <a
            href="https://app.cluely.com/login"
            className="text-sm/6 font-semibold text-foreground transition border-b border-transparent hover:border-black"
          >
            Log in
          </a>
          <a
            href="https://app.cluely.com/signup"
            className="flex px-2 py-1 gap-x-1 text-sm/6 font-semibold rounded-full text-white bg-black hover:opacity-86"
          >
            Sign up
          </a>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden fixed inset-x-0 top-14 bg-white shadow-lg transition-all duration-300 ease-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm/6 font-semibold text-zinc-900 py-2 font-aeonik"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-zinc-200">
              <a
                href="https://app.cluely.com/login"
                className="block text-sm/6 font-semibold text-zinc-900 py-2 font-aeonik"
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </a>
              <a
                href="https://app.cluely.com/signup"
                className="flex items-center px-3 py-2 text-sm/6 font-semibold rounded-full text-white bg-black hover:opacity-86 font-aeonik"
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
