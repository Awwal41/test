import Head from 'next/head';
import Section from '@/components/common/section';
import PrimaryButton from '@/components/elements/primaryButton';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Calendar() {
  // Get current month (July 2025) first and last days
  const today = new Date('2025-07-10T23:21:00-04:00'); // Current date: July 10, 2025, 11:21 PM EDT
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const formatDate = (date) => date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  const [startDate, setStartDate] = useState(formatDate(firstDay)); // 2025-07-01
  const [endDate, setEndDate] = useState(formatDate(lastDay)); // 2025-07-31
  const [category, setCategory] = useState('All Events');

  // Generate weekly events for 2025
  const generateWeeklyEvents = (start, end, dayOfWeek, name, time, location, link, description, category) => {
    const events = [];
    const current = new Date(start);
    while (current <= end) {
      if (current.getDay() === dayOfWeek) {
        events.push({
          name,
          date: formatDate(current),
          time,
          location,
          link,
          description,
          category,
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return events;
  };

  const yearStart = new Date('2025-01-01');
  const yearEnd = new Date('2025-12-31');

  const events = [
    // Day Star Arising: Every Monday (day 1) in 2025 at 8:00 PM CT
    ...generateWeeklyEvents(
      yearStart,
      yearEnd,
      1, // Monday
      'Day Star Arising',
      '8:00 PM CT',
      'Online',
      '/meetings//daystar-arising',
      'Weekly meetings every Monday to inspire believers to shine the light of Christ.',
      'Weekly Meetings'
    ),
    // OBED: Every Thursday (day 4) in 2025 at 8:00 PM ET
    ...generateWeeklyEvents(
      yearStart,
      yearEnd,
      4, // Thursday
      'OBED (Onboarding and Establishment in Doctrine)',
      '8:00 PM CT',
      'Online',
      '/meetings/obed',
      'Weekly in-depth Bible study every Thursday fostering obedience to God’s word.',
      'Weekly Meetings'
    ),
    // Light Up America: June 23–29, 2025, Morning (9:00 AM CT), Evening (6:00 PM CT)
    {
      name: 'Light Up America Morning',
      date: '2025-06-23',
      time: '9:00 AM CT',
      location: 'Aloft Katy Mills, TX',
      link: '/meetings/light-up-america',
      description: 'A week-long summer gathering to ignite faith across the nation.',
      category: 'Conferences',
    },
    {
      name: 'Light Up America Evening',
      date: '2025-06-23',
      time: '6:00 PM CT',
      location: 'Aloft Katy Mills, TX',
      link: '/meetings/light-up-america',
      description: 'A week-long summer gathering to ignite faith across the nation.',
      category: 'Conferences',
    },
    // Healing Light: June 18–21, 2025, Wed–Fri (6:00 PM CT), Sat (10:00 AM CT, 6:00 PM CT)
    {
      name: 'Healing Light Evening',
      date: '2025-06-18',
      time: '6:00 PM CT',
      location: 'online',
      link: '/meetings/healing-light',
      description: 'A teaching series dedicated to spiritual and physical restoration.',
      category: 'Conferences',
    },
    {
      name: 'Healing Light Evening',
      date: '2025-06-19',
      time: '6:00 PM CT',
      location: 'online',
      link: '/meetings/healing-light',
      description: 'A teaching series dedicated to spiritual and physical restoration.',
      category: 'Conferences',
    },
    {
      name: 'Healing Light Evening',
      date: '2025-06-20',
      time: '6:00 PM CT',
      location: 'online',
      link: '/meetings/healing-light',
      description: 'A teaching series dedicated to spiritual and physical restoration.',
      category: 'Conferences',
    },
    {
      name: 'Healing Light Morning',
      date: '2025-06-21',
      time: '10:00 AM CT',
      location: 'online',
      link: '/meetings/healing-light',
      description: 'A teaching series dedicated to spiritual and physical restoration.',
      category: 'Conferences',
    },
    {
      name: 'Healing Light Evening',
      date: '2025-06-21',
      time: '6:00 PM CT',
      location: 'online',
      link: '/meetings/healing-light',
      description: 'A teaching series dedicated to spiritual and physical restoration.',
      category: 'Conferences',
    },
    // Converge: December 8–14, 2025, Morning (9:00 AM CT), Evening (6:00 PM CT)
    {
      name: 'Converge Morning',
      date: '2025-12-08',
      time: '9:00 AM CT',
      location: 'Aloft Katy Mills, TX',
      link: '/meetings/converge',
      description: 'An annual winter conference uniting believers for worship and practical life skills.',
      category: 'Conferences',
    },
    {
      name: 'Converge Evening',
      date: '2025-12-08',
      time: '6:00 PM CT',
      location: 'Aloft Katy Mills, TX',
      link: '/meetings/converge',
      description: 'An annual winter conference uniting believers for worship and practical life skills.',
      category: 'Conferences',
    },
  ];

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateInRange = eventDate >= start && eventDate <= end;
    const categoryMatch = category === 'All Events' || event.category === category;
    return dateInRange && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Calendar | EGFM USA</title>
        <meta
          name="description"
          content="Explore upcoming EGFM USA events, including Light Up America, Converge, Healing Light, Day Star Arising, and OBED."
        />
        <meta property="og:title" content="Calendar | EGFM USA" />
        <meta
          property="og:description"
          content="Discover our schedule of transformative events and join us in person or online."
        />
      </Head>
      <Navbar />
      <main className="flex-grow mt-16">
        <Section
          id="upcoming-events"
          title="Upcoming Events"
          content={
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#90651b]"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#90651b]"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#90651b]"
                  >
                    <option value="All Events">All Events</option>
                    <option value="Conferences">Conferences</option>
                    <option value="Weekly Meetings">Weekly Meetings</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                      <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
                        <Link href={event.link} className="hover:text-[#90651b] transition-colors">
                          {event.name}
                        </Link>
                      </h3>
                      <p className="text-lg text-gray-700 mb-2">
                        <strong>Date:</strong>{' '}
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        at {event.time}
                      </p>
                      <p className="text-lg text-gray-700 mb-2">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="text-lg text-gray-700">{event.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-gray-700 text-center">No events found for the selected filters.</p>
                )}
              </div>
            </div>
          }
          bgColor="bg-gray-50"
          padding="py-12 sm:py-16"
        />
        <Section
          id="connect-online"
          title="Connect Online"
          content={
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Can’t join us in person? Stay connected with our events through live streams.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/streaming/video">
                  <PrimaryButton customStyle="bg-[#90651b] hover:bg-[#a67a2a] px-6 py-2 text-base">
                    Watch Live
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          }
          bgColor="bg-white"
          padding="py-12 sm:py-16"
        />
      </main>
      <Footer />
    </div>
  );
}