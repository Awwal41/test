export default function Section({
  id,
  title,
  content,
  bgColor = "bg-white",
  textAlign = "text-left",
  customClass = "",
  padding = "py-10 md:py-16",
}) {
  return (
    <section id={id} className={` ${bgColor} ${padding}`}>
      <div
        className={`container mx-auto ${
          customClass.includes("px-0") ? "" : "px-4 sm:px-6 lg:px-8"
        } max-w-7xl ${customClass}`}
      >
        {title && (
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight capitalize ${textAlign}`}
          >
            {title}
          </h2>
        )}
        {typeof content === "string" ? (
          <p className={`text-base md:text-lg text-gray-600 ${textAlign}`}>
            {content}
          </p>
        ) : (
          <div className={textAlign}>{content}</div>
        )}
      </div>
    </section>
  );
}
