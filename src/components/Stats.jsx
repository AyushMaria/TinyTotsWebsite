const stats = [
  { value: '20+', label: 'Years Of Experience' },
  { value: '25K+', label: 'Smiles Shared' },
  { value: '8', label: 'Total Groups' },
  { value: '98%', label: 'Parent Satisfaction' },
];

export default function Stats() {
  return (
    <section className="bg-premium-sage mx-6 md:mx-12 lg:mx-24 rounded-4xl py-14 px-8 my-4 text-premium-almond">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="font-display text-3xl font-bold text-premium-almond">
          Numbers That Tell Our Story
        </h2>
        <p className="text-premium-almond/80 mt-3 max-w-xl mx-auto">
          Behind every number is a child's laugh, a parent's peace of mind, and
          a team that truly cares every single day.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-display text-5xl font-bold text-premium-almond">{value}</p>
            <p className="text-premium-almond/80 mt-2 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}