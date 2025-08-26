import PropTypes from "prop-types";

function AboutButton({ children, customStyle, handleClick, type, disabled }) {
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      disabled={disabled}
      className={`cursor-pointer flex items-center justify-center px-7 bg-transparent disabled:opacity-20 h-[45px] md:h-[49px] text-nowrap text-sm lg:text-base text-primary border border-primary font-bold ${customStyle}`}
    >
      {children}
    </button>
  );
}

export default AboutButton;

AboutButton.propTypes = {
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.string,
  handleClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};
