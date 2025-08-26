import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AudioSection from './audioSection';

const MeetingCard = ({ meeting, index }) => (
  <div className="w-full md:w-[calc(50%-1rem)] group mb-8">
    <Link href={meeting.path}>
      <div
        className="relative w-full h-[350px] overflow-hidden p-1 transition-all duration-300 rounded-t-lg"
      >
        <Image
          src={meeting.image}
          alt={`${meeting.name} Image`}
          fill
          className="object-cover meeting-image transition-transform duration-300 group-hover:scale-105"
          placeholder="empty"
          priority={index === 0}
        />
      </div>
    </Link>
    {/* Summary Section */}
    <div className="bg-gray-50 p-6 shadow-lg rounded-b-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{meeting.name}</h3>
        <p className="text-lg text-[#90651b] font-semibold">{meeting.schedule}</p>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        {meeting.description}
      </p>
      <Link 
        href={meeting.path}
        className="inline-block bg-[#90651b] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#7a5518] hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
      >
        Learn More
      </Link>
    </div>
  </div>
);

export default function MeetingTabs({ meetings }) {
  const [activeTab, setActiveTab] = useState('weekly');

  const weeklyMeetings = meetings.filter((m) => m.category === 'weekly');
  const yearlyMeetings = meetings.filter((m) => m.category === 'yearly');

  const handleHover = (meetingName, isEntering) => {
    console.log(`${isEntering ? 'Enter' : 'Leave'} hover on ${meetingName}`);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center gap-8 py-8 bg-white">
        <button
          type="button"
          onClick={() => setActiveTab('weekly')}
          className={`text-lg font-semibold uppercase tracking-wide transition-colors duration-300 ${
            activeTab === 'weekly' ? 'text-[#90651b] border-b-2 border-[#90651b]' : 'text-gray-900 hover:text-[#90651b]'
          }`}
        >
          Weekly
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('yearly')}
          className={`text-lg font-semibold uppercase tracking-wide transition-colors duration-300 ${
            activeTab === 'yearly' ? 'text-[#90651b] border-b-2 border-[#90651b]' : 'text-gray-900 hover:text-[#90651b]'
          }`}
        >
          Yearly 
        </button>
      </div>
      {/* Content */}
      <div className="w-full px-4 md:px-8 lg:px-12">
        {activeTab === 'weekly' && (
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col md:flex-row md:gap-8 justify-center w-full">
              {weeklyMeetings.slice(0, 2).map((meeting, index) => (
                <MeetingCard key={index} meeting={meeting} index={index} />
              ))}
            </div>
            {weeklyMeetings[2] && (
              <div className="flex justify-center w-full mt-8">
                <div className="flex flex-col md:flex-row md:gap-8 justify-center w-full">
                  <MeetingCard meeting={weeklyMeetings[2]} index={2} />
                </div>
              </div>
            )}
            
            {/* Audio Section for Weekly Meetings */}
            <div className="w-full mt-12">
              <AudioSection 
                category="weekly" 
                title="Recent Weekly Meeting Messages"
                maxItems={6}
              />
            </div>
          </div>
        )}
        {activeTab === 'yearly' && (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row md:flex-wrap md:gap-8 justify-center">
              {yearlyMeetings.map((meeting, index) => (
                <MeetingCard key={index} meeting={meeting} index={index} />
              ))}
            </div>
            
            {/* Audio Section for Yearly Meetings */}
            <div className="w-full mt-12">
              <AudioSection 
                category="yearly" 
                title="Recent Yearly Meeting Messages"
                maxItems={6}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}