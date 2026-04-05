import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['Home', 'About', 'Programs', 'Services', 'Blog', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <span className="font-display text-xl font-semibold text-gray-800">Nurturing</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="btn-outline text-sm py-2 px-5">
            Contact Us
          </a>
          <a href="#enroll" className="btn-primary text-sm py-2 px-5">
            Enroll Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-cream px-6 pb-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-600 hover:text-primary text-sm py-2 border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="#enroll" className="btn-primary text-sm text-center mt-2">
            Enroll Now
          </a>
        </div>
      )}
    </nav>
  );
}