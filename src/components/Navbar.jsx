import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['Home', 'Our Mission', 'Blog', 'Vibe & Volley'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-pure-white/90 backdrop-blur-md border-b border-border-gray shadow-card rounded-b-2xl mb-8">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold text-near-black">Tiny Tots</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm text-secondary-gray hover:text-rausch-red transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#enroll" className="btn-primary hidden md:block">
          Enroll Now
        </a>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-pure-white px-6 pb-6 flex flex-col gap-4 shadow-card">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              className="text-secondary-gray hover:text-rausch-red text-sm py-2 border-b border-border-gray"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}