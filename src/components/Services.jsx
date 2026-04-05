import { Music, Apple, Baby, Trees, Moon, Shield } from 'lucide-react';

const services = [
  {
    icon: Music,
    title: 'Playful Activities',
    desc: 'Sensory play, music, and motor skill activities support your child\'s growth from infancy to toddlerhood.',
    bg: 'bg-softYellow',
  },
  {
    icon: Apple,
    title: 'Safe Nutrition',
    desc: 'Safe nutrition for infants to toddlers, carefully accommodating all dietary needs and preferences.',
    bg: 'bg-peach',
  },
  {
    icon: Baby,
    title: 'Infant Feeding',
    desc: 'A safe space for nutrition, from bottle feeding to introducing solids, accommodating dietary needs.',
    bg: 'bg-green-50',
  },
  {
    icon: Trees,
    title: 'Outdoor Exploration',
    desc: 'Safe outdoor space for fresh air and nature exploration with age-appropriate activities.',
    bg: 'bg-blue-50',
  },
  {
    icon: Moon,
    title: 'Restful Sleep',
    desc: 'Consistent nap schedules in safe sleep environments. Cozy rest areas designed for peaceful sleep.',
    bg: 'bg-purple-50',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    desc: 'Controlled access systems ensuring only authorized entry. Safe, monitored procedures for complete peace of mind.',
    bg: 'bg-red-50',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            Providing Good Qualities For Your Loving Kids
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Every service is thoughtfully designed to support your child's
            physical, emotional, and social well-being.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, bg }) => (
            <div key={title} className="card group cursor-pointer">
              <div className={`${bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className="text-primary" size={22} />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}