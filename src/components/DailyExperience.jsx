const experiences = [
  { emoji: '👋', label: 'Warm Welcome' },
  { emoji: '🎨', label: 'Playful Learning' },
  { emoji: '💛', label: 'Emotional Growth' },
  { emoji: '📱', label: 'Daily Parent Connection' },
  { emoji: '🎉', label: 'Celebrating Milestones' },
  { emoji: '🌙', label: 'Comforting Routines' },
  { emoji: '🥦', label: 'Healthy Habits & Nutrition' },
  { emoji: '🖍️', label: 'Creative Exploration' },
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
          {experiences.map(({ emoji, label }) => (
            <div
              key={label}
              className="bg-white rounded-3xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{emoji}</span>
              <p className="mt-3 font-medium text-gray-700 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}