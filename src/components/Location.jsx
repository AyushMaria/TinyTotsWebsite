import { MapPin, Clock } from 'lucide-react';

export default function Location() {
  return (
    <section className="section-padding max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div className="rounded-4xl overflow-hidden h-80 lg:h-full min-h-72">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25987368715491!3d40.69767006458873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '320px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-4xl"
        />
      </div>
      <div className="space-y-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
          Where Little Hearts Grow with Love
        </h2>
        <p className="text-gray-500 leading-relaxed">
          We offer a nurturing space where every child feels safe, inspired to
          grow, explore, learn, and thrive with joy and confidence.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-peach rounded-2xl p-4">
            <MapPin className="text-primary shrink-0" size={20} />
            <span className="text-gray-700 font-medium">Sunshine Ln, Greenfield</span>
          </div>
          <div className="flex items-center gap-3 bg-softYellow rounded-2xl p-4">
            <Clock className="text-primary shrink-0" size={20} />
            <span className="text-gray-700 font-medium">Mon–Fri: 9:00 AM – 3:00 PM</span>
          </div>
        </div>
        <a href="#contact" className="btn-primary inline-block">
          Get Directions
        </a>
      </div>
    </section>
  );
}