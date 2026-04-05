import { MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pure-white text-near-black px-6 md:px-12 lg:px-24 py-16 shadow-card rounded-t-2xl">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-near-black mb-4">Contact Us</h2>
          <p className="text-secondary-gray leading-relaxed">
            We'd love to hear from you! Reach out to us for admissions, queries, or to schedule a visit.
          </p>
          <div className="flex items-start gap-3 text-secondary-gray">
            <MapPin size={20} className="text-rausch-red mt-1" />
            <p>
              Adalat Road, behind Royal Enfield showroom, Samadhan Colony, Konkanwadi, Chhatrapati Sambhaji Nagar, Maharashtra, India.
            </p>
          </div>
          <div className="flex items-center gap-3 text-secondary-gray">
            <Clock size={20} className="text-rausch-red" />
            <p>Hours: 09:30 am – 01:30 pm</p>
          </div>
        </div>

        {/* Google Maps Embed Placeholder */}
        <div className="w-full h-64 bg-light-surface rounded-xl shadow-card overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000.43503527263!2d75.33403325!3d19.86604245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd911f95328105d%3A0x6b4c3e8a7c29367!2sAdalat%20Rd%2C%20Konkanwadi%2C%20Chhatrapati%20Sambhaji%20Nagar%2C%20Maharashtra%20431005%2C%20India!5e0!3m2!1sen!2sus!4v1678912345678!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tiny Tots Kindergarten Location"
          ></iframe>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-border-gray mt-12 pt-6 text-center text-sm text-secondary-gray">
        © {new Date().getFullYear()} Tiny Tots Kindergarten. All rights reserved.
      </div>
    </footer>
  );
}