import { useRouter } from "next/router";
import PrimaryButton from "../elements/primaryButton";

export default function Pastors() {
  const router = useRouter();

  const navigateToLeadership = () => {
    // If we're already on the about-us page, just scroll to the section
    if (router.pathname === "/about-us") {
      scrollToSection("our-leadership");
    } else {
      // Navigate to about-us page, then scroll to leadership section
      router.push("/about-us").then(() => {
        // Wait a bit for the page to load, then scroll
        setTimeout(() => {
          scrollToSection("our-leadership");
        }, 100);
      });
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 140; // Height of both navbars (same as SecondaryNav)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-black text-white min-h-screen flex items-center py-16 lg:py-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Top Label */}
            <div>
              <h3 className="text-lg font-bold tracking-wider text-white">
                LEADERSHIP
              </h3>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                Empowering Every Generation{" "}
                <span className="text-yellow-400">FOR REVIVAL</span>
              </h1>
            </div>

            {/* Pastor Information */}
            <div className="space-y-4">
              <div className="text-lg font-bold tracking-wide text-white">
                REV. KAYODE & HELEN OYEGOKE
              </div>

              <div className="text-lg font-bold tracking-wide text-white">
                SENIOR PASTORS & FOUNDERS OF EGFM USA
              </div>
            </div>

            {/* Call to Action Button */}
            <div>
              <button
                onClick={navigateToLeadership}
                className="inline-flex items-center bg-white text-black px-8 py-4 font-bold text-lg hover:bg-gray-100 transition-colors group"
              >
                View Leadership
                <svg
                  className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[600px] xl:h-[700px]">
            <img
              src="/images/rev-kayode-oyegoke.jpg"
              alt="Rev. Kayode & Helen Oyegoke"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
