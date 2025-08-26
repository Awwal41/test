import Head from 'next/head';
import HeroSection from '@/components/common/heroSection';
import Section from '@/components/common/section';
import MessageGrid from '@/components/common/messageGrid';
import AudioSection from '@/components/common/audioSection';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function DayStarArising() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Day Star Arising | EGFM USA</title>
        <meta
          name="description"
          content="Discover Day Star Arising, an EGFM USA meeting inspiring believers to shine brightly."
        />
        <meta property="og:title" content="Day Star Arising | EGFM USA" />
        <meta
          property="og:description"
          content="Discover Day Star Arising, inspiring believers to shine."
        />
      </Head>
      <Navbar />
      <main className="flex-grow">
        <HeroSection
          image="/images/meeting-highlight-2.1.jpg"
          title="Day Star Arising"
          subtitle="with Pastor Tayo Fasan"
          textPosition="bottom-left"
        />
        <Section
          id="overview-service-times"
          title=""
          content={
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  After Adam and Eve fell in the garden of God, they yielded the governance and dominion of this present world to the devil. As a result, through the power of sin (and death) and hell (and death), men’s souls became subject to the dictates of principalities, powers, rulers of the darkness of this world, and spiritual wickedness. But praise be to God, through the publishing of the gospel of peace and the gospel of salvation, He is saving man again unto the uttermost.
                  <br /><br />
                  Daystar Arising is an expression of the EGFMUSA ministry where God, through our Pastors and Teachers, baptizes us with words that will see us become Christ in our souls, unto a stature that can hope for the glory of God (salvation) and eventually sit on the throne of God.
                  <br /><br />
                  Join us every Monday at 8:00 PM CT as we receive immensely from the Lord and His servants—it promises to be a heart-changing experience!
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Meeting Times</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-6 w-6 text-amber-500" />
                    <p className="text-lg text-gray-600">Every Monday at 8:00 PM CT</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GlobeAltIcon className="h-6 w-6 text-amber-500" />
                    <p className="text-lg text-gray-600">Online</p>
                  </div>
                </div>
              </div>
            </div>
          }
          bgColor="bg-gradient-to-b from-gray-50 to-gray-100"
          padding="py-16 sm:py-24"
        />
        <Section
          id="recent-messages"
          title=""
          content={
            <AudioSection 
              category="Daystar Arising" 
              title="Recent Daystar Arising Messages"
              maxItems={6}
            />
          }
          bgColor="bg-gray-50"
          padding="py-16 sm:py-24"
        />
      </main>
      <Footer />
    </div>
  );
}