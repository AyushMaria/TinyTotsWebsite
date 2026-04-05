import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Location from './components/Location';
import Services from './components/Services';
import Features from './components/Features';
import DailyExperience from './components/DailyExperience';
import Programs from './components/Programs';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Stats />
      <Location />
      <Services />
      <Features />
      <DailyExperience />
      <Programs />
      <Testimonials />
      <Gallery />
      <Blog />
      <CTA />
      <Footer />
    </div>
  );
}