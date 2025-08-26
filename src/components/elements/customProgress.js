const CustomProgress = () => {
  return (
    <div className="absolute top-0">
      <div className="relative flex justify-between mb-4">
        {formConfig.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              index <= currentStepIndex ? "text-indigo-500" : "text-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                index <= currentStepIndex
                  ? "border-indigo-500 bg-indigo-500"
                  : "border-gray-400"
              }`}
            ></div>
            {index < formConfig.length - 1 && (
              <div
                className={`absolute top-2 left-1/2 -translate-x-1/2 h-0.5 bg-gray-300 w-full ${
                  index < currentStepIndex ? "bg-indigo-500" : ""
                }`}
                style={{ zIndex: -1 }}
              ></div>
            )}
            {/* You could add step titles here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomProgress;
