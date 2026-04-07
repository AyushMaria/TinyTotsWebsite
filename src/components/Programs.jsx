import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    id: 'infants',
    label: 'Infants Program',
    title: 'Infants',
    age: '0 months – 18 months',
    desc: 'Our infant program is all about providing cozy care and fun experiences for your little one right from the start. We use gentle play to help babies safely explore their world while building trust, curiosity, and confidence.',
    activities: ['Tummy Time & Development', 'Sensory Play', 'Language & Communication', 'Bonding & Comfort'],
    image: '/images/tinytots-image-26.jpg',
  },
  {
    id: 'toddlers',
    label: 'Toddlers Program',
    title: 'Toddlers',
    age: '18 months – 3 Years',
    desc: 'Our toddler program nurtures curiosity and supports early development through playful exploration. We provide a safe, caring space where toddlers build language, motor skills, and social connections.',
    activities: ['Creative Play', 'Story-time & Language', 'Outdoor Exploration', 'Social Interaction', 'Music & Movement'],
    image: '/images/tinytots-image-27.jpg',
  },
  {
    id: 'preschoolers',
    label: 'Preschoolers Program',
    title: 'Preschoolers',
    age: '3 Years – 5 Years',
    desc: 'Our preschool program builds a strong academic and social foundation through structured yet fun activities. Children develop critical thinking, collaboration, and a love of learning.',
    activities: ['Early Literacy', 'STEM Exploration', 'Art & Creativity', 'Group Projects', 'Physical Education'],
    image: '/images/tinytots-image-28.jpg',
  }
];

export default function Programs() {
  const [active, setActive] = useState('infants');
  const program = programs.find((p) => p.id === active);

  return (
    <section id="programs" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            Our Amazing Programs
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {programs.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                active === p.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Program Card */}
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-cream rounded-4xl p-8 md:p-12">
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-3xl font-bold text-gray-800">
                {program.title}
              </h3>
              <p className="text-primary font-medium mt-1">({program.age})</p>
            </div>
            <p className="text-gray-500 leading-relaxed">{program.desc}</p>
            <div>
              <p className="font-semibold text-gray-700 mb-3">Key Activities Include:</p>
              <ul className="space-y-2">
                {program.activities.map((act) => (
                  <li key={act} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    {act}
                  </li>
                ))}
              </ul>
            </div>
            <a href="#enroll" className="btn-primary inline-flex items-center gap-2">
              Learn More <ArrowRight size={16} />
            </a>
          </div>
          <img
            src={program.image}
            alt={program.title}
            className="rounded-4xl object-cover w-full h-80"
          />
        </div>
      </div>
    </section>
  );
}