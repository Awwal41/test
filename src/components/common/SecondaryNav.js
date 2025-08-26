import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SecondaryNav() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'our-heart', label: 'Our Heart' },
    { id: 'what-we-believe', label: 'What We Believe' },
    { id: 'our-leadership', label: 'Our Leadership' },
    { id: 'our-story', label: 'Our Story' },
    { id: 'our-tools', label: 'Our Tools' },
    { id: 'global-reach', label: 'Global Reach' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Set initial active section based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for navbar
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    // Call once on mount
    handleScroll();
    
    // Add scroll listener for better accuracy
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup: unobserve all sections and remove scroll listener
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 140; // Height of both navbars
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-[64px] md:top-[80px] z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'text-[#90651b] border-b-2 border-[#90651b]'
                  : 'text-gray-600 hover:text-[#90651b]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          <div className="flex items-center justify-between py-4">
            <span className="text-sm font-medium text-gray-600">
              {sections.find(s => s.id === activeSection)?.label || 'Menu'}
            </span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#90651b] transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 left-0 bg-white shadow-lg border-t">
              <div className="px-4 py-2 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      activeSection === section.id
                        ? 'bg-[#90651b] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 