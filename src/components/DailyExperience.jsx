import { Handshake, Palette, Heart, Smartphone, PartyPopper, Moon, Leaf, Brush } from 'lucide-react';

const experiences = [
  { icon: Handshake, label: 'Warm Welcome' },
  { icon: Palette, label: 'Playful Learning' },
  { icon: Heart, label: 'Emotional Growth' },
  { icon: Smartphone, label: 'Daily Parent Connection' },
  { icon: PartyPopper, label: 'Celebrating Milestones' },
  { icon: Moon, label: 'Comforting Routines' },
  { icon: Leaf, label: 'Healthy Habits & Nutrition' },
  { icon: Brush, label: 'Creative Exploration' },
];

export default function DailyExperience() {
  return (
    <section className="section-padding bg-peach">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            What Your Child Experiences
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Every day is filled with wonder, discovery, and joyful moments that
            gently nurture, inspire, and lovingly guide your little one to grow,
            learn, and flourish.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {experiences.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white rounded-3xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <Icon size={36} className="text-rausch-red mx-auto" />
              <p className="mt-3 font-medium text-gray-700 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}