import PropTypes from "prop-types";

function CustomInput({
  type,
  name,
  onChange,
  customStyle,
  value,
  placeholder,
  autoComplete,
  error,
  disabled,
  title,
  onBlur,
  important,
  subText,
}) {
  // Get today's date in the required format (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={name}
        className="text-secondary text-xs lg:text-sm mb-[5px] block font-semibold"
      >
        {title}
        {important && <span className="ml-[1px] mt-[1px]">*</span>}{" "}
      </label>
      {subText && (
        <p className="text-slate-100 text-xs lg:text-sm mb-1 block font-light">
          {subText}
        </p>
      )}
      <input
        className={`${
          error ? "border-rose-300" : "border-slate-400 focus:border-primary"
        } border-solid border-[0.4px] py-2 px-4 w-full min-w-full text-left h-[50px] text-[#616161] focus:outline-none focus:border-primary hover:border-primary focus:text-secondary rounded-[6px] shadow-xs bg-transparent
            focus:border disabled:opacity-50 ${customStyle}`}
        type={type}
        disabled={disabled}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        min={type === "date" ? today : undefined} // Disable all past dates if the input type is "date"
        // min={
        //   type === "date" ? new Date().toISOString().split("T")[0] : undefined
        // } // Set min date if it's a date picker
        onFocus={(e) => {
          // Trigger the picker for both date and time types
          if (type === "date" || type === "time") {
            e.target?.showPicker(); // Show the picker when focused
          }
        }}
      />

      {error && (
        <div className="text-rose-500 text-[12px] mt-1 capitalize">{error}</div>
      )}
    </div>
  );
}

export default CustomInput;

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  customStyle: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  subText: PropTypes.string, // Optional helper text for the error message
  important: PropTypes.bool,
};
