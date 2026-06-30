import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#stories", label: "Success Stories" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="#top" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="EMMA TOUR AND TRAVEL AGENCY logo"
            width={48}
            height={48}
            priority
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-bold tracking-wide text-brand-navy">
              EMMA TOUR AND TRAVEL AGENCY
            </span>
            <span className="text-xs font-medium text-brand-orange">
              Say Yes To New World!
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-navy md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-brand-orange px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy"
        >
          Plan My Trip
        </a>
      </div>
    </header>
  );
}
