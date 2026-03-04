import { useNavigate } from "react-router";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>You travel the world.</h1>
      <h1>WorldWise keeps track of your adventures.</h1>
      <h3>
        A world map that tracks your footsteps into every city you can think of.
        Never forget your wonderful experiences, and show your friends how you
        have wandered the world.
      </h3>
      <button
        onClick={() => navigate("/login")}
        style={{
          width: "30%",
          height: "5rem",
          background: "#00c46a",
          cursor: "pointer",
        }}
      >
        START TRACKING NOW
      </button>
    </div>
  );
}

export default Homepage;
