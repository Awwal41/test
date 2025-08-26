import Head from 'next/head';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Section from '@/components/common/section';
import ImageCarousel from '@/components/common/imageCarousel';
import { FaImages } from 'react-icons/fa';

/**
 * Photo Gallery Page
 * Features:
 * - Category filtering system
 * - Image grid with hover effects
 * - Featured image carousel
 * - Responsive design
 * - Clean layout without hero section
 */

// Sample data - Replace with actual data from your backend
const galleryImages = [
  {
    name: "Meeting Highlight 3",
    image: "/images/gallery/meeting-highlight-3.jpg",
    description: "Highlights from our recent fellowship meeting"
  },
  {
    name: "Meeting Highlight 3.1",
    image: "/images/gallery/meeting-highlight-3.1.jpg",
    description: "Special moments from our fellowship gathering"
  },
  {
    name: "Meeting Highlight 2",
    image: "/images/gallery/meeting-highlight-2.jpg",
    description: "Fellowship and worship moments"
  },
  {
    name: "Meeting Highlight 2.1",
    image: "/images/gallery/meeting-highlight-2.1.jpg",
    description: "Community gathering and fellowship"
  }
];

const categories = [
  "All",
  "Meetings",
  "Fellowship",
  "Worship",
  "Special Events"
];

export default function Gallery() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Photo Gallery | EGFM USA</title>
        <meta
          name="description"
          content="Browse photos from EGFM USA events, conferences, and services."
        />
      </Head>
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Section
          title={
            <div className="flex items-center justify-center gap-3">
              <FaImages className="text-3xl text-primary" />
              <span>Photo Gallery</span>
            </div>
          }
          content={
            <div className="space-y-8">
              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((item) => (
                  <div
                    key={item.name}
                    className="relative group overflow-hidden rounded-lg shadow-md"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Carousel */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-center mb-6">Featured Photos</h3>
                <ImageCarousel images={galleryImages} />
              </div>
            </div>
          }
          bgColor="bg-gray-50"
        />
      </main>
      
      <Footer />
    </div>
  );
} 