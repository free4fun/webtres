import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MdMenu, MdClose } from "react-icons/md";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/community", label: t("nav.community") },
    { href: "/contribute", label: t("nav.contribute") },
    { href: "/events", label: t("nav.events") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="border-b border-border bg-background text-foreground sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
        <img src="/images/webtres.png" alt="Webtres logo" className="w-6 h-6 sm:w-7 sm:h-7" />
        webtres
      </Link>


        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}  className="text-sm font-medium hover:text-primary transition-colors">{link.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button size="icon" variant="ghost" className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdClose className="w-5 h-5" /> : <MdMenu className="w-5 h-5" />}
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
