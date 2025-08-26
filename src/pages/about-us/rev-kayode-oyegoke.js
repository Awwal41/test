import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import QuoteSection from '@/components/common/quoteSection';
import ImageTextSection from '@/components/common/imageTextSection';
import Footer from '@/components/layout/footer';

export default function RevKayodeOyegoke() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Our Leadership | EGFM USA</title>
        <meta
          name="description"
          content="Learn about Rev. Kayode Oyegoke, President of Eternal Glorious Fountain Ministry USA."
        />
        <meta property="og:title" content="Our Leadership | EGFM USA" />
        <meta
          property="og:description"
          content="Learn about Rev. Kayode Oyegoke, President of Eternal Glorious Fountain Ministry USA."
        />
      </Head>
      <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/rev-kayode-oyegoke.jpg')] bg-cover bg-center opacity-20"
          onLoad={() => console.log('Hero background loaded: /images/rev-kayode-oyegoke.jpg')}
        />
        <Navbar />
        <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-32 pb-16 md:pb-24 z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-white text-center">
              Our Leadership
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center">
              Guiding EGFM with Vision and Faith
            </p>
          </div>
        </div>
      </div>
      <main className="flex-grow">
        <QuoteSection quote="If you walk in faith with God, He will work wonders through you." />
        <ImageTextSection
          title="Leadership"
          content="Rev. Kayode Oyegoke is a servant of the Lord Jesus Christ, called to lead Eternal Glorious Fountain Ministry (EGFM) with a passion for teaching the doctrine of Christ. As the President of EGFM, he drives the mission to raise believers who reflect the image of Jesus."
          image="/images/rev-kayode-oyegoke.jpg"
          imageAlt="Leadership"
          imageOnRight={false}
        />
        <ImageTextSection
          title="Mission"
          content="EGFM is dedicated to equipping believers for spiritual maturity through apostolic and prophetic insights. Through platforms like School of the Spirit and Revelation Hour, Rev. Oyegoke empowers saints to live godly lives and advance God's kingdom."
          image="/images/rev-kayode-oyegoke.jpg"
          imageAlt="Mission"
          imageOnRight={true}
        />
        <ImageTextSection
          title="Global Impact"
          content="Under Rev. Oyegoke’s leadership, EGFM has expanded across Nigeria, the United Kingdom, Canada, Austria, Poland, the United States, and Trinidad and Tobago, spreading the gospel with apostolic and prophetic insights."
          image="/images/rev-kayode-oyegoke.jpg"
          imageAlt="Global Impact"
          imageOnRight={false}
        />
      </main>
      <Footer />
    </div>
  );
}