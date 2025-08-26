import Navbar from "@/components/layout/navbar";
import Head from "next/head";
import Hero from "@/components/home/hero";
import WhoWeAre from "@/components/home/WhoWeAre";
import JoinUs from "@/components/home/JoinUs";
import ContactUs from "@/components/home/ContactUs";
import ResourcesSection from "@/components/home/ResourcesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Pastors from "@/components/home/pastors";
import Footer from "@/components/layout/footer";
import FindExperience from "@/components/home/findExperience";
import Fancy from "@/components/home/fancy";
export default function Home() {
  return (
    <>
      <Head>
        <title>EGFM USA</title>
        <meta
          name="description"
          content="EGFM USA - Empowering and transforming lives through faith and ministry"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="relative h-full w-full">
        <Navbar />
        <Hero />
        <FindExperience />
        <Fancy />
        <WhoWeAre />
        <Pastors />
        <ContactUs />
        <JoinUs />
        {/* <ResourcesSection /> */}
        <NewsletterSection />
        <Footer />
      </main>
    </>
  );
}
