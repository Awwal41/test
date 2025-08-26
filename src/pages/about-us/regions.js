import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import RegionsMap from "@/components/about-us/regions";
import AutoImageSlider from "@/components/common/autoImageSlider";
// Region data with custom images
export const regions = [
  {
    name: "West",
    description:
      "The West region of EGFM USA spreads the gospel across vibrant communities, fostering spiritual growth in diverse landscapes.",
    contact: { email: "west@egfmusa.org", phone: "+1-555-123-4567" },
    image: "/images/regions/west.png",
  },
  {
    name: "South",
    description:
      "The South region empowers believers to live out EGFM's mission, spreading the gospel with warmth and faith.",
    contact: { email: "south@egfmusa.org", phone: "+1-555-567-8901" },
    image: "/images/regions/south.png",
  },
  {
    name: "Midwest",
    description:
      "The Midwest region, the heartland of EGFM USA, strengthens communities through teachings that reflect Jesus' image.",
    contact: { email: "midwest@egfmusa.org", phone: "+1-555-345-6789" },
    image: "/images/regions/midwest.png",
  },
  {
    name: "Midsouth",
    description:
      "The Midsouth region, anchored in Memphis, unites believers to advance God's kingdom with passion and unity.",
    contact: { email: "midsouth@egfmusa.org", phone: "+1-555-456-7890" },
    image: "/images/regions/midsouth.png",
  },
  {
    name: "Northeast",
    description:
      "The Northeast region serves urban and rural believers, equipping them with the doctrine of Christ for godly living.",
    contact: { email: "northeast@egfmusa.org", phone: "+1-555-234-5678" },
    image: "/images/regions/northeast.png",
  },
];

// Images for the slider
const sliderImages = [
  "/images/regions-static.jpg",
  "/images/region-south.jpg",
  "/images/region-southeast.jpg",
  "/images/region-midsouth.jpg",
  "/images/region-midwest.jpg",
  "/images/region-northeast.jpg",
  "/images/about-static.jpg",
  "/images/about-bg.jpg",
  "/images/meetings-hero.jpg",
  "/images/golden-dust.jpg"
];

export default function Regions() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Our Regions | EGFM USA</title>
        <meta
          name="description"
          content="Explore EGFM USA's regions across the United States, including West, Northeast, Midwest, Midsouth, and South."
        />
        <meta property="og:title" content="Our Regions | EGFM USA" />
        <meta
          property="og:description"
          content="Explore EGFM USA's regions across the United States."
        />
      </Head>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="text-center py-8 bg-white relative z-10">
          <h1 className="text-4xl font-bold text-gray-700">Our Regions</h1>
          <p className="text-xl text-gray-500 mt-2">Global Reach in the USA</p>
        </div>
        <AutoImageSlider
          images={sliderImages}
          interval={4000}
          height="h-96"
          overlayOpacity="opacity-30"
          imagesPerView={3}
        />
        <RegionsMap
          regions={regions}
          color="bg-white"
          customClass="relative z-10 mt-[2rem]"
          padding="py-10 md:py-16"
        />
      </main>
      <Footer />
    </div>
  );
}
