const SimpleSpinner = ({
  size = 40,
  color = "orangered", // Main spinner color
}) => {
  // Calculate lighter border color based on main color
  const borderColor = `${color}20`; // Adds 20% opacity

  const spinKeyframes = {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  };

  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `3px solid ${borderColor}`,
    borderTop: `3px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div
      className="spinner"
      style={{
        ...spinnerStyle,
        animationName: spinKeyframes,
      }}
      role="status"
      aria-label="Loading"
    />
  );
};

export default SimpleSpinner;
