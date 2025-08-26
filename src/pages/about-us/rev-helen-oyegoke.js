import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import QuoteSection from '@/components/common/quoteSection';
import ImageTextSection from '@/components/common/imageTextSection';
import Footer from '@/components/layout/footer';

export default function RevHelenOyegoke() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Rev. Helen Oyegoke | EGFM USA</title>
        <meta
          name="description"
          content="Learn about Rev. Helen Oyegoke, Vice President of Eternal Glorious Fountain Ministry USA."
        />
        <meta property="og:title" content="Rev. Helen Oyegoke | EGFM USA" />
        <meta
          property="og:description"
          content="Learn about Rev. Helen Oyegoke, Vice President of Eternal Glorious Fountain Ministry USA."
        />
      </Head>
      <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/rev-helen-oyegoke.jpg')] bg-cover bg-center opacity-20"
          onLoad={() => console.log('Hero background loaded: /images/rev-helen-oyegoke.jpg')}
        />
        <Navbar />
        <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-32 pb-16 md:pb-24 z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-white text-center">
              Rev. Helen Oyegoke
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center">
              Vice President of EGFM
            </p>
          </div>
        </div>
      </div>
      <main className="flex-grow">
        <QuoteSection quote="Through unity in Christ, we build a stronger kingdom." />
        <ImageTextSection
          title="Leadership"
          content="Rev. Helen Oyegoke serves as the Vice President of Eternal Glorious Fountain Ministry (EGFM), bringing wisdom and compassion to her leadership role. She has been instrumental in nurturing believers to reflect Christ's character."
          image="/images/rev-helen-oyegoke.jpg"
          imageAlt="Leadership"
          imageOnRight={false}
        />
        <ImageTextSection
          title="Mission"
          content="Her ministry focuses on empowering believers, particularly women, to grow in faith and live out the doctrine of Christ through teaching and prophetic ministry."
          image="/images/rev-helen-oyegoke.jpg"
          imageAlt="Mission"
          imageOnRight={true}
        />
        <ImageTextSection
          title="Global Impact"
          content="Alongside her husband, Rev. Kayode Oyegoke, Rev. Helen has expanded EGFM’s reach across Nigeria, the United Kingdom, Canada, Austria, Poland, the United States, and Trinidad and Tobago, strengthening communities worldwide."
          image="/images/rev-helen-oyegoke.jpg"
          imageAlt="Global Impact"
          imageOnRight={false}
        />
      </main>
      <Footer />
    </div>
  );
}