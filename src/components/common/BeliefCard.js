import Image from "next/image";

export default function BeliefCard({ belief, index }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-40 w-full">
        <Image
          src={belief.image}
          alt={belief.title}
          fill
          className="object-cover"
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{belief.title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {belief.description}
        </p>
      </div>
    </div>
  );
}
