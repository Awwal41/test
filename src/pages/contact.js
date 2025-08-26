import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import CustomInput from "@/components/elements/customInput";
import PrimaryButton from "@/components/elements/primaryButton";
import Section from "@/components/common/section";
import Head from "next/head";
import emailjs from "@emailjs/browser";

/**
 * Contact Page Component
 * Features:
 * - Form validation with real-time error clearing
 * - EmailJS integration for secure email sending
 * - Loading states and success/error feedback
 * - Responsive design with contact information cards
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form state management
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  /**
   * Validates the contact form
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Name validation - minimum 2 characters
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation - proper email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation - minimum 5 characters
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation - minimum 10 characters
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission using EmailJS
   * Sends email to vanteemet@gmail.com with form data
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare email template parameters for EmailJS
      const templateParams = {
        to_email: "vanteemet@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // EmailJS configuration
      // These credentials are configured for secure email sending
      const serviceId = "service_xbdbg9r";
      const templateId = "template_v4t31yc";
      const publicKey = "s0m9AVBAmA2EnDsVj";

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles form input changes and clears validation errors
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const contactForm = (
    <div className="relative">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-95 p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-center">
          Contact Us
        </h1>
        <p className="text-center text-slate-200 mb-12">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
            <FaCheck className="mr-2" />
            <span>
              Thank you! Your message has been sent successfully. We'll get back
              to you soon.
            </span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <span>
              Sorry, there was an error sending your message. Please try again
              or contact us directly.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              type="text"
              name="name"
              title="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              important={true}
              disabled={isSubmitting}
            />
            <CustomInput
              type="email"
              name="email"
              title="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              important={true}
              disabled={isSubmitting}
            />
          </div>

          <CustomInput
            type="text"
            name="subject"
            title="Subject"
            value={formData.subject}
            onChange={handleChange}
            error={errors.subject}
            important={true}
            disabled={isSubmitting}
          />

          <div className="w-full mb-4">
            <label
              htmlFor="message"
              className="text-secondary text-xs lg:text-sm mb-[5px] block font-semibold"
            >
              Message<span className="ml-[1px] mt-[1px]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              disabled={isSubmitting}
              className={`${
                errors.message
                  ? "border-rose-300"
                  : "border-slate-400 focus:border-primary"
              } border-solid border-[0.4px] py-2 px-4 w-full min-w-full text-left text-[#616161] focus:outline-none focus:border-primary hover:border-primary focus:text-secondary rounded-[6px] shadow-xs bg-transparent ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              required
            />
            {errors.message && (
              <div className="text-rose-500 text-[12px] mt-1 capitalize">
                {errors.message}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              customStyle={`${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-4xl text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Email</h3>
            <a
              href="mailto:info@egfmusa.org"
              className="mt-2 text-slate-200 hover:text-primary transition"
            >
              info@egfmusa.org
            </a>
          </div>
          <div className="text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <FaPhone className="text-4xl text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Phone</h3>
            <a
              href="tel:+1-123-456-7890"
              className="mt-2 text-slate-200 hover:text-primary transition"
            >
              +1 (123) 456-7890
            </a>
          </div>
          <div className="text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <FaMapMarkerAlt className="text-4xl text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Address</h3>
            <p className="mt-2 text-slate-200">
              1234 Fountain Way
              <br />
              City, State 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Contact Us | EGFM USA</title>
        <meta
          name="description"
          content="Get in touch with EGFM USA. We'd love to hear from you!"
        />
      </Head>
      <Navbar />
      <div className="flex-grow relative">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/about-bg.jpg")',
            zIndex: -1,
          }}
        />
        <div className="relative z-10 pt-16">
          <Section content={contactForm} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
