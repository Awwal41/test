import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../elements/customInput";
import PrimaryButton from "../elements/primaryButton";

export default function NewsletterSection() {
  // Validation schema for newsletter signup
  const newsletterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  // Handle newsletter signup
  const handleNewsletterSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Newsletter signup:", values);
    // Add your newsletter signup logic here
    setTimeout(() => {
      alert("Thank you for subscribing to our newsletter!");
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-left">
          {/* Email Newsletter Label */}
          <p className="text-gray-600 text-sm font-medium tracking-wider uppercase mb-4">
            EMAIL NEWSLETTER
          </p>

          {/* Main Heading */}
          <h2 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            Stay Connected
          </h2>

          {/* Newsletter Form */}
          <div className="max-w-4xl">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={newsletterSchema}
              onSubmit={handleNewsletterSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form className="flex flex-row gap-4 items-center">
                  <div className="flex-1 pt-3">
                    <CustomInput
                      type="email"
                      name="email"
                      title=""
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                      customStyle="bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 h-[50px] px-6 text-lg"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <PrimaryButton
                      type="submit"
                      disabled={isSubmitting}
                      customStyle="w-full sm:w-auto px-12 h-[50px] text-lg font-medium !bg-black !text-white !border-black hover:!bg-gray-800 hover:!border-gray-800"
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </PrimaryButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
