import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PrimaryButton from "../elements/primaryButton";
import MobileMenu from "./MobileMenu";
import GiveModal from "../modals/GiveModal";
import { useRouter } from "next/router";

/**
 * Navigation Configuration
 * Defines the structure and routes for the website navigation
 */

// Regular navigation routes without dropdowns
const routes = [
  { name: "Contact", path: "/contact" },
  { name: "Meetings", path: "/meetings" },
];

// Configuration for dropdown menus with nested navigation items
const dropdownMenus = {
  aboutUs: {
    name: "About",
    path: "/about-us",
    items: [
      { name: "Who We Are", path: "/about-us" },
      { name: "Rev. Kayode Oyegoke", path: "/about-us/rev-kayode-oyegoke" },
      { name: "Rev. Helen Oyegoke", path: "/about-us/rev-helen-oyegoke" },
      { name: "Pastor Tayo Fasan", path: "/about-us/pastor-tayo-fasan" },
      { name: "Regions", path: "/about-us/regions" },
    ],
  },
  streaming: {
    name: "Live Streaming",
    path: null,
    items: [
      { name: "Audio Broadcast", path: "/streaming/audio" },
      { name: "Video Broadcast", path: "/streaming/video" },
    ],
  },
  resources: {
    name: "Resources",
    path: "/resources",
    items: [
      { name: "Audio Messages", path: "/resources/audio" },
      { name: "Transcripts", path: "/resources/transcripts" },
      { name: "Articles", path: "/resources/articles" },
      { name: "Gallery", path: "/resources/gallery" },
    ],
  },
};

/**
 * Reusable dropdown menu component with active state highlighting
 * @param {Object} menu - The menu configuration object containing name, path, and items
 * @param {string} currentPath - Current router pathname for active state detection
 * @returns {JSX.Element} A dropdown menu with hover effects and active state highlighting
 */
const DropdownMenu = ({ menu, currentPath }) => {
  // Check if current menu or any of its children are active
  const isActive = menu.path && currentPath === menu.path;
  const hasActiveChild =
    menu.items && menu.items.some((item) => currentPath === item.path);

  return (
    <li className="relative group">
      <div className="flex items-center">
        {menu.path ? (
          <Link
            href={menu.path}
            className={`capitalize tracking-wide font-medium transition ${
              isActive || hasActiveChild
                ? "text-yellow-500"
                : "text-white hover:text-yellow-500"
            }`}
          >
            {menu.name}
          </Link>
        ) : (
          <span
            className={`capitalize tracking-wide font-medium cursor-pointer transition ${
              hasActiveChild
                ? "text-yellow-500"
                : "text-white group-hover:text-yellow-500"
            }`}
          >
            {menu.name}
          </span>
        )}
        {menu.items && (
          <ChevronDownIcon
            className={`ml-1 h-4 w-4 transition ${
              isActive || hasActiveChild
                ? "text-yellow-500"
                : "text-white group-hover:text-yellow-500"
            }`}
          />
        )}
      </div>
      {menu.items && (
        <ul className="absolute left-0 mt-0 w-48 bg-black bg-opacity-90 rounded-md py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-10">
          {menu.items.map((item) => {
            const isItemActive = currentPath === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 text-sm transition ${
                    isItemActive
                      ? "bg-gray-700 text-yellow-500"
                      : "text-white hover:bg-gray-700 hover:text-yellow-500"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

/**
 * Main Navbar component with active page highlighting
 * Features:
 * - Sticky positioning with blur effect
 * - Large logo with overflow effect
 * - Responsive design (mobile menu hidden on desktop)
 * - Dropdown menus with active state highlighting
 * - Prominent GIVE button using PrimaryButton component
 * - Dynamic background based on page type
 */
export default function Navbar() {
  const router = useRouter();

  // Page-specific styling conditions
  const isVideoPage = router.pathname === "/streaming/video";
  const isAudioPage = router.pathname === "/streaming/audio";
  const isAboutPage = router.pathname === "/about-us";

  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGiveModalOpen, setIsGiveModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll-based navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Show navbar background after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${
          isVideoPage || isAudioPage ? "absolute" : "fixed"
        } top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/70 backdrop-blur-sm"
            : isVideoPage || isAudioPage
            ? "bg-transparent backdrop-blur-sm"
            : isAboutPage
            ? "bg-black/5 backdrop-blur-sm"
            : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          {/* Logo section with overflow effect */}
          <Link href="/" className="flex-shrink-0 -mt-4 -mb-4">
            <div className="relative w-24 h-24 sm:w-24 sm:h-24 drop-shadow-lg">
              <Image
                src="/images/logo-coloured.png"
                alt="egfm logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {/* Regular navigation links */}
            {routes.map((route) => {
              const isActive = router.pathname === route.path;
              return (
                <li key={route.name}>
                  <Link
                    href={route.path}
                    className={`capitalize tracking-wide font-medium transition ${
                      isActive
                        ? "text-yellow-500"
                        : "text-white hover:text-yellow-500"
                    }`}
                  >
                    {route.name}
                  </Link>
                </li>
              );
            })}

            {/* Dropdown menus using the reusable DropdownMenu component */}
            <DropdownMenu
              menu={dropdownMenus.aboutUs}
              currentPath={router.pathname}
            />
            <DropdownMenu
              menu={dropdownMenus.streaming}
              currentPath={router.pathname}
            />
            <DropdownMenu
              menu={dropdownMenus.resources}
              currentPath={router.pathname}
            />

            {/* GIVE button using the PrimaryButton component with custom styling */}
            <li>
              <PrimaryButton
                customStyle="px-8 py-3 text-lg border-yellow-500 text-yellow-500"
                handleClick={() => setIsGiveModalOpen(true)}
              >
                Give
              </PrimaryButton>
            </li>
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:text-yellow-500 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        routes={routes}
        dropdownMenus={dropdownMenus}
        onGiveClick={() => {
          setIsMobileMenuOpen(false);
          setIsGiveModalOpen(true);
        }}
      />

      {/* Give Modal */}
      <GiveModal
        isOpen={isGiveModalOpen}
        onClose={() => setIsGiveModalOpen(false)}
      />
    </>
  );
}
