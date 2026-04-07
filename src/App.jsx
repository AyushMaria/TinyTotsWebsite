import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurMission from './components/OurMission';
import Stats from './components/Stats';
import Location from './components/Location';
import Services from './components/Services';
import Features from './components/Features';
import DailyExperience from './components/DailyExperience';
import Programs from './components/Programs';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import BlogPage from './components/BlogPage';
//import VibeAndVolley from './components/VibeAndVolley';
import ContactForm from './components/ContactForm';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

export default function App() {
  return (
    <div className="min-h-screen bg-pure-white">
      <Navbar />
      <Hero />
      <OurMission /> {/* Our Mission */}
      <Services /> {/* Our Philosophy */}
      <Testimonials /> {/* Our Teachers */}
      <Features /> {/* Our Facilities */}
      <Gallery /> {/* Photo Gallery */}
      <BlogPage /> {/* Blog Page */}
      {/* <VibeAndVolley /> */} {/* Vibe & Volley Page */}
      <ContactForm /> {/* Contact Form */}
      <Footer />
      <CookieConsent />
    </div>
  );
}