import PropTypes from "prop-types";

function CustomSelect({
  options,
  customStyle,
  value,
  onChange,
  name,
  title,
  error,
  onBlur,
  important,
  subText,
}) {
  return (
    <div className="relative mb-4">
      <label className="text-secondary text-xs lg:text-sm mb-[5px] block font-semibold">
        {title}
        {important && <span className="ml-[1px] mt-[1px]">*</span>}{" "}
      </label>
      {subText && (
        <p className="text-slate-100 text-xs lg:text-sm mb-1 block font-light">
          {subText}
        </p>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${
          error ? "border-rose-300" : "border-slate-400 focus:border-primary"
        } appearance-none border-solid border-[0.4px] py-2 px-4 w-full min-w-full text-left h-[50px] text-[#616161] focus:outline-none focus:border-primary hover:border-primary focus:text-secondary rounded-[6px] shadow-xs bg-transparent
              focus:border disabled:opacity-50 leading-tight ${customStyle}`}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 pt-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {error && (
        <div className="text-rose-500 text-[12px] mt-1 capitalize">{error}</div>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  customStyle: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  subText: PropTypes.string, // Optional helper text for the error message
  onBlur: PropTypes.func,
  important: PropTypes.bool,
};

CustomSelect.defaultProps = {
  options: [],
  customStyle: "",
  value: "",
  error: "",
  onBlur: () => {},
  important: false,
};

export default CustomSelect;
