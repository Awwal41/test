import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Section from '@/components/common/section';
import MeetingTabs from '@/components/common/meetingTabs';
import { meetings } from '@/data/meetings';

export default function Meetings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Meetings | EGFM USA</title>
        <meta
          name="description"
          content="Join EGFM USA for transformative weekly and yearly meetings: Daystar Arising, OBED, Healing Light, Light Up America, and Converge."
        />
        <meta property="og:title" content="Meetings | EGFM USA" />
        <meta
          property="og:description"
          content="Discover upcoming meetings with EGFM USA."
        />
      </Head>
      <Navbar />
      <main className="flex-grow pt-12 md:pt-14">
        <Section
          content={<MeetingTabs meetings={meetings} />}
          bgColor="bg-white"
          textAlign="text-center"
          customClass="meetings-tabs-section relative z-10 px-0"
        />
      </main>
      <Footer />
    </div>
  );
}
