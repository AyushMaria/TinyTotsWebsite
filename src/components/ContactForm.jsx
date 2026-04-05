
import { Upload } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted! (File upload not actually handled)');
    setFileName('');
    e.target.reset();
  };

  return (
    <section id="contact-form" className="section-padding bg-pure-white py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Placeholder */}
        <div className="relative">
          <img
            src="/images/tinytots-image-77.jpg"
            alt="Contact Us"
            className="rounded-2xl object-cover w-full h-96 shadow-card"
          />
        </div>

        {/* Contact Form */}
        <div className="card p-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-near-black leading-tight mb-6">
            Get in Touch
          </h2>
          <p className="text-secondary-gray text-lg leading-relaxed mb-8">
            Have questions or want to learn more? Fill out the form below and we'll get back to you shortly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-near-black mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-rausch-red focus:border-transparent transition-all"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-near-black mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-rausch-red focus:border-transparent transition-all"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="file-attachment" className="block text-sm font-medium text-near-black mb-2">
                File Attachment (Optional)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="file-attachment"
                  name="file-attachment"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-attachment"
                  className="btn-outline flex items-center gap-2 cursor-pointer"
                >
                  <Upload size={18} />
                  <span>{fileName || 'Choose File'}</span>
                </label>
                {fileName && (
                  <button
                    type="button"
                    onClick={() => setFileName('')}
                    className="text-rausch-red text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
