import PropTypes from "prop-types";

const CustomRadio = ({
  title,
  name,
  options,
  value,
  onChange,
  onBlur,
  error,
  subText,
  important,
  primaryColor = "rose-500", // Default primary color is rose-500 (red-pinkish)
}) => {
  const primaryRingClass = `ring-${primaryColor}`;
  const primaryBgClass = `bg-${primaryColor}`;
  const primaryBorderClass = `border-${primaryColor}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="text-secondary text-xs lg:text-sm mb-[5px] block font-semibold"
      >
        {title}
        {important && <span className="ml-[1px] mt-[1px]">*</span>}{" "}
      </label>
      {subText && (
        <p className="text-slate-100 text-xs lg:text-sm mb-1 block font-light ">
          {subText}
        </p>
      )}
      <div className="mt-2">
        {options.map((option) => (
          <div key={option.value}>
            <div className="inline-flex items-top mr-4 mb-2">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onBlur={onBlur}
                onChange={onChange}
                className={`form-radio h-4 w-4 min-h-4 min-w-4 text-primary checked:ring-${primaryColor} border-gray-300 peer-checked:${primaryBorderClass} peer-checked:${primaryBgClass} peer-checked:ring-2 peer-checked:${primaryRingClass}`}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className="ml-2 text-slate-100 text-xs lg:text-sm"
              >
                {option.name}
              </label>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="text-rose-500 text-[12px] mt-1 capitalize">{error}</div>
      )}
    </div>
  );
};

CustomRadio.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.bool,
  error: PropTypes.string,
  subText: PropTypes.string, // Optional helper text for the error message
  important: PropTypes.bool,
  primaryColor: PropTypes.string, // Add prop for primary color
};

export default CustomRadio;
