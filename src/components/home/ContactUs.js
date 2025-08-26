import AboutButton from "../elements/aboutButton";
import { useRouter } from "next/router";

export default function ContactUs() {
  const router = useRouter();

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.egfmusa.org/images/about_us_img.png')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content - Now properly centered */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
          Have questions or need to contact us?
        </h2>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl italic mb-8 text-gray-200">
          Confused about a particular scripture? or about a message you've
          heard?
        </p>

        {/* Contact Button */}
        <div className="flex justify-center">
          <AboutButton
            customStyle="border-white text-white hover:border-black"
            handleClick={() => {
              router.push("/contact");
            }}
          >
            CONTACT US
          </AboutButton>
        </div>
      </div>
    </section>
  );
}
