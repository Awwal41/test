import Link from 'next/link';
import PrimaryButton from '@/components/elements/primaryButton';

export default function MessageGrid({ messages }) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
        >
          <img
            src={message.image}
            alt={message.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{message.title}</h3>
            <Link href={message.link}>
              <PrimaryButton customStyle="bg-[#90651b] hover:bg-[#f59e0b] px-4 py-2 text-base w-full">
                Listen Now
              </PrimaryButton>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}