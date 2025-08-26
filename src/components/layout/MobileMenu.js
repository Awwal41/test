import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "../elements/primaryButton";
import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Mobile Menu Component with active page highlighting
 * Features:
 * - Slide-in animation from right
 * - Active state highlighting for current page
 * - Body scroll lock when open
 * - Escape key to close
 * - Responsive navigation with dropdown support
 */
const MobileMenu = ({ isOpen, onClose, routes, dropdownMenus, onGiveClick }) => {
  const router = useRouter();
  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed right-0 top-0 h-full w-[85%] transition-opacity duration-300 md:hidden z-[60] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        role="presentation"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[85%] bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out md:hidden z-[70] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white p-2 hover:text-yellow-400 transition-colors"
            aria-label="Close menu"
          >
            <ChevronDownIcon className="h-6 w-6 rotate-90" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="px-4 py-2">
          <ul className="space-y-4">
            {/* Regular links */}
            {routes.map((route) => {
              const isActive = router.pathname === route.path;
              return (
                <li key={route.name}>
                  <Link
                    href={route.path}
                    className={`block uppercase tracking-wide font-medium transition py-2 ${
                      isActive 
                        ? 'text-yellow-400' 
                        : 'text-white hover:text-yellow-400'
                    }`}
                    onClick={onClose}
                  >
                    {route.name}
                  </Link>
                </li>
              );
            })}

            {/* Dropdown menus */}
            {Object.entries(dropdownMenus).map(([key, menu]) => {
              const isActive = menu.path && router.pathname === menu.path;
              const hasActiveChild = menu.items && menu.items.some(item => router.pathname === item.path);
              
              return (
                <li key={key} className="border-t border-gray-800 pt-4">
                  <div className={`uppercase tracking-wide font-medium py-2 ${
                    isActive || hasActiveChild 
                      ? 'text-yellow-400' 
                      : 'text-white'
                  }`}>
                    {menu.name}
                  </div>
                  <ul className="pl-4 space-y-2">
                    {menu.items.map((item) => {
                      const isItemActive = router.pathname === item.path;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            className={`block transition py-2 ${
                              isItemActive 
                                ? 'text-yellow-400' 
                                : 'text-gray-300 hover:text-yellow-400'
                            }`}
                            onClick={onClose}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}

            {/* GIVE button */}
            <li className="border-t border-gray-800 pt-4">
              <PrimaryButton
                customStyle="w-full bg-[#90651b] hover:bg-[#a67a2a] py-3 text-lg"
                handleClick={onGiveClick}
              >
                GIVE
              </PrimaryButton>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu; 