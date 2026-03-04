import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";

const PAGE_CONFIGS = {
  "/": {
    background: "url('bg.jpg')",
    brightness: "brightness(0.3)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  "/product": { background: "#242a2e", brightness: "brightness(1)" },
  "/pricing": { background: "#242a2e", brightness: "brightness(1)" },
  "/login": { background: "#242a2e", brightness: "brightness(1)" },
};

function AppLayout() {
  const location = useLocation();
  const config = PAGE_CONFIGS[location.pathname] || PAGE_CONFIGS.default;

  return (
    <div
      className="app-layout"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem",
      }}
    >
      <div
        className="background"
        // BACKGROUND
        style={{
          background: config.background,
          backgroundSize: config.backgroundSize,
          backgroundPosition: config.backgroundPosition,
          filter: config.brightness,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
