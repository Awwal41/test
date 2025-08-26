import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    {
      href: "https://facebook.com/egfmusa",
      icon: FaFacebook,
      hoverColor: "hover:bg-blue-600",
      label: "Facebook",
    },
    {
      href: "https://x.com/egfmusa",
      icon: FaTwitter,
      hoverColor: "hover:bg-gray-600",
      label: "X (Twitter)",
    },
    {
      href: "https://instagram.com/egfmusa",
      icon: FaInstagram,
      hoverColor:
        "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
      label: "Instagram",
    },
    {
      href: "https://youtube.com/@egfmusa",
      icon: FaYoutube,
      hoverColor: "hover:bg-red-600",
      label: "YouTube",
    },
  ];

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/meetings", label: "Meetings" },
    { href: "/streaming/video", label: "Live Streaming" },
    { href: "/resources", label: "Resources" },
  ];

  const resourceLinks = [
    { href: "/resources/articles", label: "Articles" },
    { href: "/resources/audio", label: "Audio Messages" },
    { href: "/resources/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const footerBottomLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Gradient overlay for visual depth */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div> */}

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6 mt-3 md:mt-0">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#90651b] to-amber-300 bg-clip-text text-transparent">
                  EGFM USA
                </h2>
                <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                  Eternal Glorious Fountain Ministry - Spreading God's love and
                  grace across America through faith, community, and service.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Connect With Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-3 rounded-full ${social.hoverColor} transition-all duration-300 transform hover:scale-110`}
                        aria-label={social.label}
                      >
                        <IconComponent className="text-lg group-hover:text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 uppercase">
                Quick Links
              </h3>
              <ul className="space-y-5">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#90651b] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 uppercase">
                Resources
              </h3>
              <ul className="space-y-5">
                {resourceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#90651b] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 uppercase">
                Get In Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-[#90651b] text-sm mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    1234 Fountain Way
                    <br />
                    City, State 12345
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-[#90651b] text-sm flex-shrink-0" />
                  <a
                    href="mailto:info@egfmusa.org"
                    className="text-gray-300 hover:text-[#90651b] transition-colors duration-200 text-sm"
                  >
                    info@egfmusa.org
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-[#90651b] text-sm flex-shrink-0" />
                  <a
                    href="tel:+1-123-456-7890"
                    className="text-gray-300 hover:text-[#90651b] transition-colors duration-200 text-sm"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 Eternal Glorious Fountain Ministry USA. All rights
                reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                {footerBottomLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-[#90651b] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
