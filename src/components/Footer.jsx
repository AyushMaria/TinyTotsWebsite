import { Mail, Phone } from 'lucide-react';

const FooterLinks = {
  Company: ['About Us', 'Our Team', 'Careers', 'Blog'],
  Programs: ['Infants Program', 'Toddlers Program', 'Preschoolers Program'],
  Support: ['Contact Us', 'FAQ', 'Privacy Policy', 'Terms of Service'],
};

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <span className="font-display text-xl font-semibold text-white">Nurturing</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            A safe, fun, and caring environment where safety, learning, and joy
            come together for your child's bright beginning.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-primary" />
            <span>hello@nurturing.care</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} className="text-primary" />
            <span>+1 (555) 000-1234</span>
          </div>
          <div className="flex gap-4 pt-2">
            {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-primary transition-colors">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(FooterLinks).map(([section, items]) => (
          <div key={section}>
            <h4 className="font-semibold text-white mb-4">{section}</h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Nurturing. All rights reserved. Built with ❤️ for little ones.
      </div>
    </footer>
  );
}