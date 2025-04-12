import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/events", label: t("nav.events") },
  ];

  return (
    <header className="border-b border-border bg-background text-foreground sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">webtres.uy</Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}  className="text-sm font-medium hover:text-primary transition-colors">{link.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button size="icon" variant="ghost" className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <nav className="only-mobile px-4 pb-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link key={link.href}  to={link.href} onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-primary transition-colors">{link.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
};
