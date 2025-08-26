import Head from "next/head";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/common/hero";
import Section from "@/components/common/section";
import PastorTile from "@/components/common/pastorTile";
import ImageSection from "@/components/common/imageSection";

export default function WhoWeAre() {
  const beliefs = [
    "We believe in the Bible as the inspired Word of God.",
    "We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit.",
    "We believe in the deity of Jesus Christ, His virgin birth, sinless life, miracles, atoning death, resurrection, and ascension.",
    "We believe salvation is through faith in Jesus Christ.",
    "We believe in the ministry of the Holy Spirit, empowering believers for godly living and service.",
  ];

  const pastors = [
    {
      name: "Rev. Kayode Oyegoke",
      role: "President",
      image: "/images/rev-kayode-oyegoke.jpg",
      description:
        "Rev. Kayode Oyegoke is a servant of the Lord Jesus with a passion for teaching the doctrine of Christ, driving EGFM’s mission to raise sons like Jesus.",
    },
    {
      name: "Rev. Helen Oyegoke",
      role: "Vice President",
      image: "/images/rev-helen-oyegoke.jpg",
      description:
        "Rev. Helen Oyegoke serves alongside her husband, guiding believers with compassion and wisdom as a mother and role model.",
    },
    {
      name: "Pastor Tayo Fasan",
      role: "Pastor",
      image: "/images/pastor-tayo-fasan.jpg",
      description:
        "Pastor Tayo Fasan fosters unity and spiritual development, supporting EGFM’s mission across regions.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
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
      <Navbar />
      <main className="flex-grow">
        <Hero
          title="About EGFM USA"
          image="/images/about-bg.jpg"
          logo="/images/logo-white.png"
          height="h-[800px]"
          overlayOpacity="opacity-50"
        />
        <Section
          title="OUR HEART"
          content="Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for authentic worship, are passionate about the local church, and are on mission to see God’s kingdom established across the earth. Eternal Glorious Fountain Ministry (EGFM) USA is a non-denominational Christian ministry dedicated to empowering believers to grow spiritually and conform to the image of Jesus Christ."
          bgColor="bg-white"
          textAlign="text-center"
        />
        <Section
          title="WHAT WE BELIEVE"
          content={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {beliefs.map((belief, index) => (
                <p key={index} className="text-lg text-gray-700">
                  {belief}
                </p>
              ))}
            </div>
          }
          bgColor="bg-gray-100"
        />
        <Section
          id="leadership"
          title="OUR LEADERSHIP"
          content={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastors.map((pastor, index) => (
                <PastorTile
                  key={index}
                  name={pastor.name}
                  role={pastor.role}
                  image={pastor.image}
                  description={pastor.description}
                />
              ))}
            </div>
          }
          bgColor="bg-white"
        />
        <ImageSection
          image="/images/about-static.jpg"
          alt="EGFM Community"
          height="h-96"
          overlayOpacity="opacity-30"
        />
        <Section
          title="OUR STORY"
          content="Founded by Rev. Kayode and Rev. Helen Oyegoke, Eternal Glorious Fountain Ministry (EGFM) USA began with a vision to raise believers who reflect the image of Jesus Christ. From humble beginnings, EGFM has grown into a vibrant community across multiple regions, providing resources for spiritual maturity through teaching and preaching the gospel with apostolic and prophetic insights. Our journey is one of faith, worship, and a commitment to seeing God’s kingdom established in hearts and homes."
          bgColor="bg-gray-100"
          textAlign="text-center"
        />
        <Section
          title="OUR TOOLS OF ENGAGEMENT"
          content="We equip believers through teaching and preaching the gospel of salvation with apostolic and prophetic insights. As a teaching and equipping center, not a denomination, EGFM USA supports believers active in their local churches. Our platforms, including School of the Spirit, Writing the Vision, and Revelation Hour, have empowered saints for over two decades."
          bgColor="bg-white"
          textAlign="text-center"
        />
        <Section
          title="TO THE ENDS OF THE WORLD"
          content="The Lord has expanded EGFM’s reach beyond Nigeria to the UK, Canada, Austria, Poland, the US, and Trinidad and Tobago. Through yearly conferences and teaching meetings, we carry the torch of the Word of righteousness, lighting nations and ushering souls into God’s Kingdom."
          bgColor="bg-gray-100"
          textAlign="text-center"
        />
      </main>
      <Footer />
    </div>
  );
}
