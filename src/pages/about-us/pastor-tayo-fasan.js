import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import QuoteSection from '@/components/common/quoteSection';
import ImageTextSection from '@/components/common/imageTextSection';
import Footer from '@/components/layout/footer';

export default function PastorTayoFasan() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Pastor Tayo Fasan | EGFM USA</title>
        <meta
          name="description"
          content="Learn about Pastor Tayo Fasan, a dedicated leader at Eternal Glorious Fountain Ministry USA."
        />
        <meta property="og:title" content="Pastor Tayo Fasan | EGFM USA" />
        <meta
          property="og:description"
          content="Learn about Pastor Tayo Fasan, a dedicated leader at Eternal Glorious Fountain Ministry USA."
        />
      </Head>
      <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/pastor-tayo-fasan.jpg')] bg-cover bg-center opacity-20"
          onLoad={() => console.log('Hero background loaded: /images/pastor-tayo-fasan.jpg')}
        />
        <Navbar />
        <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-32 pb-16 md:pb-24 z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-white text-center">
              Pastor Tayo Fasan
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center">
              Pastor at EGFM
            </p>
          </div>
        </div>
      </div>
      <main className="flex-grow">
        <QuoteSection quote="In unity and faith, we reflect the glory of Christ." />
        <ImageTextSection
          title="Leadership"
          content="Pastor Tayo Fasan is a dedicated servant of God, committed to fostering unity and spiritual growth within Eternal Glorious Fountain Ministry (EGFM). His leadership strengthens local communities and supports the ministry’s mission."
          image="/images/pastor-tayo-fasan.jpg"
          imageAlt="Leadership"
          imageOnRight={false}
        />
        <ImageTextSection
          title="Mission"
          content="Pastor Tayo’s ministry focuses on encouraging believers to grow in faith and live out the doctrine of Christ, nurturing spiritual development within EGFM’s communities."
          image="/images/pastor-tayo-fasan.jpg"
          imageAlt="Mission"
          imageOnRight={true}
        />
        <ImageTextSection
          title="Global Impact"
          content="Through his leadership, Pastor Tayo Fasan supports EGFM’s global mission, contributing to the ministry’s outreach across Nigeria, the United Kingdom, Canada, Austria, Poland, the United States, and Trinidad and Tobago."
          image="/images/pastor-tayo-fasan.jpg"
          imageAlt="Global Impact"
          imageOnRight={false}
        />
      </main>
      <Footer />
    </div>
  );
}