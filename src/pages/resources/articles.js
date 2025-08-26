import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { 
  FaNewspaper, 
  FaSearch, 
  FaFilter, 
  FaClock, 
  FaUser, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaBookmark, 
  FaShare, 
  FaTags,
  FaEye,
  FaHeart,
  FaChevronDown
} from 'react-icons/fa';

/**
 * Modern Articles Page
 * Features:
 * - Beautiful hero section with featured article
 * - Advanced search and filtering
 * - Modern card design with rich metadata
 * - Category-based organization
 * - Author profiles and social sharing
 * - Reading progress indicators
 * - Newsletter signup
 * - Related articles suggestions
 */

// Categories for filtering
const categories = [
  'All Articles',
  'Doctrine & Theology',
  'Christian Living',
  'Prayer & Worship',
  'Biblical Studies',
  'Faith & Growth',
  'Ministry & Service'
];

// Authors data
const authors = {
  'Rev. Kayode Oyegoke': {
    image: '/images/rev-kayode-oyegoke.jpg',
    bio: 'Senior Pastor and Founder',
    articles: 25
  },
  'Rev. Helen Oyegoke': {
    image: '/images/rev-helen-oyegoke.jpg',
    bio: 'Co-Pastor and Teacher',
    articles: 18
  },
  'Pastor Tayo Fasan': {
    image: '/images/pastor-tayo-fasan.jpg',
    bio: 'Associate Pastor',
    articles: 12
  }
};

