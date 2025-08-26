import PropTypes from "prop-types";

function PrimaryButton({ children, customStyle, handleClick, type, disabled }) {
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center px-7 bg-transparent border border-primary disabled:opacity-20 h-[45px] md:h-[49px] text-nowrap text-sm lg:text-base text-primary font-bold hover:border-black  transition-all duration-300 ${customStyle}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.string,
  handleClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};
