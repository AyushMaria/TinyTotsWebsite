
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-near-black text-pure-white p-4 shadow-lg z-50 rounded-t-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          We use cookies to ensure you get the best experience on our website. By continuing to use this site, you agree to our use of cookies.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="btn-primary bg-rausch-red hover:bg-deep-rausch text-pure-white text-sm py-2 px-5"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="btn-outline border-pure-white text-pure-white hover:bg-pure-white hover:text-near-black text-sm py-2 px-5"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
