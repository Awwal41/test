import Head from "next/head";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import Section from "../components/common/section";
import PastorTile from "../components/common/pastorTile";
import ImageSection from "../components/common/imageSection";
import WatermarkBackground from "@/components/common/WatermarkBackground";
import SecondaryNav from "@/components/common/SecondaryNav";
import BeliefCard from "@/components/common/BeliefCard";
import { leaders } from "@/data/leaders";

export default function AboutUs() {
  const beliefs = [
    {
      title: "The Bible as God's Word",
      description:
        "We believe in the Bible as the inspired Word of God, the ultimate authority for faith and practice, and the complete revelation of God's will for humanity.",
      image: "/images/beliefs/bible.jpg",
    },
    {
      title: "The Trinity",
      description:
        "We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit. Each person is fully God, yet there is only one God.",
      image: "/images/beliefs/trinity.jpg",
    },
    {
      title: "Jesus Christ",
      description:
        "We believe in the deity of Jesus Christ, His virgin birth, sinless life, miracles, atoning death, resurrection, and ascension to the right hand of God.",
      image: "/images/beliefs/jesus.jpg",
    },
    {
      title: "Salvation by Grace",
      description:
        "We believe salvation is through faith in Jesus Christ alone, by God's grace. It is a free gift that cannot be earned through good works.",
      image: "/images/beliefs/salvation.jpg",
    },
    {
      title: "The Holy Spirit",
      description:
        "We believe in the ministry of the Holy Spirit, who empowers believers for godly living and service, guides us into all truth, and equips us for ministry.",
      image: "/images/beliefs/holy-spirit.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <WatermarkBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Head>
          <title>About EGFM USA | Our Mission and Leadership</title>
          <meta
            name="description"
            content="Learn about EGFM USA's mission, leadership, and global impact."
          />
          <meta property="og:title" content="About EGFM USA" />
          <meta
            property="og:description"
            content="Discover our story, leadership, and mission to spread the gospel worldwide."
          />
        </Head>

        {/* Hero Section with Navbar */}
        <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-b from-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/images/golden-dust.jpg')] bg-cover bg-center opacity-20" />
          <Navbar />
          <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-32 pb-16 md:pb-24">
            <div className="flex flex-col items-center">
              <div className="w-48 md:w-64 mb-1 md:mb-2">
                <img
                  src="/images/logo-white.png"
                  alt="EGFM Logo"
                  className="w-full h-auto"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-white text-center">
                About EGFM USA
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center">
                Our Mission and Leadership
              </p>
            </div>
          </div>
        </div>

        <SecondaryNav />

        <main className="flex-grow">
          <Section
            id="our-heart"
            title="Our Heart"
            content="Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for authentic worship, are passionate about the local church, and are on mission to see God\'s kingdom established across the earth. Eternal Glorious Fountain Ministry (EGFM) USA is a non-denominational Christian ministry dedicated to empowering believers to grow spiritually and conform to the image of Jesus Christ."
            bgColor="bg-white"
            textAlign="text-center"
          />
          <Section
            id="what-we-believe"
            title="What We Believe"
            content={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beliefs.map((belief, index) => (
                  <BeliefCard key={index} belief={belief} index={index} />
                ))}
              </div>
            }
            textAlign="text-center"
            bgColor="bg-gray-100"
          />
          <Section
            id="our-leadership"
            title="Our Leadership"
            content={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                {leaders.map((leader, index) => (
                  <PastorTile
                    key={index}
                    name={leader.name}
                    role={leader.role}
                    image={leader.image}
                    description={leader.description}
                    profilePath={leader.profilePath}
                  />
                ))}
              </div>
            }
            textAlign="text-center text-white"
            bgColor="bg-black"
          />
          <ImageSection
            image="/images/about-static.jpg"
            alt="EGFM Community"
            height="h-96"
            overlayOpacity="opacity-70"
            title="Our Story"
            content="Founded by Rev. Kayode and Rev. Helen Oyegoke, Eternal Glorious Fountain Ministry (EGFM) USA began with a vision to raise believers who reflect the image of Jesus Christ. From humble beginnings, EGFM has grown into a vibrant community across multiple regions, providing resources for spiritual maturity through teaching and preaching the gospel with apostolic and prophetic insights. Our journey is one of faith, worship, and a commitment to seeing God's kingdom established in hearts and homes."
          />
          <Section
            id="our-tools"
            title="Our Tools of Engagement"
            content="We equip believers through teaching and preaching the gospel of salvation with apostolic and prophetic insights. As a teaching and equipping center, not a denomination, EGFM USA supports believers active in their local churches. Our platforms, including School of the Spirit, Writing the Vision, and Revelation Hour, have empowered saints for over two decades."
            bgColor="bg-gray-100"
            textAlign="text-center"
          />
          <Section
            id="global-reach"
            title="To the Ends of the World"
            content="The Lord has expanded EGFM\'s reach beyond Nigeria to the UK, Canada, Austria, Poland, the US, and Trinidad and Tobago. Through yearly conferences and teaching meetings, we carry the torch of the Word of righteousness, lighting nations and ushering souls into God\'s Kingdom."
            bgColor="bg-white"
            textAlign="text-center"
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}
