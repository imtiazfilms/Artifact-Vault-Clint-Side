const timelineData = [
  { year: "3000 BC", event: "Earliest known artifacts from the Indus Valley Civilization." },
  { year: "500 BC", event: "Greek and Roman civilizations flourish." },
  { year: "1200 AD", event: "Medieval era artifacts such as swords and manuscripts." },
  { year: "1700 AD", event: "Enlightenment period with scientific instruments and documents." },
  { year: "1900 AD", event: "Industrial age machines and cultural relics." },
  { year: "2000 AD", event: "Digital era begins, preserving data and electronic artifacts." }, // 🔥 new entry
];


const HistoryTimeline = () => {
  return (
    <section className="my-20 px-6 lg:px-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-base-content">🕰️ Timeline of History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {timelineData.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white rounded-xl shadow-xl p-6 relative hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-amber-700 font-bold px-4 py-1 rounded-full shadow-md">
              {item.year}
            </div>
            <p className="text-center mt-6 font-medium">{item.event}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryTimeline;
