import Head from 'next/head';
import HeroSection from '@/components/common/heroSection';
import Section from '@/components/common/section';
import TestimonyGrid from '@/components/common/testimonyGrid';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Rooted() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Rooted | EGFM USA</title>
        <meta
          name="description"
          content="Join Rooted, an EGFM USA regional class fostering spiritual growth and deep faith."
        />
        <meta property="og:title" content="Rooted | EGFM USA" />
        <meta
          property="og:description"
          content="Join Rooted, fostering spiritual growth and deep faith."
        />
      </Head>
      <Navbar />
      <main className="flex-grow">
        <HeroSection
          image="/images/regions-static.jpg"
          title="Rooted"
          subtitle="Growing Deep in Faith"
          textPosition="bottom-left"
          height="min-h-[70vh] md:min-h-[80vh]"
          overlayOpacity="from-black/70"
        />
        <Section
          id="overview-regional"
          title=""
          content={
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Rooted is a transformative regional class offered by EGFM USA, designed to deepen believers’ faith and establish them in the foundational truths of God’s word. Through intimate, community-based sessions, participants grow in their understanding of Christ’s teachings, equipping them to live out their faith with purpose and conviction.
                  <br /><br />
                  Led by dedicated regional leaders, Rooted classes provide a nurturing environment to explore scripture, foster spiritual growth, and build lasting connections with fellow believers. Whether you’re new to faith or seeking to deepen your walk, Rooted offers a pathway to a stronger, more vibrant relationship with God.
                  <br /><br />
                  Contact your regional coordinator to join a Rooted class near you and experience the joy of growing deep in faith!
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Join a Rooted Class</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="h-6 w-6 text-amber-500" />
                    <p className="text-lg text-gray-600">Rooted classes are regional</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-6 w-6 text-amber-500" />
                    <p className="text-lg text-gray-600">
                      Contact your region to participate in Rooted classes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
          bgColor="bg-gradient-to-b from-gray-50 to-gray-100"
          padding="py-16 sm:py-24"
        />
        <Section
          id="testimonies"
          title="Testimonies from Rooted"
          content={
            <TestimonyGrid
              testimonies={[
                {
                  name: 'Sarah Johnson',
                  state: 'Michigan',
                  image: '/images/regions-static.jpg',
                  quote: 'Rooted transformed my faith journey, connecting me with a community that feels like family.',
                },
                {
                  name: 'Michael Chen',
                  state: 'Ohio',
                  image: '/images/regions-static.jpg',
                  quote: 'Through Rooted, I found clarity in God’s word and strength to live out my purpose.',
                },
                {
                  name: 'Emily Davis',
                  state: 'California',
                  image: '/images/regions-static.jpg',
                  quote: 'The teachings in Rooted deepened my relationship with God in ways I never imagined.',
                },
              ]}
            />
          }
          bgColor="bg-white"
          padding="py-16 sm:py-24"
        />
      </main>
      <Footer />
    </div>
  );
}