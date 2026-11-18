import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Leaf, MapPin, Menu, Phone, X } from "lucide-react";
import { business, navigation } from "../data";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Lorena Cleaning Services home"
    >
      <span className="brand-icon">
        <Leaf size={27} strokeWidth={1.3} />
      </span>
      <span className="brand-name">
        Lorena<span className="brand-subtitle">CLEANING SERVICES</span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onResize() {
      if (window.innerWidth >= 1024) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <div className="container flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <MapPin size={13} /> Your local cleaner in Ilford &amp; Redbridge
          </span>
          <a
            href={business.tel}
            className="topbar-phone flex items-center gap-2"
          >
            <Phone size={12} /> {business.phone}
          </a>
          <span className="concept-tag">WEBSITE CONCEPT</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-row">
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <a className="button button-primary header-quote" href="#quote">
            Get a Free Quote <ArrowUpRight size={16} />
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mobile-nav"
          hidden={!open}
        >
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="#quote"
            className="button button-primary"
            onClick={() => setOpen(false)}
          >
            Get a Free Quote <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
    </>
  );
}
