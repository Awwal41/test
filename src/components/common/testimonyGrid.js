export default function TestimonyGrid({ testimonies }) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonies.map((testimony, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={testimony.image}
              alt={testimony.name}
              className="h-24 w-24 rounded-full object-cover mb-4 border-4 border-gray-200"
            />
            <div className="w-full flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-900">{testimony.name}</p>
              <p className="text-sm text-gray-500 mb-4">{testimony.state}</p>
            </div>
            <div className="w-full bg-gray-50 rounded-lg p-4 border-l-4 border-gray-500 text-left mt-2">
              <span className="text-3xl text-gray-500 align-top leading-none mr-2">“</span>
              <span className="text-gray-700 italic leading-relaxed">{testimony.quote}</span>
              <span className="text-3xl text-gray-500 align-bottom leading-none ml-2">”</span>
            </div>
          </div>
        ))}
      </div>
    );
  }