// Enhanced sample data
const articles = [
  {
    id: 1,
    title: "Understanding the Doctrine of Christ: A Foundation for Faith",
    author: "Rev. Kayode Oyegoke",
    date: "2024-11-15",
    readTime: "8 min",
    category: "Doctrine & Theology",
    tags: ["Christ", "Doctrine", "Foundation", "Faith"],
    excerpt: "An in-depth exploration of the fundamental teachings of Christ and how they apply to our daily walk with God. Discover the essential truths that form the bedrock of Christian faith.",
    image: "/images/rev-kayode-oyegoke.jpg",
    views: 1250,
    likes: 89,
    featured: true,
    content: "Full article content here..."
  },
  {
    id: 2,
    title: "The Journey of Faith: Walking in Divine Purpose",
    author: "Pastor Tayo Fasan",
    date: "2024-11-12",
    readTime: "6 min",
    category: "Faith & Growth",
    tags: ["Faith", "Purpose", "Growth", "Journey"],
    excerpt: "Discovering the path of spiritual growth and maturity through the lens of biblical faith. Learn how to navigate life's challenges with unwavering trust in God.",
    image: "/images/pastor-tayo-fasan.jpg",
    views: 980,
    likes: 67,
    featured: false,
    content: "Full article content here..."
  },
  {
    id: 3,
    title: "Walking in Divine Love: Transforming Relationships",
    author: "Rev. Helen Oyegoke",
    date: "2024-11-10",
    readTime: "7 min",
    category: "Christian Living",
    tags: ["Love", "Relationships", "Transformation", "Community"],
    excerpt: "Understanding and practicing God's kind of love in our relationships and daily interactions. Explore how divine love can transform every aspect of your life.",
    image: "/images/rev-helen-oyegoke.jpg",
    views: 1100,
    likes: 78,
    featured: false,
    content: "Full article content here..."
  },
  {
    id: 4,
    title: "The Power of Prayer: Connecting with the Divine",
    author: "Rev. Kayode Oyegoke",
    date: "2024-11-08",
    readTime: "9 min",
    category: "Prayer & Worship",
    tags: ["Prayer", "Worship", "Connection", "Divine"],
    excerpt: "Unlock the transformative power of prayer in your spiritual journey. Learn practical approaches to deepening your communion with God through prayer.",
    image: "/images/rev-kayode-oyegoke.jpg",
    views: 1350,
    likes: 95,
    featured: false,
    content: "Full article content here..."
  },
  {
    id: 5,
    title: "Biblical Wisdom for Modern Living",
    author: "Pastor Tayo Fasan",
    date: "2024-11-05",
    readTime: "5 min",
    category: "Biblical Studies",
    tags: ["Wisdom", "Modern", "Living", "Scripture"],
    excerpt: "Applying timeless biblical principles to contemporary challenges. Discover how ancient wisdom provides guidance for today's complex world.",
    image: "/images/pastor-tayo-fasan.jpg",
    views: 850,
    likes: 52,
    featured: false,
    content: "Full article content here..."
  },
  {
    id: 6,
    title: "Serving with Purpose: Ministry in Action",
    author: "Rev. Helen Oyegoke",
    date: "2024-11-03",
    readTime: "6 min",
    category: "Ministry & Service",
    tags: ["Service", "Ministry", "Purpose", "Action"],
    excerpt: "Understanding your calling and serving God with passion and purpose. Learn how to identify and fulfill your unique role in God's kingdom.",
    image: "/images/rev-helen-oyegoke.jpg",
    views: 720,
    likes: 41,
    featured: false,
    content: "Full article content here..."
  }
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Get featured article
  const featuredArticle = articles.find(article => article.featured) || articles[0];
  const regularArticles = articles.filter(article => !article.featured);

  // Filter and sort articles
  const filteredArticles = regularArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Articles' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'popular':
          return b.views - a.views;
        case 'liked':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Articles | EGFM USA</title>
        <meta
          name="description"
          content="Explore our collection of spiritual articles and teachings from EGFM USA's ministers. Find insights on doctrine, Christian living, prayer, and biblical studies."
        />
        <meta property="og:title" content="Articles | EGFM USA" />
        <meta property="og:description" content="Spiritual articles and teachings for growth in faith" />
      </Head>
      <Navbar />
      
      {/* Hero Section with Featured Article */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featuredArticle.image}
            alt={featuredArticle.author}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#90651b] rounded-full p-3">
                  <FaNewspaper className="text-2xl text-white" />
                </div>
                <span className="bg-[#90651b] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured Article
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {featuredArticle.title}
              </h1>
              
              <div className="flex items-center gap-4 text-lg text-gray-300">
                <div className="flex items-center gap-2">
                  <FaUser className="text-[#90651b]" />
                  <span>{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#90651b]" />
                  <span>{featuredArticle.readTime} read</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye className="text-[#90651b]" />
                  <span>{featuredArticle.views.toLocaleString()} views</span>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href={`/resources/articles/${featuredArticle.id}`}
                  className="group bg-[#90651b] hover:bg-[#7a5518] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    Read Full Article
                  </span>
                </Link>
                
                <div className="flex gap-3">
                  <button className="group bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 p-4 rounded-xl transition-all duration-300 backdrop-blur-sm">
                    <FaBookmark className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="group bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 p-4 rounded-xl transition-all duration-300 backdrop-blur-sm">
                    <FaShare className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Author Card */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={authors[featuredArticle.author].image}
                      alt={featuredArticle.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{featuredArticle.author}</h3>
                    <p className="text-white/70">{authors[featuredArticle.author].bio}</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-white/90">
                  <div className="flex items-center justify-between">
                    <span>Published Articles</span>
                    <span className="font-semibold">{authors[featuredArticle.author].articles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Category</span>
                    <span className="bg-[#90651b] px-2 py-1 rounded text-sm">{featuredArticle.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Published</span>
                    <span>{formatDate(featuredArticle.date)}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.tags.map(tag => (
                      <span key={tag} className="bg-white/20 text-white px-2 py-1 rounded-md text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {/* Search and Filter Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title, content, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#90651b] focus:border-transparent text-lg bg-white shadow-sm"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <FaFilter className="text-gray-500" />
                    <span className="font-medium">Filters</span>
                    <FaChevronDown className={`text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showFilters && (
                    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 min-w-64 z-10">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#90651b] focus:border-transparent"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#90651b] focus:border-transparent"
                          >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Viewed</option>
                            <option value="liked">Most Liked</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Results Counter */}
            <div className="mt-6 text-gray-600">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All Articles' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-4">No Articles Found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Articles');
                  }}
                  className="px-6 py-3 bg-[#90651b] text-white rounded-lg hover:bg-[#7a5518] transition-colors font-medium"
                >
                  Show All Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/resources/articles/${article.id}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden border border-gray-100">
                      {/* Article Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.author}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#90651b] text-white px-3 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>

                        {/* Reading Time */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <FaClock className="text-[#90651b] text-xs" />
                            <span className="text-xs font-medium">{article.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#90651b] transition-colors leading-tight">
                          {article.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <FaUser className="text-[#90651b]" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-[#90651b]" />
                            <span>{formatDate(article.date)}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <FaEye className="text-[#90651b]" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaHeart className="text-[#90651b]" />
                              <span>{article.likes}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-[#90651b] font-medium text-sm group-hover:underline">
                            <span>Read More</span>
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="py-16 bg-gradient-to-r from-[#90651b] to-[#7a5518]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Stay Updated with Our Latest Articles
              </h2>
              <p className="text-xl text-white/90">
                Get notified when we publish new spiritual insights and teachings. 
                Join our community of believers growing in faith together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 text-gray-900"
                />
                <button className="bg-white text-[#90651b] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 