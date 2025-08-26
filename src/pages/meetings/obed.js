import Head from 'next/head';
import HeroSection from '@/components/common/heroSection';
import Section from '@/components/common/section';
import MessageGrid from '@/components/common/messageGrid';
import AudioSection from '@/components/common/audioSection';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function OBED() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>OBED | EGFM USA</title>
        <meta
          name="description"
          content="Join OBED, an EGFM USA meeting fostering obedience and devotion to God’s word."
        />
        <meta property="og:title" content="OBED | EGFM USA" />
        <meta
          property="og:description"
          content="Join OBED, fostering obedience and devotion."
        />
      </Head>
      <Navbar />
      <main className="flex-grow">
        <HeroSection
          image="/images/meeting-highlight-2.1.jpg"
          title="OBED"
          subtitle="Onboarding and Establishment in Doctrine"
          textPosition="bottom-left"
          height="min-h-[70vh] md:min-h-[80vh]"
          overlayOpacity="from-black/70"
        />
        <Section
          id="overview-service-times"
          title=""
          content={
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Every believer should be rooted and grounded in the word of God, always ready to give an answer to the hope that is in them. This hope can only be birthed in our souls by being taught the foundational principles of faith.
                  <br /><br />
                  Onboarding and Establishment in Doctrine (OBED) is a weekly in-depth Bible study for believers globally that focuses on building a strong foundation necessary for living by the word of Christ and the word of God (everlasting life). This platform aims at establishing believers in the doctrines of Christ and the Father, equipped with all that is necessary for a successful journey back to God.
                  <br /><br />
                  Join us every Thursday at 8:00 PM CT for an experience of a lifetime—it will surely be a time of heavenly blessings!
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Service Times</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-6 w-6 text-amber-500" />
                    <p className="text-lg text-gray-600">Every Thursday at 8:00 PM CT</p>
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
              category="OBED" 
              title="Recent OBED Messages"
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