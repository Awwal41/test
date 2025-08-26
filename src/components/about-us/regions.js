import RegionSelector from "../common/regionSelector";
import Section from "../common/section";

const RegionsMap = ({ regions, color, customClass, padding, isHome }) => {
  return (
    <div>
      <Section
        padding={padding}
        content={<RegionSelector regions={regions} isHome={isHome} />}
        bgColor={color}
        textAlign="text-center"
        customClass={customClass}
      />
    </div>
  );
};

export default RegionsMap;
