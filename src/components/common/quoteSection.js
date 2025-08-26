export default function QuoteSection({ quote }) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 italic">
            {quote}
          </p>
        </div>
      </section>
    );
  }