import PropTypes from "prop-types";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const CustomPhoneInput = ({
  title,
  name,
  error,
  important,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const validatePhone = () => {
    if (value && !isValidPhoneNumber(value)) {
      return "Invalid phone number";
    }
    return "";
  };

  const errorMessage = error || validatePhone();

  return (
    <div className="font-serif w-full mb-4">
      <label
        htmlFor={name}
        className="text-secondary text-xs lg:text-sm mb-[5px] block font-semibold"
      >
        {title}
        {important && <span className="ml-[1px] mt-[1px]">*</span>}
      </label>

      <PhoneInput
        international
        defaultCountry="US"
        value={value}
        onChange={onChange} // Handle change with parent's handleChange
        onBlur={onBlur} // Handle blur with Formik's onBlur
        className="w-full py-2 px-4 text-[#616161] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary border-solid border-[0.4px] border-slate-400 rounded-[6px]"
        {...props}
      />

      {errorMessage && (
        <div className="text-rose-500 text-[12px] mt-1 capitalize">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

CustomPhoneInput.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  important: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default CustomPhoneInput;
