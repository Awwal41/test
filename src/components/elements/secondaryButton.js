import PropTypes from "prop-types";

function SecondaryButton({
  children,
  customStyle,
  handleClick,
  type,
  disabled,
}) {
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      disabled={disabled}
      className={`font-serif flex items-center justify-center px-7 bg-transparent disabled:opacity-20 h-[45px] md:h-[49px] text-nowrap text-sm lg:text-base text-primary border border-primary font-bold rounded-[12px] ${customStyle}`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.string,
  handleClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};
