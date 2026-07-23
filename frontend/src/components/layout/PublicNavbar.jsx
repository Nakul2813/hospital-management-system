import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Departments", href: "#departments" },
  { label: "Doctors", href: "#doctors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-soft backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-clinical-600 text-white">
            <HeartPulse className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold text-ink-900">Smart Hospital</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink-600 hover:text-clinical-600">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="btn-ghost">
            Sign in
          </Link>
          <Link to="/register" className="btn-primary">
            Get started
          </Link>
        </div>

        <button className="p-2 md:hidden" onClick={() => setMobileOpen((o) => !o)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-ink-600" onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3">
              <Link to="/login" className="btn-secondary flex-1">
                Sign in
              </Link>
              <Link to="/register" className="btn-primary flex-1">
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
